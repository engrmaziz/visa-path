import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
// import { MobileTabBar } from "@/components/dashboard/mobile-tab-bar"
import { ReactNode } from "react"

export default function DashboardLayout({ children, modal }: { children: ReactNode, modal: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#080B14] text-white selection:bg-[#4F8EF7] selection:text-white flex">
            <Sidebar />
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
