import { NextResponse } from 'next/server'
import { z } from 'zod'
import { proRatelimit, freeRatelimit } from '@/lib/ratelimit'
import { createClient } from '@/lib/supabase/server'
import { geminiModel, buildUpgradeRoadmapPrompt } from '@/lib/gemini'

const roadmapSchema = z.object({
    currentPassport: z.string().min(2),
    goal: z.string().min(5),
})

export async function POST(req: Request) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
        const ratelimit = profile?.plan === 'pro' || profile?.plan === 'team' ? proRatelimit : freeRatelimit

        const { success, limit, reset, remaining } = await ratelimit.limit(user.id)
        if (!success) {
            return NextResponse.json({ error: 'Rate limit exceeded' }, {
                status: 429,
                headers: { 'X-RateLimit-Limit': limit.toString(), 'X-RateLimit-Remaining': remaining.toString(), 'X-RateLimit-Reset': reset.toString() }
            })
        }

        const body = await req.json()
        const validated = roadmapSchema.safeParse(body)

        if (!validated.success) return NextResponse.json({ error: 'Invalid input', details: validated.error.errors }, { status: 400 })

        const { currentPassport, goal } = validated.data

        const prompt = buildUpgradeRoadmapPrompt(currentPassport, goal)
        const result = await geminiModel.generateContent(prompt)
        const responseText = result.response.text()

        const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim()
        const parsedData = JSON.parse(jsonStr)

        return NextResponse.json(parsedData)
    } catch (error: any) {
        console.error('Roadmap generator err:', error)
        return NextResponse.json({ error: 'Failed to generate roadmap' }, { status: 500 })
    }
}
