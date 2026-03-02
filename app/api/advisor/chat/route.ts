import { NextResponse } from 'next/server'
import { geminiModel } from '@/lib/gemini'
import { createClient } from '@/lib/supabase/server'
import { proRatelimit, freeRatelimit } from '@/lib/ratelimit'

export async function POST(req: Request) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return new NextResponse('Unauthorized', { status: 401 })

        const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
        const limitFn = profile?.plan === 'pro' || profile?.plan === 'team' ? proRatelimit : freeRatelimit

        const { success } = await limitFn.limit(user.id)
        if (!success) {
            return new NextResponse('Rate limit exceeded', { status: 429 })
        }

        const { messages } = await req.json()
        const systemPrompt = "You are VisaPath AI, an expert immigration and travel intelligence assistant. You have comprehensive knowledge of global visa policies, passport rankings, immigration pathways, residency by investment programs, digital nomad visas, and travel route optimization. Always be specific, cite realistic timeframes and costs, and format responses clearly. When listing countries or steps, use structured formatting. Be helpful, warm, and empowering — you are helping people access freedom."

        // Construct history for Gemini
        const history = messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
        }))

        const latestMessage = messages[messages.length - 1].content

        const chat = geminiModel.startChat({
            history: [
                { role: 'user', parts: [{ text: systemPrompt }] },
                { role: 'model', parts: [{ text: "Understood. I am VisaPath AI, ready to assist." }] },
                ...history
            ]
        })

        const result = await chat.sendMessageStream(latestMessage)

        // Convert Gemini stream to web standard ReadableStream
        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text()
                    if (chunkText) {
                        controller.enqueue(new TextEncoder().encode(chunkText))
                    }
                }
                controller.close()
            }
        })

        return new Response(readableStream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        })

    } catch (error) {
        console.error('Chat error:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
