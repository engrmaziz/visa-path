"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, GripVertical, Settings2, MapPin, X, Loader2, Save, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import { COUNTRIES } from "@/lib/countries"

interface PassportOption {
    country_code: string
    country_name: string
}

interface RoutePlannerProps {
    passports: PassportOption[]
}

export function RoutePlannerView({ passports }: RoutePlannerProps) {
    const [selectedPassport, setSelectedPassport] = useState<string>(
        passports.length > 0 ? passports[0].country_code : ""
    )
    const [destinations, setDestinations] = useState(["Japan", "South Korea"])
    const [newDest, setNewDest] = useState("")
    const [goal, setGoal] = useState("Minimize Visas")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<maptilersdk.Map | null>(null)

    useEffect(() => {
        if (passports.length > 0 && !selectedPassport) {
            setSelectedPassport(passports[0].country_code)
        }
    }, [passports, selectedPassport])

    useEffect(() => {
        if (map.current || !mapContainer.current) return
        maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY || "dummy"
        map.current = new maptilersdk.Map({
            container: mapContainer.current as HTMLElement,
            style: maptilersdk.MapStyle.STREETS,
            center: [135, 35],
            zoom: 3,
            geolocateControl: false,
        })
        map.current.on('style.load', () => {
        })
    }, [])

    const handleOptimize = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/routes/optimize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    passportCountry: selectedPassport,
                    destinations,
                    optimizationGoal: goal
                })
            })
            const data = await res.json()
            setResult(data)
            // Map arc animation logic goes here in a real app
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const selectedPassportName = passports.find(p => p.country_code === selectedPassport)?.country_name ?? selectedPassport

    return (
        <div className="absolute inset-0 flex">
            {/* Left Panel */}
            <div className="w-[400px] h-full bg-[#0D1627] border-r border-white/10 flex flex-col p-6 z-10 overflow-y-auto">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">Passport</label>
                        {passports.length > 0 ? (
                            <div className="relative">
                                <select
                                    value={selectedPassport}
                                    onChange={(e) => setSelectedPassport(e.target.value)}
                                    className="w-full h-11 px-4 pr-10 rounded-xl border border-white/10 bg-[#080B14] text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-[#4F8EF7]/50"
                                >
                                    {passports.map((p) => (
                                        <option key={p.country_code} value={p.country_code} className="bg-[#080B14]">
                                            {p.country_name} ({p.country_code})
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8892A4] pointer-events-none" />
                            </div>
                        ) : (
                            <div className="h-11 px-4 rounded-xl border border-white/10 bg-[#080B14] flex items-center text-sm text-[#8892A4]">
                                No passports added yet
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">Destinations</label>
                        <div className="space-y-2">
                            {destinations.map((dest, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 group">
                                    <GripVertical className="w-4 h-4 text-[#8892A4] cursor-grab" />
                                    <span className="flex-1 text-sm font-medium">{dest}</span>
                                    <button
                                        onClick={() => setDestinations(ds => ds.filter((_, idx) => idx !== i))}
                                        className="p-1 text-[#8892A4] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <Input
                                list="countries-list"
                                value={newDest}
                                onChange={(e) => setNewDest(e.target.value)}
                                placeholder="Add destination..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && newDest) {
                                        setDestinations(d => [...d, newDest]); setNewDest('');
                                    }
                                }}
                            />
                            <datalist id="countries-list">
                                {COUNTRIES.map(c => (
                                    <option key={c.code} value={c.name} />
                                ))}
                            </datalist>
                            <Button variant="secondary" size="icon" onClick={() => { if (newDest) { setDestinations(d => [...d, newDest]); setNewDest(''); } }}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                        <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">Optimization Goal</label>
                        <div className="grid grid-cols-1 gap-2">
                            {['Minimize Visas', 'Minimize Cost', 'Minimize Time'].map(g => (
                                <label key={g} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${goal === g ? 'bg-[#4F8EF7]/10 border-[#4F8EF7]/50' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                                    <input type="radio" name="goal" value={g} checked={goal === g} onChange={() => setGoal(g)} className="sr-only" />
                                    <Settings2 className={`w-4 h-4 ${goal === g ? 'text-[#4F8EF7]' : 'text-[#8892A4]'}`} />
                                    <span className={`text-sm font-medium ${goal === g ? 'text-[#4F8EF7]' : 'text-white'}`}>{g}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <Button className="w-full mt-auto mt-8" size="lg" onClick={handleOptimize} disabled={loading || destinations.length < 2 || !selectedPassport}>
                    {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Optimizing...</> : "Calculate Optimal Route"}
                </Button>
            </div>

            {/* Right Panel: Map */}
            <div className="flex-1 relative">
                <div ref={mapContainer} className="absolute inset-0" />

                {/* Results Panel */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#080B14] via-[#080B14]/90 to-transparent p-6 flex flex-col justify-end z-20 pointer-events-none"
                        >
                            <div className="glass w-full max-w-4xl mx-auto rounded-2xl p-6 pointer-events-auto border-[#4F8EF7]/30 flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold font-display">Optimization Complete</h3>
                                        <p className="text-sm text-[#8892A4] mt-1 max-w-xl">{result.reasoning || "Route optimized successfully."}</p>
                                    </div>
                                    <div className="flex gap-3 text-sm">
                                        <div className="bg-[#4F8EF7]/20 text-[#4F8EF7] px-3 py-1.5 rounded-lg font-medium border border-[#4F8EF7]/30">Visas: {result.visasRequired || 0}</div>
                                        <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg font-medium border border-emerald-500/30">Cost: ${result.estimatedCost || 0}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 mx-[-24px] px-6 overflow-x-auto pb-4 mt-2">
                                    {result.steps?.map((stop: any, idx: number) => (
                                        <div key={idx} className="flex flex-col shrink-0 w-[240px]">
                                            <div className="flex items-center shrink-0 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8EF7] to-[#A78BFA] text-white flex items-center justify-center font-bold text-xs z-10 shrink-0 shadow-lg">
                                                    {idx + 1}
                                                </div>
                                                <div className="ml-[-12px] pl-5 pr-4 py-1.5 bg-white/10 rounded-xl border border-white/20 whitespace-nowrap z-0">
                                                    <p className="font-bold text-sm tracking-wide">{stop.country}</p>
                                                </div>
                                                {idx < result.steps.length - 1 && (
                                                    <div className="flex-1 h-px bg-white/20 mx-2 ml-4 relative">
                                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-y-transparent border-l-white/40" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="bg-[#161B27] border border-white/5 rounded-xl p-4 shadow-sm h-full">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${stop.visaStatus?.toLowerCase().includes('free') ? 'bg-[#10B981]/10 text-[#10B981]' : stop.visaStatus?.toLowerCase().includes('req') ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
                                                        {stop.visaStatus}
                                                    </span>
                                                    <span className="text-xs text-[#8892A4] font-medium">${stop.estimatedCost || 0}</span>
                                                </div>
                                                <div className="bg-[#080B14] rounded-lg p-2.5 mt-3 border border-white/5 h-full overflow-y-auto">
                                                    <p className="text-xs text-[#8892A4] leading-relaxed"><strong className="text-white">Tip:</strong> {stop.tips}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
