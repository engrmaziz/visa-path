import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Topbar() {
    return (
        <header className="h-20 border-b border-[#1E2738] bg-[#080B14]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10">
            <div className="flex items-center gap-4">
                {/* Mobile menu trigger would go here */}
            </div>

            <div className="flex items-center gap-6 flex-1 justify-end">
                <div className="relative w-full max-w-sm hidden md:block">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8892A4]" />
                    <Input
                        placeholder="Search destinations, rules..."
                        className="pl-10 h-10 bg-[#0D1117] border-white/5 rounded-full text-sm"
                    />
                </div>

                <button className="relative p-2 text-[#8892A4] hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] border-2 border-[#080B14]" />
                </button>

                <div className="md:hidden w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8EF7] to-[#A78BFA] flex items-center justify-center font-bold text-white text-sm">
                    J
                </div>
            </div>
        </header>
    )
}
