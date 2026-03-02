"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ArrowRight, CheckCircle2, CircleDot, Sparkles, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RoadmapTimeline() {
    const [currentPassport, setCurrentPassport] = useState("India")
    const [goal, setGoal] = useState("EU Citizenship")
    const [loading, setLoading] = useState(false)
    const [roadmap, setRoadmap] = useState<any>(null)

    const generateRoadmap = async () => {
        if (!currentPassport || !goal) return
        setLoading(true)
        try {
            const res = await fetch('/api/upgrade/roadmap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassport, goal })
            })
            const data = await res.json()
            setRoadmap(data)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-10 lg:flex-row items-start relative h-full">
            {/* Settings Form */}
            <div className="w-full lg:w-80 flex-shrink-0 glass p-6 rounded-2xl border border-white/10 sticky top-[120px]">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
                    Set Parameters
                </h3>
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">Current Passport</label>
                        <Input value={currentPassport} onChange={e => setCurrentPassport(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">End Goal</label>
                        <Input value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g. EU Citizenship, USA EB-5" />
                    </div>
                    <Button className="w-full" size="lg" onClick={generateRoadmap} disabled={loading}>
                        {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing rules...</> : "Generate Roadmap"}
                    </Button>
                </div>
            </div>

            {/* Timeline Area */}
            <div className="flex-1 w-full pl-2 md:pl-8 border-l-2 border-dashed border-[#1E2738]/50 relative">
                <AnimatePresence>
                    {roadmap && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="absolute left-[-2px] top-0 w-0.5 bg-gradient-to-b from-[#4F8EF7] to-[#A78BFA]"
                            transition={{ duration: 2, ease: "linear" }}
                        />
                    )}
                </AnimatePresence>

                {!roadmap && !loading && (
                    <div className="h-64 flex flex-col items-center justify-center text-[#8892A4] text-center px-4">
                        <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                        <p>Define your current status and ultimate goal to generate a personalized legal pathway.</p>
                    </div>
                )}

                {loading && (
                    <div className="space-y-10 py-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative pl-10 animate-pulse">
                                <div className="absolute left-[-11px] md:left-[-41px] w-6 h-6 rounded-full bg-[#1E2738] border-4 border-[#080B14]" />
                                <div className="h-4 bg-white/5 rounded w-1/3 mb-4" />
                                <div className="h-24 bg-white/5 rounded-xl w-full" />
                            </div>
                        ))}
                    </div>
                )}

                {roadmap && !loading && (
                    <div className="space-y-12 pb-12">
                        {/* Header Results */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="pl-6 md:pl-10 mb-12 flex gap-4"
                        >
                            <div className="bg-[#4F8EF7]/10 border border-[#4F8EF7]/30 text-[#4F8EF7] px-4 py-2 rounded-xl text-sm font-medium">
                                Est. Time: {roadmap.totalEstimatedTime}
                            </div>
                            <div className="bg-[#A78BFA]/10 border border-[#A78BFA]/30 text-[#A78BFA] px-4 py-2 rounded-xl text-sm font-medium">
                                Est. Cost: {roadmap.totalEstimatedCost}
                            </div>
                        </motion.div>

                        {/* Path Nodes */}
                        {roadmap.milestones?.map((milestone: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.4 }}
                                className="relative pl-6 md:pl-10 group"
                            >
                                {/* Node marker */}
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.4 + 0.2 }}
                                    className={`absolute left-[-11px] md:left-[-45px] w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#080B14] z-10 ${idx === 0 ? 'bg-[#10B981] animate-pulse' : 'bg-[#1E2738]'
                                        }`}
                                >
                                    {idx === 0 ? <CircleDot className="w-4 h-4 text-white" /> : <div className="w-2 h-2 rounded-full bg-[#8892A4]" />}
                                </motion.div>

                                {/* Content Card */}
                                <div className="glass p-6 rounded-2xl border border-white/5 hover:border-[#4F8EF7]/40 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-xl font-bold">{milestone.title}</h4>
                                        <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${milestone.difficulty === 'Easy' ? 'bg-[#10B981]/20 text-[#10B981]' :
                                                milestone.difficulty === 'Hard' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                                            }`}>
                                            {milestone.difficulty}
                                        </span>
                                    </div>

                                    <p className="text-[#8892A4] text-sm leading-relaxed mb-6">{milestone.description}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-[#080B14]/50 p-3 rounded-xl border border-white/5">
                                            <span className="text-xs uppercase text-[#8892A4] block mb-1 font-semibold">Timeline</span>
                                            <span className="font-medium text-sm">{milestone.estimatedTime}</span>
                                        </div>
                                        <div className="bg-[#080B14]/50 p-3 rounded-xl border border-white/5">
                                            <span className="text-xs uppercase text-[#8892A4] block mb-1 font-semibold">Estimated Cost</span>
                                            <span className="font-medium text-sm">{milestone.estimatedCost}</span>
                                        </div>
                                    </div>

                                    {milestone.newCountriesUnlocked && milestone.newCountriesUnlocked.length > 0 && (
                                        <div className="pt-4 border-t border-white/5">
                                            <span className="text-xs text-[#8892A4] uppercase font-bold flex items-center gap-2 mb-2">
                                                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> New Access Unlocked
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {milestone.newCountriesUnlocked.map((c: string) => (
                                                    <span key={c} className="text-xs px-2 py-1 bg-white/5 rounded-md border border-white/10">{c}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {milestone.resources && milestone.resources.length > 0 && (
                                        <div className="pt-4 mt-4 border-t border-white/5 flex gap-4 overflow-x-auto">
                                            {milestone.resources.map((r: any, rId: number) => (
                                                <a key={rId} href={r.url} target="_blank" className="flex items-center gap-1.5 text-xs text-[#4F8EF7] hover:underline whitespace-nowrap bg-[#4F8EF7]/10 px-3 py-1.5 rounded-lg">
                                                    {r.title} <ExternalLink className="w-3 h-3" />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: roadmap.milestones.length * 0.4 }}
                            className="pl-6 md:pl-10 mt-12"
                        >
                            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#10B981]/20 to-transparent border border-[#10B981]/30">
                                <h4 className="text-[#10B981] font-bold flex items-center gap-2 mb-2"><CheckCircle2 className="w-5 h-5" /> Outcome</h4>
                                <p className="text-sm font-medium text-[#D1D5DB] leading-relaxed">{roadmap.projectedOutcome}</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    )
}
