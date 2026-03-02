"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

export function useCountUp(end: number, duration: number = 2000, start: number = 0) {
    const [count, setCount] = useState(start)
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    useEffect(() => {
        if (!isInView) return

        let startTime: number | undefined
        let animationFrame: number

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime
            const percentage = Math.min(progress / duration, 1)

            // easeOutExpo
            const easing = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage)

            setCount(Math.floor(easing * (end - start) + start))

            if (progress < duration) {
                animationFrame = window.requestAnimationFrame(step)
            } else {
                setCount(end)
            }
        }

        animationFrame = window.requestAnimationFrame(step)

        return () => window.cancelAnimationFrame(animationFrame)
    }, [isInView, end, duration, start])

    return { count, ref }
}
