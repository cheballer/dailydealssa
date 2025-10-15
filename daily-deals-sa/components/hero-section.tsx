import { Button } from "@/components/ui/button"
import { Clock, TrendingDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10" />
      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm">
            <Clock className="h-4 w-4" />
            <span>New deals every 24 hours</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl text-balance">
            South Africa's Hottest Daily Deals
          </h1>

          <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl text-pretty">
            Unbeatable prices on electronics, appliances, vapes, and hardware. Limited stock. Don't miss out!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base font-semibold">
              <TrendingDown className="mr-2 h-5 w-5" />
              Shop Today's Deals
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base font-semibold bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20"
            >
              Browse Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
