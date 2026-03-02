"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientTextProps {
    children: React.ReactNode
    className?: string
}

export function GradientText({ children, className }: GradientTextProps) {
    return (
        <motion.span
            className={cn(
                "bg-[image:var(--gradient-primary)] bg-clip-text text-transparent inline-block",
                className
            )}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
        >
            {children}
        </motion.span>
    )
}
