import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InstallPrompt } from "@/components/install-prompt"
import "./globals.css"

export const metadata: Metadata = {
  title: "Daily Deals SA - South Africa's Hottest Daily Deals",
  description: "Unbeatable prices on electronics, appliances, and hardware. New deals every 24 hours + 10 FREE items daily!",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Daily Deals SA",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Daily Deals SA",
    title: "Daily Deals SA - South Africa's Hottest Daily Deals",
    description: "Unbeatable prices on electronics, appliances, and hardware. New deals every 24 hours + 10 FREE items daily!",
  },
  twitter: {
    card: "summary",
    title: "Daily Deals SA",
    description: "South Africa's Hottest Daily Deals",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <html lang="en">
      <head>
        {googleMapsApiKey && (
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`}
            async
            defer
          />
        )}
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <InstallPrompt />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
