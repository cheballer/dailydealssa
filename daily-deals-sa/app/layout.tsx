import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "DailyDealzSA - South Africa's Smart Way to Save",
  description: "Discover curated savings on electronics, appliances, and hardware with daily blue-tag specials from DailyDealzSA.",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DailyDealzSA",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "DailyDealzSA",
    title: "DailyDealzSA - South Africa's Smart Way to Save",
    description: "Discover curated savings on electronics, appliances, and hardware with daily blue-tag specials from DailyDealzSA.",
  },
  twitter: {
    card: "summary",
    title: "DailyDealzSA",
    description: "South Africa's blue-tag savings destination",
  },
}

export const viewport: Viewport = {
  themeColor: "#0F62FE",
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
      <body className={`font-sans ${spaceGrotesk.variable} ${inter.variable}`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <WhatsAppButton />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
