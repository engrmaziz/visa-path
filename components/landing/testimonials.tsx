"use client"

const testimonials = [
    { name: "Elena R.", flag: "🇪🇸", role: "Digital Nomad", quote: "VisaPath saved me 40 hours of research. I effortlessly planned my 6-month journey across Asia.", stars: 5 },
    { name: "David K.", flag: "🇺🇸", role: "Startup Founder", quote: "The Route Optimizer is magic. It found a sequence of countries that saved me over $800 in visa fees.", stars: 5 },
    { name: "Aisha M.", flag: "🇦🇪", role: "Freelance Designer", quote: "The AI Advisor analyzed my passport strength and gave me an exact roadmap to a Golden Visa. Incredible.", stars: 5 },
    { name: "Tom H.", flag: "🇬🇧", role: "Remote Developer", quote: "I no longer stress about overstaying. The real-time policy alerts keep me compliant without thinking about it.", stars: 5 },
    { name: "Sophia L.", flag: "🇨🇦", role: "Travel Blogger", quote: "I used to track all my visa entries in a messy spreadsheet. Now VisaPath handles it automatically.", stars: 5 },
    { name: "Hiroshi T.", flag: "🇯🇵", role: "Investor", quote: "Found the perfect Residency by Investment program using the Upgrade Path Planner. Worth every penny.", stars: 5 },
]

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                    Trusted by <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">global citizens</span>
                </h2>
                <p className="text-[var(--color-text-secondary)] text-lg">
                    Join 12,000+ travelers navigating the world seamlessly.
                </p>
            </div>

            {/* Infinite scrolling container */}
            <div className="flex hover:[animation-play-state:paused] w-[200%] gap-6 animate-[scroll_40s_linear_infinite]">
                {[...testimonials, ...testimonials].map((testimony, idx) => (
                    <div key={idx} className="glass p-6 rounded-2xl w-[350px] flex-shrink-0 flex flex-col gap-4">
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            {[...Array(testimony.stars)].map((_, i) => <span key={i}>★</span>)}
                        </div>
                        <p className="text-[var(--color-text-primary)] leading-relaxed italic flex-1">
                            "{testimony.quote}"
                        </p>
                        <div className="mt-auto flex items-center gap-4 pt-4 border-t border-white/5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-lg font-bold shadow-inner">
                                {testimony.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">{testimony.name} {testimony.flag}</span>
                                <span className="text-xs text-[var(--color-text-secondary)]">{testimony.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
