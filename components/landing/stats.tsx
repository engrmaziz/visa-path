"use client"

import { useCountUp } from "@/hooks/use-count-up"

function StatItem({ label, value, suffix = "" }: { label: string, value: number, suffix?: string }) {
    const { count, ref } = useCountUp(value, 2000)

    // Custom formatting: 2000000 -> 2M
    let displayCount = count.toLocaleString()
    if (value >= 1000000) {
        displayCount = (count / 1000000).toFixed(1).replace(".0", "") + "M"
    } else if (value >= 10000) {
        displayCount = Math.floor(count).toLocaleString()
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 text-center" ref={ref as any}>
            <span className="text-4xl md:text-5xl font-display font-bold bg-[image:var(--gradient-primary)] bg-clip-text text-transparent mb-2">
                {displayCount}{suffix}
            </span>
            <span className="text-[var(--color-text-secondary)] font-medium uppercase tracking-wider text-sm">
                {label}
            </span>
        </div>
    )
}

export function Stats() {
    return (
        <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="glass rounded-[2rem] p-8 md:p-12 border border-[var(--color-primary)]/20 shadow-[0_8px_32px_rgba(79,142,247,0.1)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 pointer-events-none" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:divide-x divide-white/10">
                        <StatItem label="Passports" value={199} />
                        <StatItem label="Countries" value={195} />
                        <StatItem label="Routes" value={50000} suffix="+" />
                        <StatItem label="Combinations" value={2000000} suffix="+" />
                    </div>
                </div>
            </div>
        </section>
    )
}
