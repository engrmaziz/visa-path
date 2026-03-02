import Link from "next/link"
import { Compass, Twitter, Github, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-[var(--color-border)] bg-[rgba(13,17,23,0.5)] pt-16 pb-8 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 relative">
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Compass className="w-8 h-8 text-[var(--color-primary)]" />
                            <span className="text-2xl font-display font-bold text-white">VisaPath</span>
                        </Link>
                        <p className="text-[var(--color-text-secondary)] text-sm max-w-xs leading-relaxed">
                            Decoding global mobility. Designed for digital nomads, expats, and frequent travelers.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-white">Product</h4>
                        <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Visa Check</Link>
                        <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Route Planner</Link>
                        <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Upgrade Path</Link>
                        <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Pricing</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-white">Resources</h4>
                        <Link href="/help" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Help Center</Link>
                        <Link href="/api-docs" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">API Docs</Link>
                        <Link href="/community" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Community</Link>
                        <Link href="/blog" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Blog</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-white">Company</h4>
                        <Link href="/about" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">About Us</Link>
                        <Link href="/careers" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Careers</Link>
                        <Link href="/privacy" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>

                <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[var(--color-text-muted)]">
                        © {new Date().getFullYear()} VisaPath. All rights reserved.
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
                        Made with <span className="text-[var(--color-primary)]">✦</span> for people who want to move freely
                    </p>
                </div>
            </div>
        </footer>
    )
}
