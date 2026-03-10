import { NextResponse, type NextRequest } from 'next/server'

const MIDDLEWARE_TIMEOUT_MS = 3000

export async function middleware(request: NextRequest) {
    let timeoutId!: ReturnType<typeof setTimeout>
    try {
        const { updateSession } = await import('@/lib/supabase/middleware')
        const timeoutPromise = new Promise<NextResponse>((resolve) => {
            timeoutId = setTimeout(() => resolve(NextResponse.next()), MIDDLEWARE_TIMEOUT_MS)
        })
        const result = await Promise.race([updateSession(request), timeoutPromise])
        clearTimeout(timeoutId)
        return result
    } catch {
        clearTimeout(timeoutId)
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/api/:path*',
    ],
}
