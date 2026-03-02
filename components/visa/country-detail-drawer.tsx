"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, DollarSign, FileText, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

export function CountryDetailDrawer({ code, data }: { code: string, data: any }) {
    const router = useRouter()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") router.back()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [router])

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex justify-end">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => router.back()}
                />
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-md h-full bg-[#0D1627] border-l border-white/10 shadow-2xl flex flex-col pointer-events-auto"
                >
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-8 rounded bg-white/10 flex items-center justify-center font-bold">
                                {code.toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold font-display">{data?.destinationCountry || "Country Details"}</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-xs text-emerald-500 font-medium tracking-wide uppercase">Visa Free</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                                <Clock className="w-5 h-5 text-[#4F8EF7]" />
                                <span className="text-xs text-[#8892A4] uppercase font-semibold tracking-wider">Max Stay</span>
                                <span className="text-lg font-bold">{data?.maxStay || "90 Days"}</span>
                            </div>
                            <div className="glass p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                                <DollarSign className="w-5 h-5 text-[#A78BFA]" />
                                <span className="text-xs text-[#8892A4] uppercase font-semibold tracking-wider">Visa Fee</span>
                                <span className="text-lg font-bold">{data?.fees || "$0"}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm text-[#8892A4] uppercase font-semibold tracking-wider mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Required Documents
                            </h3>
                            <ul className="space-y-3">
                                {(data?.requiredDocs || ["Valid Passport (6 months)", "Return Ticket", "Proof of Funds"]).map((doc: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm">
                                        <div className="mt-0.5 w-4 h-4 rounded-full bg-[#4F8EF7]/20 flex items-center justify-center shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8EF7]" />
                                        </div>
                                        {doc}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm text-[#8892A4] uppercase font-semibold tracking-wider mb-3">AI Insider Tips</h3>
                            <div className="p-4 rounded-xl bg-gradient-to-br from-[#4F8EF7]/10 to-[#A78BFA]/10 border border-[#4F8EF7]/20 text-sm leading-relaxed text-[#D1D5DB]">
                                <p className="mb-2 italic border-l-2 border-[#4F8EF7] pl-3">"Ensure your passport has at least 2 blank pages. Upon arrival, Immigration may ask for hotel reservations."</p>
                            </div>
                        </div>

                        <a
                            href={data?.officialLink || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium"
                        >
                            Official Government Portal <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
