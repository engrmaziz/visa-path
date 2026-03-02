"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Compass, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-[rgba(8,11,20,0.8)] backdrop-blur-md border-b border-[var(--color-border)]" : "bg-transparent"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Compass className="w-8 h-8 text-[var(--color-primary)] transition-transform duration-500 group-hover:rotate-180" />
                        <span className="text-2xl font-display font-bold bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                            VisaPath
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">Features</Link>
                        <Link href="#how-it-works" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">How it Works</Link>
                        <Link href="#pricing" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">Pricing</Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" asChild>
                            <Link href="/auth/login">Sign In</Link>
                        </Button>
                        <Button className="relative overflow-hidden group" asChild>
                            <Link href="/auth/signup">
                                <span className="relative z-10">Get Started Free</span>
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
                            </Link>
                        </Button>
                    </div>

                    <button className="md:hidden p-2 text-[var(--color-text-secondary)]" onClick={() => setMobileMenuOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-50 bg-[var(--color-bg)] flex flex-col p-6"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-2">
                                <Compass className="w-8 h-8 text-[var(--color-primary)]" />
                                <span className="text-2xl font-display font-bold text-white">VisaPath</span>
                            </div>
                            <button className="p-2" onClick={() => setMobileMenuOpen(false)}>
                                <X className="w-6 h-6 text-[var(--color-text-secondary)]" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6 text-xl mb-12">
                            <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
                            <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</Link>
                            <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                        </nav>

                        <div className="flex flex-col gap-4 mt-auto">
                            <Button variant="secondary" size="lg" asChild className="w-full">
                                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                            </Button>
                            <Button size="lg" asChild className="w-full">
                                <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>Get Started Free</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
