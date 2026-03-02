import { RoutePlannerView } from "@/components/route/route-planner-view"

export default function RoutesPage() {
    // In a real app, we'd fetch the user's default passport here.
    const defaultPassport = "USA"

    return (
        <div className="h-full flex flex-col -m-6 lg:-m-10">
            <div className="p-6 lg:p-10 pb-0 flex-shrink-0">
                <h2 className="text-3xl font-display font-bold mb-2">Route Planner</h2>
                <p className="text-[var(--color-text-secondary)]">Optimize your multi-country trip based on visa rules.</p>
            </div>

            <div className="flex-1 min-h-0 mt-6 relative">
                <RoutePlannerView defaultPassport={defaultPassport} />
            </div>
        </div>
    )
}
