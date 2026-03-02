import { Bell, ShieldAlert, Globe2, ArrowRight } from "lucide-react"

const mockAlerts = [
    {
        id: 1,
        title: "EU ETIAS implementation delayed to 2025",
        description: "The European Travel Information and Authorisation System (ETIAS) for visa-exempt nationals has been officially postponed.",
        date: "2 hours ago",
        type: "global",
        isNew: true
    },
    {
        id: 2,
        title: "Brazil reintroduces visa requirement for US, Canada, Australia",
        description: "Starting next month, e-visas will be strictly required prior to arrival.",
        date: "1 day ago",
        type: "regional",
        isNew: true
    },
    {
        id: 3,
        title: "Thailand expands visa-free entry to 93 countries",
        description: "New policy allows 60-day visa-exempt stays for tourism and short-term business.",
        date: "3 days ago",
        type: "positive",
        isNew: false
    }
]

export default function AlertsPage() {
    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 flex items-center gap-3">
                        <Bell className="w-8 h-8 text-[var(--color-primary)]" /> Policy Alerts
                    </h2>
                    <p className="text-[var(--color-text-secondary)]">Stay ahead of changing border rules and visa requirements.</p>
                </div>
                <div className="flex bg-[#161B27] p-1 rounded-xl border border-white/5">
                    <button className="px-4 py-2 rounded-lg bg-[#4F8EF7]/10 text-[#4F8EF7] text-sm font-medium">All Alerts</button>
                    <button className="px-4 py-2 rounded-lg text-[#8892A4] hover:text-white text-sm font-medium transition-colors">Global</button>
                    <button className="px-4 py-2 rounded-lg text-[#8892A4] hover:text-white text-sm font-medium transition-colors">My Passports</button>
                </div>
            </div>

            <div className="space-y-4 pb-12">
                {mockAlerts.map(alert => (
                    <div key={alert.id} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
                        {alert.isNew && (
                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                <div className="absolute top-2 -right-6 w-24 bg-[#4F8EF7] text-white text-[10px] font-bold uppercase tracking-wider py-1 text-center rotate-45 shadow-sm">
                                    New
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 items-start">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${alert.type === 'global' ? 'bg-[#4F8EF7]/10 text-[#4F8EF7]' :
                                    alert.type === 'positive' ? 'bg-[#10B981]/10 text-[#10B981]' :
                                        'bg-[#F59E0B]/10 text-[#F59E0B]'
                                }`}>
                                {alert.type === 'global' ? <Globe2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-bold pr-8">{alert.title}</h3>
                                </div>
                                <p className="text-[#8892A4] text-sm leading-relaxed mb-3 max-w-2xl">{alert.description}</p>
                                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-[#4A5568]">
                                    <span>{alert.date}</span>
                                    <button className="text-[#4F8EF7] hover:text-white transition-colors flex items-center gap-1 group-hover:gap-2">
                                        Read Full Policy <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
