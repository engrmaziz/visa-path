"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addPassport } from "@/actions/passport"

import { COUNTRIES } from "@/lib/countries"

export function AddPassportButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const filtered = COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase())
    )

    const handleSelect = async (country: { code: string, name: string }) => {
        setLoading(true)
        setError("")
        const fd = new FormData()
        fd.append("countryCode", country.code)
        fd.append("countryName", country.name)

        try {
            const res = await addPassport(null, fd)
            if (res?.error) {
                setError(res.error)
                setLoading(false)
            } else {
                setIsOpen(false)
                setSearch("")
                setLoading(false)
            }
        } catch (e) {
            setError("Failed to add passport")
            setLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-48 shrink-0 h-64 rounded-xl border-2 border-dashed border-white/10 hover:border-[#4F8EF7]/50 hover:bg-[#4F8EF7]/5 flex flex-col items-center justify-center gap-4 transition-colors group"
            >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-[#8892A4] group-hover:text-[#4F8EF7]" />
                </div>
                <span className="text-sm font-medium text-[#8892A4] group-hover:text-[#4F8EF7]">Add Passport</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#0D1627] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
                        >
                            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#080B14]">
                                <h3 className="text-lg font-bold">Add Passport</h3>
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-md transition-colors text-[#8892A4] hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-4 border-b border-white/5">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8892A4]" />
                                    <Input
                                        autoFocus
                                        placeholder="Search countries..."
                                        className="pl-9 bg-white/5 border-white/10 focus-visible:ring-[#4F8EF7]/50"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                            </div>

                            <div className="flex-1 overflow-y-auto p-2">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-[#8892A4]">
                                        <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#4F8EF7]" />
                                        <p className="text-sm">Adding passport...</p>
                                    </div>
                                ) : filtered.length === 0 ? (
                                    <div className="text-center py-8 text-[#8892A4] text-sm">
                                        No countries found matching "{search}"
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        {filtered.map(country => (
                                            <button
                                                key={country.code}
                                                onClick={() => handleSelect(country)}
                                                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                                            >
                                                <span className="font-medium">{country.name}</span>
                                                <span className="text-xs font-mono text-[#8892A4] bg-white/5 px-2 py-1 rounded">{country.code}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
