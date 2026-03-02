"use client"

import { motion } from "framer-motion"
import { GlobeHero } from "./globe-hero"
import { ParticleBg } from "./particle-bg"
import { GradientText } from "@/components/shared/gradient-text"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative min-h-screen pt-20 overflow-hidden flex items-center justify-center">
            <ParticleBg />

            {/* Drifting Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#4F8EF7]/20 rounded-full blur-[100px] mix-blend-screen animate-[drift_20s_ease-in-out_infinite_alternate]" />
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#A78BFA]/20 rounded-full blur-[100px] mix-blend-screen animate-[drift_25s_ease-in-out_infinite_alternate_reverse]" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10 w-full relative">
                <motion.div
                    className="flex flex-col items-start gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-primary)]/30 bg-[#4F8EF7]/10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wide">✦ AI-Powered Visa Intelligence</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-[72px] leading-[1.1] font-display font-bold tracking-[-0.03em]">
                        Your Passport. <br />
                        <GradientText>Endless Possibilities.</GradientText>
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-[1.6] max-w-lg">
                        VisaPath uses AI to instantly decode visa rules, plan optimal travel routes, and map your path to global mobility. For 199 passports. In seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
                        <Button size="lg" className="w-full sm:w-[240px]" asChild>
                            <Link href="/auth/signup">Check My Passport</Link>
                        </Button>
                        <Button size="lg" variant="ghost" className="w-full sm:w-[200px] gap-2">
                            <Play className="w-5 h-5 fill-current" />
                            Watch Demo
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-[var(--color-border)] w-full">
                        <div className="flex -space-x-4">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full border-2 border-[var(--color-bg)]"
                                    style={{
                                        background: `linear-gradient(135deg, #4F8EF7 0%, #A78BFA 100%)`,
                                        opacity: 1 - i * 0.15
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                            </div>
                            <span className="text-sm text-[var(--color-text-secondary)]">
                                <strong className="text-white font-medium">12,000+</strong> travelers from 80+ countries
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="relative h-[600px] w-full hidden lg:block"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <GlobeHero />
                </motion.div>
            </div>
        </section>
    )
}
