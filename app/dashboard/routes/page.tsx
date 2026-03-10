import { createClient } from "@/lib/supabase/server"
import { RoutePlannerView } from "@/components/route/route-planner-view"

export default async function RoutesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let passports: { country_code: string; country_name: string }[] = []
    if (user) {
        const { data } = await supabase
            .from('user_passports')
            .select('country_code, country_name')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true })
        if (data) passports = data
    }

    return (
        <div className="h-full flex flex-col -m-6 lg:-m-10">
            <div className="p-6 lg:p-10 pb-0 flex-shrink-0">
                <h2 className="text-3xl font-display font-bold mb-2">Route Planner</h2>
                <p className="text-[var(--color-text-secondary)]">Optimize your multi-country trip based on visa rules.</p>
            </div>

            <div className="flex-1 min-h-0 mt-6 relative">
                <RoutePlannerView passports={passports} />
            </div>
        </div>
    )
}
