import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
    return (
        <div className="h-full w-full flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center gap-4 text-[#8892A4]">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4F8EF7]/20 to-[#A78BFA]/20 border border-[var(--color-primary)]/30 flex items-center justify-center shadow-[0_0_30px_rgba(79,142,247,0.15)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    <Loader2 className="w-6 h-6 text-[var(--color-primary)] animate-spin" />
                </div>
                <p className="font-medium text-sm tracking-widest uppercase font-display bg-clip-text text-transparent bg-gradient-to-r from-[#8892A4] to-white">Gathering Intelligence</p>
            </div>
        </div>
    )
}
