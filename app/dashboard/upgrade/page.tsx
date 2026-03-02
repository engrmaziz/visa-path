import { RoadmapTimeline } from "@/components/upgrade/roadmap-timeline"

export default function UpgradePage() {
    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2">Upgrade Path Planner</h2>
                <p className="text-[var(--color-text-secondary)] text-lg">Generate a step-by-step, actionable timeline to a stronger passport.</p>
            </div>

            <div className="flex-1">
                <RoadmapTimeline />
            </div>
        </div>
    )
}
