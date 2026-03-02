import type { Metadata, Viewport } from "next"
import { Inter, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "VisaPath | Borderless Intelligence",
  description: "AI-powered global mobility insights for digital nomads, expats, and world travelers.",
}

export const viewport: Viewport = {
  themeColor: "#080B14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${display.variable} antialiased bg-[#080B14] text-white selection:bg-[#4F8EF7] selection:text-white`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
