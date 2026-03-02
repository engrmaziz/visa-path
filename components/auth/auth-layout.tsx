"use client"

import { ReactNode } from "react"
import { GlobeHero } from "@/components/landing/globe-hero"
import { motion } from "framer-motion"
import { Compass } from "lucide-react"
import Link from "next/link"

export function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex bg-[#080B14] text-white overflow-hidden selection:bg-[var(--color-primary)]">
            {/* Left 60% - Animated Visuals */}
            <div className="hidden lg:flex lg:w-[60%] relative flex-col items-center justify-center p-12">
                <div className="absolute inset-0 z-0">
                    <GlobeHero />
                </div>

                {/* Floating Stat Cards Overlay */}
                <div className="relative z-10 w-full max-w-2xl mt-auto glass p-6 rounded-2xl border-white/10 backdrop-blur-md">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F8EF7] to-[#A78BFA] flex items-center justify-center text-xl font-bold">
                            E
                        </div>
                        <div>
                            <p className="italic text-[#F0F4FF] leading-relaxed">
                                "VisaPath saved me 40 hours of research. I effortlessly planned my 6-month journey across Asia without a single visa issue."
                            </p>
                            <p className="text-sm text-[#8892A4] mt-2 font-medium">Elena R. — Digital Nomad</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right 40% - Auth Form */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 py-12 relative z-10 bg-[#0D1117] border-l border-white/5 shadow-2xl">
                <div className="w-full max-w-sm mx-auto">
                    <Link href="/" className="flex items-center gap-2 mb-12 group">
                        <Compass className="w-8 h-8 text-[#4F8EF7] group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4F8EF7] to-[#A78BFA]">
                            VisaPath
                        </span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
