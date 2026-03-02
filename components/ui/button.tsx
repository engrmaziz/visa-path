"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-[image:var(--gradient-primary)] text-white shadow-[0_8px_32px_rgba(79,142,247,0.3)] hover:shadow-[0_8px_40px_rgba(79,142,247,0.5)] border border-white/10",
                secondary: "glass text-[var(--color-text-primary)] hover:bg-white/5",
                ghost: "hover:bg-white/10 text-[var(--color-text-primary)] hover:text-white",
                link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-4 py-2",
                sm: "h-9 rounded-lg px-3",
                lg: "h-14 rounded-xl px-8 text-base font-semibold",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const MotionButton = motion.button
const MotionSlot = motion.create(Slot)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        if (asChild) {
            return (
                <MotionSlot
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref as any}
                    {...(props as any)}
                />
            )
        }

        return (
            <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props as HTMLMotionProps<"button">}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
