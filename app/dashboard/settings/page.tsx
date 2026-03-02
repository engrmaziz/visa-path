"use client"

import { useState, useEffect } from "react"
import { Settings, CreditCard, User, Shield, Check, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import toast from "react-hot-toast"

export default function SettingsPage() {
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState<"profile" | "security" | "billing">("profile")

    // User Data State
    const [userId, setUserId] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [plan, setPlan] = useState("FREE")

    // Security State
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        async function loadProfile() {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return

                setUserId(user.id)
                setEmail(user.email || "")

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (profile) {
                    // Split full name into first and last
                    const names = (profile.full_name || "").split(" ")
                    setFirstName(names[0] || "")
                    setLastName(names.slice(1).join(" ") || "")
                    setPlan(profile.plan || "FREE")
                }
            } catch (error) {
                console.error('Error loading user profile:', error)
            } finally {
                setLoading(false)
            }
        }

        loadProfile()
    }, [supabase])

    const handleSaveProfile = async () => {
        try {
            setSaving(true)
            const fullName = `${firstName} ${lastName}`.trim()

            const { error } = await supabase
                .from('profiles')
                .update({ full_name: fullName })
                .eq('id', userId)

            if (error) throw error
            toast.success("Profile updated successfully")
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile")
        } finally {
            setSaving(false)
        }
    }

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters")
            return
        }

        try {
            setSaving(true)
            const { error } = await supabase.auth.updateUser({ password: newPassword })
            if (error) throw error

            toast.success("Password updated successfully")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error: any) {
            toast.error(error.message || "Failed to update password")
        } finally {
            setSaving(false)
        }
    }

    const initials = firstName ? firstName.charAt(0).toUpperCase() + (lastName ? lastName.charAt(0).toUpperCase() : '') : "U"

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-[#4F8EF7]" />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col pb-12 p-4 md:p-8">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 flex items-center justify-center md:justify-start gap-3">
                    <Settings className="w-8 h-8 text-[#A78BFA]" /> Account Settings
                </h2>
                <p className="text-[var(--color-text-secondary)]">Manage your preferences, passwords, and subscription plan.</p>
            </div>

            <div className="grid md:grid-cols-[240px_1fr] gap-10">
                {/* Settings Nav */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-colors ${activeTab === "profile" ? "bg-white/5 border-white/10 text-white shadow-sm" : "border-transparent text-[#8892A4] hover:bg-white/5 hover:text-white"}`}
                    >
                        <User className={`w-4 h-4 ${activeTab === "profile" ? "text-[#A78BFA]" : ""}`} /> Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-colors ${activeTab === "security" ? "bg-white/5 border-white/10 text-white shadow-sm" : "border-transparent text-[#8892A4] hover:bg-white/5 hover:text-white"}`}
                    >
                        <Shield className={`w-4 h-4 ${activeTab === "security" ? "text-[#EF4444]" : ""}`} /> Security
                    </button>
                    <button
                        onClick={() => setActiveTab("billing")}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-colors ${activeTab === "billing" ? "bg-white/5 border-white/10 text-white shadow-sm" : "border-transparent text-[#8892A4] hover:bg-white/5 hover:text-white"}`}
                    >
                        <CreditCard className={`w-4 h-4 ${activeTab === "billing" ? "text-[#10B981]" : ""}`} /> Billing
                    </button>
                </div>

                {/* Content Area */}
                <div className="space-y-8">
                    {/* PROFILE TAB */}
                    {activeTab === "profile" && (
                        <section className="glass p-6 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold mb-6">Personal Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F8EF7] to-[#A78BFA] flex items-center justify-center text-2xl font-bold border-4 border-[#080B14] shadow-lg text-white">
                                        {initials}
                                    </div>
                                    <Button variant="secondary" size="sm" disabled>Change Avatar</Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">First Name</label>
                                        <Input
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Enter first name"
                                            className="bg-[#161B27] border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">Last Name</label>
                                        <Input
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Enter last name"
                                            className="bg-[#161B27] border-white/10"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">Email Address</label>
                                        <Input
                                            value={email}
                                            type="email"
                                            disabled
                                            className="bg-white/5 border-transparent text-[#8892A4] cursor-not-allowed"
                                        />
                                        <p className="text-xs text-[#8892A4]">Email address cannot be changed currently.</p>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button onClick={handleSaveProfile} disabled={saving} className="bg-[#4F8EF7] hover:bg-[#3b71ca] text-white">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SECURITY TAB */}
                    {activeTab === "security" && (
                        <section className="glass p-6 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold mb-6">Security Settings</h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">New Password</label>
                                        <Input
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            type="password"
                                            placeholder="Enter new password"
                                            className="bg-[#161B27] border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-[#8892A4] tracking-wider">Confirm New Password</label>
                                        <Input
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="bg-[#161B27] border-white/10"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-start">
                                    <Button onClick={handleChangePassword} disabled={saving || !newPassword || !confirmPassword} className="bg-[#EF4444] hover:bg-[#DC2828] text-white">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Shield className="w-4 h-4 mr-2" />}
                                        Update Password
                                    </Button>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* BILLING TAB */}
                    {activeTab === "billing" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <section className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                                {plan === "PRO" && <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8EF7]/20 blur-3xl rounded-full" />}
                                <h3 className="text-xl font-bold mb-2">Subscription Plan</h3>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>
                                        <p className="text-[#8892A4] text-sm">
                                            You are currently on the <strong className="text-white uppercase">{plan} PLAN</strong>.
                                        </p>
                                        {plan === "PRO" && (
                                            <div className="flex items-center gap-2 mt-2 text-xs text-[#10B981] font-semibold">
                                                <Check className="w-3 h-3" /> Active and renewing
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-left md:text-right">
                                        <span className="text-3xl font-display font-bold">{plan === "PRO" ? "$7" : "$0"}</span>
                                        <span className="text-[#8892A4]">/mo</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    {plan === "FREE" ? (
                                        <Button className="bg-gradient-to-r from-[#4F8EF7] to-[#A78BFA] text-white border-0 hover:opacity-90 transition-opacity">
                                            Upgrade to Pro
                                        </Button>
                                    ) : (
                                        <Button variant="secondary">Manage Billing</Button>
                                    )}
                                </div>
                            </section>

                            <section className="glass p-6 rounded-2xl border border-white/5">
                                <h4 className="text-lg font-bold mb-4">Plan Comparison</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col h-full">
                                        <h5 className="font-bold text-white mb-1">Free Tier</h5>
                                        <p className="text-xs text-[#8892A4] mb-4">Perfect for getting started</p>
                                        <ul className="space-y-2 text-sm text-[#8892A4] flex-1">
                                            <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-[#8892A4]" /> Basic Route Planning</li>
                                            <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-[#8892A4]" /> Top 20 Embassy Directory</li>
                                            <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-[#8892A4]" /> Limited AI Advisor access</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gradient-to-b from-[#4F8EF7]/10 to-transparent border border-[#4F8EF7]/20 flex flex-col h-full">
                                        <h5 className="font-bold text-[#4F8EF7] mb-1">Pro Tier</h5>
                                        <p className="text-xs text-[#8892A4] mb-4">For serious digital nomads</p>
                                        <ul className="space-y-2 text-sm text-white/90 flex-1">
                                            <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-[#10B981]" /> Advanced Multi-City Routes</li>
                                            <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-[#10B981]" /> Full Global Embassy Directory</li>
                                            <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-[#10B981]" /> Unlimited AI Advisor queries</li>
                                            <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-[#10B981]" /> Real-time Visa Alerts</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
