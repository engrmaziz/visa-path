"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const pricingTiers = [
    {
        name: "Free",
        monthly: 0,
        annual: 0,
        description: "Perfect for planning your next vacation.",
        features: [
            "199 passports supported",
            "Basic visa requirements",
            "Up to 3 multi-city routes",
            "Standard email support"
        ],
        cta: "Start for free",
        highlighted: false,
    },
    {
        name: "Pro",
        monthly: 7,
        annual: 5,
        description: "For digital nomads and frequent travelers.",
        features: [
            "Everything in Free",
            "Unlimited route optimization",
            "Real-time policy change alerts",
            "AI Travel Advisor access",
            "Upgrade Path Planner"
        ],
        cta: "Start Pro Free Trial",
        highlighted: true,
    },
    {
        name: "Team",
        monthly: 19,
        annual: 15,
        description: "For travel agencies and remote teams.",
        features: [
            "Everything in Pro",
            "Multiple user accounts",
            "API access (1k req/mo)",
            "Priority 24/7 support",
            "Custom branding"
        ],
        cta: "Contact Sales",
        highlighted: false,
    }
]

export function Pricing() {
    const [isAnnual, setIsAnnual] = useState(true)

    return (
        <section id="pricing" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                        Simple, transparent <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">pricing</span>
                    </h2>

                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-[var(--color-text-secondary)]'}`}>Monthly</span>
                        <button
                            className="w-14 h-8 rounded-full bg-white/10 p-1 flex items-center transition-colors hover:bg-white/20"
                            onClick={() => setIsAnnual(!isAnnual)}
                        >
                            <motion.div
                                className="w-6 h-6 rounded-full bg-[var(--color-primary)] shadow-sm"
                                animate={{ x: isAnnual ? 24 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-sm flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-[var(--color-text-secondary)]'}`}>
                            Annually <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full">Save 25%</span>
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {pricingTiers.map((tier, idx) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`relative rounded-3xl p-8 flex flex-col ${tier.highlighted
                                    ? 'bg-[#0D1627] border-2 border-[var(--color-primary)] shadow-[0_8px_40px_rgba(79,142,247,0.2)] md:-mt-4'
                                    : 'glass'
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[image:var(--gradient-primary)] px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                            <p className="text-[var(--color-text-secondary)] text-sm mb-6 h-10">{tier.description}</p>

                            <div className="mb-8 flex items-end gap-1">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={isAnnual ? 'annual' : 'monthly'}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        className="text-5xl font-display font-bold"
                                    >
                                        ${isAnnual ? tier.annual : tier.monthly}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="text-[var(--color-text-secondary)] pb-1">/mo</span>
                            </div>

                            <ul className="flex flex-col gap-4 mb-8 flex-1">
                                {tier.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-[var(--color-success)] shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={tier.highlighted ? "default" : "secondary"}
                                size="lg"
                                className={`w-full ${tier.highlighted && "hover:shadow-[0_8px_32px_rgba(79,142,247,0.4)]"}`}
                            >
                                {tier.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
