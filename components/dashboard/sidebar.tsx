"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Compass, Book, Map, TrendingUp, BellRing, Building2, BotMessageSquare, Settings } from "lucide-react"

const navItems = [
    { name: "Overview", href: "/dashboard", icon: Book },
    { name: "Routes", href: "/dashboard/routes", icon: Map },
    { name: "Upgrade Path", href: "/dashboard/upgrade", icon: TrendingUp },
    { name: "Alerts", href: "/dashboard/alerts", icon: BellRing },
    { name: "Embassy Tracker", href: "/dashboard/embassy", icon: Building2 },
    { name: "AI Advisor", href: "/dashboard/advisor", icon: BotMessageSquare },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-[260px] h-screen fixed left-0 top-0 border-r border-[#1E2738] bg-[#080B14] hidden md:flex flex-col z-40">
            <div className="h-20 flex items-center px-6 border-b border-[#1E2738]">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Compass className="w-8 h-8 text-[#4F8EF7]" />
                    <span className="text-xl font-display font-bold text-white tracking-tight">VisaPath</span>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive ? "text-white" : "text-[#8892A4] hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 bg-white/5 rounded-xl border-l-[3px] border-[#4F8EF7]"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <item.icon className="w-5 h-5 relative z-10" />
                            <span className="relative z-10 font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-[#1E2738]">
                <div className="p-3 rounded-xl bg-[#0D1117] border border-white/5 flex flex-col gap-2 hover:border-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8EF7] to-[#A78BFA] flex items-center justify-center font-bold text-white shadow-inner">
                            J
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-semibold truncate text-white">John Doe</span>
                            <span className="text-xs text-[#8892A4] truncate">john@example.com</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1 px-1">
                        <span className="text-[#8892A4]">Plan</span>
                        <span className="bg-[#4F8EF7]/20 text-[#4F8EF7] px-2 py-0.5 rounded-full font-medium">Pro</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
