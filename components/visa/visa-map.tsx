"use client"

import { useEffect, useRef, useState } from "react"
import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import { useRouter } from "next/navigation"
import { getCombinedVisaStatus } from "@/lib/visa-data"

interface VisaMapProps {
    passports?: string[]
}

export function VisaMap({ passports = ['USA'] }: VisaMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<maptilersdk.Map | null>(null)
    const router = useRouter()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (map.current || !mapContainer.current) return

        maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY || "dummy"

        map.current = new maptilersdk.Map({
            container: mapContainer.current as HTMLElement,
            style: maptilersdk.MapStyle.STREETS,
            center: [10, 30],
            zoom: 1.5,
            geolocateControl: false,
            renderWorldCopies: false, // Fix repeating issue
        })

        // Add popup instance
        const popup = new maptilersdk.Popup({
            closeButton: false,
            closeOnClick: false,
            className: 'visa-popup'
        })

        map.current.on('load', () => {
            // Fetch the GeoJSON data
            fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
                .then(res => res.json())
                .then(data => {
                    // Enrich GeoJSON with visa status based on selected passports
                    data.features.forEach((feature: any) => {
                        const destCode = feature.properties.ISO_A3
                        const combinedData = getCombinedVisaStatus(passports, destCode)
                        feature.properties.visa_status = combinedData.status
                        feature.properties.visa_breakdown = JSON.stringify(combinedData.breakdown)
                        feature.properties.country_name = feature.properties.ADMIN
                    })

                    map.current?.addSource('countries', {
                        type: 'geojson',
                        data: data,
                        generateId: true // Required for feature-state hover to work
                    })

                    map.current?.addLayer({
                        id: 'country-fills',
                        type: 'fill',
                        source: 'countries',
                        paint: {
                            'fill-color': [
                                'match',
                                ['get', 'visa_status'],
                                'visa-free', '#10B981', // Green
                                'evisa', '#F59E0B',     // Yellow/Orange
                                'visa-required', '#EF4444', // Red
                                'rgba(255, 255, 255, 0.05)' // Default/Unknown
                            ],
                            'fill-opacity': 0.8
                        }
                    }, 'Water') // Insert below labels/water if this map style supports it, otherwise basic insertion

                    map.current?.addLayer({
                        id: 'country-borders',
                        type: 'line',
                        source: 'countries',
                        paint: {
                            'line-color': '#1E2738',
                            'line-width': 1,
                        }
                    })

                    map.current?.addLayer({
                        id: 'country-fills-hover',
                        type: 'fill',
                        source: 'countries',
                        paint: {
                            'fill-color': '#4F8EF7',
                            'fill-opacity': [
                                'case',
                                ['boolean', ['feature-state', 'hover'], false],
                                0.3,
                                0
                            ]
                        }
                    })

                    setLoaded(true)

                    let hoveredStateId: string | number | null = null

                    map.current?.on('mousemove', 'country-fills', (e) => {
                        if (e.features && e.features.length > 0 && map.current) {
                            if (hoveredStateId !== null) {
                                map.current.setFeatureState(
                                    { source: 'countries', id: hoveredStateId },
                                    { hover: false }
                                )
                            }
                            hoveredStateId = e.features[0].id as string | number
                            map.current.setFeatureState(
                                { source: 'countries', id: hoveredStateId },
                                { hover: true }
                            )

                            // Show Popup
                            const countryName = e.features[0].properties?.country_name

                            let breakdownObj: Record<string, string> = {}
                            try {
                                breakdownObj = JSON.parse(e.features[0].properties?.visa_breakdown || "{}")
                            } catch (err) { }

                            let breakdownHtml = ""
                            Object.entries(breakdownObj).forEach(([passport, status]) => {
                                let statusText = "Visa Required"
                                let statusColor = "text-red-400"
                                if (status === 'visa-free') {
                                    statusText = "Visa Free"
                                    statusColor = "text-emerald-400"
                                } else if (status === 'evisa') {
                                    statusText = "e-Visa / VOA"
                                    statusColor = "text-amber-400"
                                }

                                breakdownHtml += `<p class="text-[11px] font-semibold flex justify-between gap-4 mt-1"><span class="${statusColor} uppercase tracking-wider">${statusText}</span> <span class="text-[#8892A4]">(${passport})</span></p>`
                            })

                            if (!breakdownHtml) {
                                breakdownHtml = `<p class="text-[11px] font-semibold text-red-400 uppercase tracking-wider mt-1">Visa Required</p>`
                            }

                            const popupHtml = `
                                <div class="bg-[#080B14] border border-white/10 rounded-xl p-3 shadow-xl min-w-[140px]">
                                    <h4 class="font-bold text-white text-sm mb-2 pb-2 border-b border-white/10">${countryName}</h4>
                                    ${breakdownHtml}
                                </div>
                            `

                            popup.setLngLat(e.lngLat)
                                .setHTML(popupHtml)
                                .addTo(map.current)
                        }
                    })

                    map.current?.on('mouseleave', 'country-fills', () => {
                        if (hoveredStateId !== null && map.current) {
                            map.current.setFeatureState(
                                { source: 'countries', id: hoveredStateId },
                                { hover: false }
                            )
                        }
                        hoveredStateId = null
                        popup.remove()
                    })

                    map.current?.on('click', 'country-fills', (e) => {
                        if (!e.features || e.features.length === 0) return
                        const countryCode = e.features[0].properties?.ISO_A3
                        if (countryCode) {
                            router.push(`/dashboard/country/${countryCode.toLowerCase()}`)
                        }
                    })

                    map.current?.on('mouseenter', 'country-fills', () => {
                        if (map.current) map.current.getCanvas().style.cursor = 'pointer'
                    })

                    map.current?.on('mouseleave', 'country-fills', () => {
                        if (map.current) map.current.getCanvas().style.cursor = ''
                    })
                })
                .catch(err => {
                    console.error("Failed to load geojson:", err)
                    setLoaded(true) // Ensure loader disappears even on fail
                })
        })

        return () => {
            map.current?.remove()
            map.current = null
        }
    }, [router, passports])

    return (
        <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/10 glass">
            {/* Global style for popup to remove maptiler defaults */}
            <style jsx global>{`
                .visa-popup .maplibregl-popup-content {
                    background: transparent;
                    padding: 0;
                    box-shadow: none;
                }
                .visa-popup .maplibregl-popup-tip {
                    display: none;
                }
            `}</style>

            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0D1627] z-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-[#4F8EF7] rounded-full animate-spin" />
                        <span className="text-xs text-[#8892A4] font-medium tracking-widest uppercase">Initializing Map</span>
                    </div>
                </div>
            )}
            <div ref={mapContainer} className="w-full h-full bg-[#080B14]" />
        </div>
    )
}
