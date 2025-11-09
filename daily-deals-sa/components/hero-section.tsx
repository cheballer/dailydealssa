'use client'

import { Button } from "@/components/ui/button"
import { Clock, TrendingDown, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8faff] via-[#eef2ff] to-[#dae4ff]">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-5" />
      <div className="container relative mx-auto px-6 py-24 md:py-28">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-6 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
            <Clock className="h-4 w-4" />
            <span>Fresh blue-tag specials every 24 hours + 10 FREE drops</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold text-[#152548] md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
            DailyDealzSA: South Africa's Smart Way to Save
          </h1>

          <p className="mx-auto max-w-2xl text-pretty text-lg text-[#1f3259cc] md:text-xl">
            Shop curated electronics, appliances, and hardware with vibrant DailyDealzSA blues,
            dependable savings, and premium service trusted by savvy shoppers nationwide.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto shadow-xl" asChild>
              <Link href="/deals/today">
                <TrendingDown className="mr-2 h-5 w-5" />
                Shop Today's Deals
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border border-[#c5d2f0] text-[#1f3259] hover:border-[#1f3c88]"
              asChild
            >
              <Link href="/categories">
                Browse Categories
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
