"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CardProps extends HTMLMotionProps<"div"> {
    hoverEffect?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = true, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                whileHover={hoverEffect ? { y: -4 } : undefined}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                    "glass rounded-2xl overflow-hidden group transition-colors duration-300",
                    hoverEffect && "hover:border-[var(--color-border-hover)]",
                    className
                )}
                {...props}
            />
        )
    }
)
Card.displayName = "Card"

export { Card }
