import { HeroSection } from "@/components/hero-section"
import { DailyDeals } from "@/components/daily-deals"
import { ProductGrid } from "@/components/product-grid"

export default function Home() {
  return (
    <>
      <HeroSection />
      <DailyDeals />
      <ProductGrid />
    </>
  )
}
