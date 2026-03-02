import { Settings, CreditCard, Lock, User, Check, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col pb-12">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 flex items-center gap-3">
                    <Settings className="w-8 h-8 text-[#A78BFA]" /> Account Settings
                </h2>
                <p className="text-[var(--color-text-secondary)]">Manage your preferences, passwords, and subscription plan.</p>
            </div>

            <div className="grid md:grid-cols-[240px_1fr] gap-10">
                {/* Settings Nav */}
                <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white shadow-sm">
                        <User className="w-4 h-4 text-[#A78BFA]" /> Profile
                    </button>
                    <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-sm font-medium text-[#8892A4] hover:text-white transition-colors">
                        <Shield className="w-4 h-4" /> Security
                    </button>
                    <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-sm font-medium text-[#8892A4] hover:text-white transition-colors">
                        <CreditCard className="w-4 h-4" /> Billing
                    </button>
                </div>

                {/* Content Area */}
                <div className="space-y-8">
                    {/* Profile Section */}
                    <section className="glass p-6 rounded-2xl border border-white/5">
                        <h3 className="text-xl font-bold mb-6">Personal Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F8EF7] to-[#A78BFA] flex items-center justify-center text-2xl font-bold border-4 border-[#080B14] shadow-lg">
                                    JD
                                </div>
                                <Button variant="secondary" size="sm">Change Avatar</Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">First Name</label>
                                    <Input defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">Last Name</label>
                                    <Input defaultValue="Doe" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">Email Address</label>
                                    <Input defaultValue="john.doe@example.com" type="email" />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                    </section>

                    {/* Current Plan */}
                    <section className="glass p-6 rounded-2xl border border-[#4F8EF7]/30 bg-[#4F8EF7]/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8EF7]/20 blur-3xl rounded-full" />
                        <h3 className="text-xl font-bold mb-2">Subscription Plan</h3>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-[#8892A4] text-sm">You are currently on the <strong className="text-white">Pro Plan</strong>.</p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-[#10B981] font-semibold">
                                    <Check className="w-3 h-3" /> Active until Dec 31, 2026
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-display font-bold">$7</span><span className="text-[#8892A4]">/mo</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="default">Manage Billing</Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
