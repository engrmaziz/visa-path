import { NextResponse } from 'next/server'
import { z } from 'zod'
import { proRatelimit, freeRatelimit } from '@/lib/ratelimit'
import { createClient } from '@/lib/supabase/server'
import { groq, buildRouteOptimizerPrompt } from '@/lib/gemini'

const optimizeSchema = z.object({
    passportCountry: z.string().min(2),
    destinations: z.array(z.string()).min(1),
    optimizationGoal: z.enum(['Minimize Visas', 'Minimize Cost', 'Minimize Time'])
})

export async function POST(req: Request) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get user plan to determine ratelimit
        const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
        const ratelimit = profile?.plan === 'pro' || profile?.plan === 'team' ? proRatelimit : freeRatelimit

        const { success, limit, reset, remaining } = await ratelimit.limit(user.id)
        if (!success) {
            return NextResponse.json({ error: 'Rate limit exceeded' }, {
                status: 429,
                headers: {
                    'X-RateLimit-Limit': limit.toString(),
                    'X-RateLimit-Remaining': remaining.toString(),
                    'X-RateLimit-Reset': reset.toString()
                }
            })
        }

        const body = await req.json()
        const validated = optimizeSchema.safeParse(body)

        if (!validated.success) {
            return NextResponse.json({ error: 'Invalid input', details: validated.error.format() }, { status: 400 })
        }

        const { passportCountry, destinations, optimizationGoal } = validated.data

        const prompt = buildRouteOptimizerPrompt(passportCountry, destinations, optimizationGoal)
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        })
        const responseText = completion.choices[0]?.message?.content || ""

        // Clean markdown JSON delimiters if present
        const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim()
        const parsedData = JSON.parse(jsonStr)

        return NextResponse.json(parsedData)
    } catch (error: any) {
        console.error('Route optimization err:', error)
        return NextResponse.json({ error: 'Failed to optimize route' }, { status: 500 })
    }
}
