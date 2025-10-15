import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DailyDeals } from "@/components/daily-deals"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <DailyDeals />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}
