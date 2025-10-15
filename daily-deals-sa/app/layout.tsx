import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "Daily Deals SA - South Africa's Hottest Daily Deals",
  description: "Unbeatable prices on electronics, appliances, vapes, and hardware. New deals every 24 hours!",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
