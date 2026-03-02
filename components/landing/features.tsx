"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Route, TrendingUp, BellRing, Building2, BotMessageSquare } from "lucide-react"

const features = [
    {
        title: "Instant Visa Check",
        description: "Know exactly what you need before you book. Complete visa requirements for 199 passports.",
        icon: ShieldCheck,
    },
    {
        title: "Route Optimizer",
        description: "Map out multi-country trips to minimize visas, cut costs, and save processing time.",
        icon: Route,
    },
    {
        title: "Upgrade Path Planner",
        description: "Get a personalized roadmap to a stronger passport through residency or investment.",
        icon: TrendingUp,
    },
    {
        title: "Real-time Policy Alerts",
        description: "Never miss a change. Get notified instantly when entry requirements update.",
        icon: BellRing,
    },
    {
        title: "Embassy Tracker",
        description: "Find the closest embassy, required documents, and processing times automatically.",
        icon: Building2,
    },
    {
        title: "AI Travel Advisor",
        description: "Chat with our Gemini-powered AI to answer complex immigration questions 24/7.",
        icon: BotMessageSquare,
    }
]

export function Features() {
    return (
        <section id="features" className="py-24 relative z-10 mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                        Everything you need to <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">move freely</span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] text-lg">
                        Stop guessing and start traveling. We provide the intelligence you need to unlock global mobility.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass p-8 rounded-2xl group transition-all duration-300 hover:border-[var(--color-primary)]/[0.3] hover:shadow-[0_8px_32px_rgba(79,142,247,0.1)] relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-6 h-6" />
                            </div>

                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
