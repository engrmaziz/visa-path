"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="h-full w-full flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center gap-4 text-center max-w-sm">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2 shadow-lg">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold font-display">System Glitch</h2>
                <p className="text-sm text-[#8892A4] leading-relaxed">
                    We encountered an error loading this dashboard feature. Our pathfinders have been notified.
                </p>
                <Button onClick={reset} variant="default" className="mt-4">
                    Attempt Recovery
                </Button>
            </div>
        </div>
    )
}
