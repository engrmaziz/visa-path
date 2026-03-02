"use client"

import { motion } from "framer-motion"
import { Book, Map, Compass } from "lucide-react"

const steps = [
    {
        title: "Enter your passport",
        description: "Start by selecting your passport(s). We support 199 different nationalities.",
        icon: Book,
    },
    {
        title: "Set your destinations",
        description: "Tell us where you want to go. Add multiple countries for a full trip plan.",
        icon: Map,
    },
    {
        title: "Get your intelligence",
        description: "Instantly receive optimized routes, visa requirements, and step-by-step guidance.",
        icon: Compass,
    }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                        From passport to plan in <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">30 seconds</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Connecting Line (desktop) */}
                    <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-[var(--color-border)]" />

                    <div className="grid md:grid-cols-3 gap-12 text-center relative z-10">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center mb-6 relative">
                                    <div className="absolute inset-2 rounded-full border border-[var(--color-primary)]/30 animate-[spin_10s_linear_infinite]" />
                                    <step.icon className="w-10 h-10 text-[var(--color-primary)]" />

                                    {/* Step Number Badge */}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[image:var(--gradient-primary)] text-white font-bold flex items-center justify-center shadow-lg">
                                        {idx + 1}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-xs">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
