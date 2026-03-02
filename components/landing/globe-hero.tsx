"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"

// react-globe.gl needs to be dynamically imported because it relies on the window object
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false })

export function GlobeHero() {
    const globeRef = useRef<any>(null)
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        setMounted(true)
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                setDimensions({
                    width: entries[0].contentRect.width,
                    height: entries[0].contentRect.height,
                })
            }
        })

        const container = document.getElementById("globe-container")
        if (container) {
            resizeObserver.observe(container)
        }

        return () => resizeObserver.disconnect()
    }, [])

    useEffect(() => {
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true
            globeRef.current.controls().autoRotateSpeed = 0.5
            globeRef.current.controls().enableZoom = false
            globeRef.current.pointOfView({ altitude: 2 })
        }
    }, [mounted])

    if (!mounted) return <div className="w-full h-full animate-pulse bg-white/5 rounded-full" />

    // Generate random arcs to simulate flight routes
    const arcsData = [...Array(20).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 160,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 160,
        endLng: (Math.random() - 0.5) * 360,
        color: ['#4F8EF7', '#A78BFA', '#10B981'][Math.floor(Math.random() * 3)]
    }))

    return (
        <div id="globe-container" className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
            <Globe
                ref={globeRef}
                width={dimensions.width}
                height={dimensions.height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                backgroundColor="rgba(0,0,0,0)"
                arcsData={arcsData}
                arcColor="color"
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={2000}
                arcsTransitionDuration={1000}
                showAtmosphere={true}
                atmosphereColor="#4F8EF7"
                atmosphereAltitude={0.15}
            />
        </div>
    )
}
