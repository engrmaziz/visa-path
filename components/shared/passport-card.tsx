"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Loader2 } from "lucide-react"
import { deletePassport } from "@/actions/passport"

interface PassportCardProps {
    id?: string
    countryName: string
    countryCode: string
    strength: 'strong' | 'medium' | 'weak'
}

export function PassportCard({ id, countryName, countryCode, strength }: PassportCardProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const getStrengthColors = () => {
        switch (strength) {
            case 'strong': return 'from-teal-900 to-[#080B14] border-teal-500/30'
            case 'medium': return 'from-indigo-900 to-[#080B14] border-indigo-500/30'
            case 'weak': return 'from-rose-900 to-[#080B14] border-rose-500/30'
        }
    }

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!id) return;
        if (!confirm(`Are you sure you want to remove ${countryName}?`)) return;

        setIsDeleting(true)
        const res = await deletePassport(id)
        if (res?.error) {
            alert(res.error)
            setIsDeleting(false)
        }
    }

    return (
        <motion.div
            className={`relative w-48 shrink-0 h-64 rounded-xl bg-gradient-to-br ${getStrengthColors()} border p-4 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5)] cursor-pointer hover:shadow-xl transition-shadow group`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, y: -10 }}
        >
            {id && (
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-400 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                </button>
            )}
            <div className="flex justify-between items-start">
                <div className="w-8 h-6 border border-white/20 rounded-sm overflow-hidden flex items-center justify-center text-xs bg-white/5">
                    {countryCode}
                </div>
                {/* Passpory Chip Icon */}
                <div className="w-8 h-6 rounded-sm border border-yellow-600/50 bg-yellow-500/20 grid grid-cols-2 grid-rows-2 gap-[1px] p-[1px]">
                    <div className="bg-yellow-600/40 rounded-tl-[1px]" />
                    <div className="bg-yellow-600/40 rounded-tr-[1px]" />
                    <div className="bg-yellow-600/40 rounded-bl-[1px]" />
                    <div className="bg-yellow-600/40 rounded-br-[1px]" />
                </div>
            </div>

            <div className="text-center">
                <div className="mb-2">
                    {/* Decorative emblem */}
                    <div className="w-12 h-12 mx-auto border border-yellow-600/30 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border border-yellow-600/50 flex items-center justify-center">
                            <span className="text-yellow-600/70 text-[10px] font-serif">✯</span>
                        </div>
                    </div>
                </div>
                <h3 className="uppercase tracking-[0.2em] font-serif text-[10px] text-yellow-600/80 font-bold mb-1">Passport</h3>
                <p className="font-display font-bold text-white uppercase truncate px-2">{countryName}</p>
            </div>
        </motion.div>
    )
}
