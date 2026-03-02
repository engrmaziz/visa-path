import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

interface PlaceholderPageProps {
    title: string
    description?: string
}

export function PlaceholderPage({ title, description = "This section is currently being constructed by our team." }: PlaceholderPageProps) {
    return (
        <main className="min-h-screen flex flex-col bg-[var(--color-bg)] w-full overflow-hidden text-[var(--color-text-primary)] selection:bg-[var(--color-primary)] selection:text-white">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 relative z-10 text-center">
                {/* Glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none" />

                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight relative z-10">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto relative z-10">
                    {description}
                </p>
                <div className="mt-10 inline-block bg-white/5 border border-white/10 px-8 py-3 rounded-full text-sm uppercase tracking-widest text-[#8892A4] font-semibold">
                    Coming Soon
                </div>
            </div>
            <Footer />
        </main>
    )
}
