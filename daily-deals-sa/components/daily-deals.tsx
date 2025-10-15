import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Flame, ShoppingCart } from "lucide-react"

export function DailyDeals() {
  const featuredDeal = {
    id: 1,
    name: "Premium Air Fryer 5.5L",
    description: "Digital touchscreen, 8 preset cooking functions, non-stick basket",
    originalPrice: 2499,
    dealPrice: 1299,
    discount: 48,
    image: "/modern-air-fryer-kitchen-appliance.jpg",
    stock: 12,
    category: "Appliances",
  }

  const timeLeft = {
    hours: 18,
    minutes: 42,
    seconds: 15,
  }

  return (
    <section id="deals" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-primary">
            <Flame className="h-6 w-6 fill-primary" />
            <span className="text-sm font-bold uppercase tracking-wider">Deal of the Day</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">Today's Featured Deal</h2>
        </div>

        <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[4/3] md:aspect-auto bg-muted">
              <img
                src={featuredDeal.image || "/placeholder.svg"}
                alt={featuredDeal.name}
                className="h-full w-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-[var(--deal-badge)] text-[var(--deal-badge-foreground)] text-base font-bold px-3 py-1">
                {featuredDeal.discount}% OFF
              </Badge>
            </div>

            <div className="flex flex-col justify-between p-6 md:p-8">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {featuredDeal.category}
                </Badge>
                <h3 className="mb-3 text-2xl font-bold text-card-foreground md:text-3xl">{featuredDeal.name}</h3>
                <p className="mb-6 text-muted-foreground leading-relaxed">{featuredDeal.description}</p>

                <div className="mb-6 flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">R{featuredDeal.dealPrice.toLocaleString()}</span>
                  <span className="text-xl text-muted-foreground line-through">
                    R{featuredDeal.originalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="mb-6 rounded-lg bg-muted p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Deal ends in:</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold text-foreground">{timeLeft.hours}</span>
                      <span className="text-xs text-muted-foreground">Hours</span>
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold text-foreground">{timeLeft.minutes}</span>
                      <span className="text-xs text-muted-foreground">Minutes</span>
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold text-foreground">{timeLeft.seconds}</span>
                      <span className="text-xs text-muted-foreground">Seconds</span>
                    </div>
                  </div>
                </div>

                <p className="mb-6 text-sm font-medium text-destructive">Only {featuredDeal.stock} left in stock!</p>
              </div>

              <Button size="lg" className="w-full text-base font-semibold">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
