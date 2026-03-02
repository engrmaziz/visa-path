import { Ratelimit } from '@upstash/ratelimit'
import { redis } from './redis'

// Free tier: 10 requests per minute
export const freeRatelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    analytics: true,
    prefix: '@upstash/ratelimit:free',
})

// Pro tier: 100 requests per minute
export const proRatelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'),
    analytics: true,
    prefix: '@upstash/ratelimit:pro',
})
