'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Flame, ShoppingCart, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  stock: number
}

export function DailyDeals() {
  const [featuredDeal, setFeaturedDeal] = useState<Product | null>(null);

  useEffect(() => {
    // For now, just display static content
    // In a real app, you'd fetch the featured deal from an API
  }, []);

  // Fallback product
  const defaultDeal = {
    id: "1",
    name: "Check Out Today's Deals",
    description: "Amazing discounts and 10 free items daily! Don't miss out on incredible savings.",
    price: 0,
    originalPrice: 0,
    discount: 0,
    image: "/modern-air-fryer-kitchen-appliance.jpg",
    stock: 100,
    category: "Featured",
  };

  const deal = featuredDeal || defaultDeal;

  return (
    <section id="deals" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-primary">
            <Zap className="h-6 w-6 fill-primary" />
            <span className="text-sm font-bold uppercase tracking-wider">Daily Deals + Free Drops</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">Today's Amazing Offers</h2>
        </div>

        <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[4/3] md:aspect-auto bg-muted">
              <img
                src={deal.image || "/placeholder.svg"}
                alt={deal.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6 md:p-8 space-y-6">
              <div>
                <h3 className="mb-3 text-2xl font-bold text-card-foreground md:text-3xl">{deal.name}</h3>
                <p className="mb-6 text-muted-foreground leading-relaxed">{deal.description}</p>
              </div>

              <div className="space-y-4">
                <Button size="lg" className="w-full text-base font-semibold" asChild>
                  <Link href="/deals/today">
                    <Flame className="mr-2 h-5 w-5 fill-current" />
                    View Today's Deals
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full text-base font-semibold" asChild>
                  <Link href="/categories">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Browse All Categories
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
