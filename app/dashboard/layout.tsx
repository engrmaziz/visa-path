import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
// import { MobileTabBar } from "@/components/dashboard/mobile-tab-bar"
import { ReactNode } from "react"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardLayout({ children, modal }: { children: ReactNode, modal: ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let profile = null
    if (user) {
        const { data } = await supabase.from('profiles').select('full_name, plan').eq('id', user.id).single()
        profile = {
            email: user.email,
            full_name: data?.full_name || 'User',
            plan: data?.plan || 'free'
        }
    }
    return (
        <div className="min-h-screen bg-[#080B14] text-white selection:bg-[#4F8EF7] selection:text-white flex">
            <Sidebar user={profile} />
            <div className="flex-1 md:pl-[260px] flex flex-col min-h-screen">
                <Topbar />
                <main className="flex-1 p-6 lg:p-10 pb-24 md:pb-10 relative">
                    {children}
                    {modal}
                </main>
            </div>
            {/* <MobileTabBar /> */}
        </div>
    )
}
