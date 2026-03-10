import { createClient } from "@/lib/supabase/server"
import { PassportCard } from "@/components/shared/passport-card"
import { VisaMap } from "@/components/visa/visa-map"
import { AddPassportButton } from "@/components/visa/add-passport-button"

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let passports: any[] = []
    if (user) {
        const { data } = await supabase.from('user_passports').select('*').eq('user_id', user.id).order('created_at', { ascending: true })
        if (data) passports = data
    }
    return (
        <div className="flex flex-col h-full gap-8">
            <div>
                <h2 className="text-3xl font-display font-bold mb-2">My Passports</h2>
                <p className="text-[var(--color-text-secondary)]">Manage your citizenships and view global access mapping.</p>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 items-center">
                {passports.map((p) => (
                    <PassportCard
                        key={p.id}
                        id={p.id}
                        countryName={p.country_name}
                        countryCode={p.country_code}
                        strength="strong"
                    />
                ))}

                <AddPassportButton />
            </div>

            <div className="flex-1 min-h-[500px] flex flex-col gap-4">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-xl font-bold font-display">Global Access Map</h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">Combined visa-free access from your current passports.</p>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-xs font-medium">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#10B981]" /> Visa Free</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#F59E0B]" /> e-Visa / VOA</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#EF4444]" /> Visa Required</div>
                    </div>
                </div>

                <div className="flex-1 w-full rounded-2xl relative">
                    <VisaMap passports={passports.map(p => p.country_code)} />
                </div>
            </div>
        </div>
    )
}
