'use client'

'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Zap, Package, Truck, Shield, Star } from "lucide-react"
import { isDropActive } from "@/lib/free-drops"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"

interface FreeDrop {
  id: string
  dropAt: Date
  claimedAt: Date | null
  claimedByUserId: string | null
}

interface Product {
  id: string
  name: string
  description: string
  originalPrice?: number
  price: number
  discount?: number
  image: string
  category: string
  stock: number
  sku: string
  freeDrop?: FreeDrop | null
}

interface ProductDetailProps {
  product: Product
}

interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  createdAt: string
  variant?: string
  helpfulCount?: number
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Bev",
    rating: 5,
    title: "Makes the best foam ever!",
    content:
      "I am super happy with this purchase. It makes the best milk foam ever! Can highly recommend this product.",
    createdAt: "2025-01-12",
    variant: "Colour: Cherry Red",
    helpfulCount: 46,
  },
  {
    id: "2",
    author: "Marinda",
    rating: 5,
    title: "Happy with great quality product",
    content:
      "I had a similar machine for 12 years and replaced it with this version – exactly the same machine, just more modern. A few weeks in, it works great and has more capacity.",
    createdAt: "2025-02-03",
    variant: "Colour: White",
    helpfulCount: 28,
  },
  {
    id: "3",
    author: "Thembi",
    rating: 4,
    title: "Great value",
    content:
      "Does exactly what I need and the coffee tastes amazing. Shipping was fast. Docking one star because the water tank could be larger.",
    createdAt: "2025-01-28",
    helpfulCount: 12,
  },
]

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(product.image)
  const [quantity, setQuantity] = useState(1)
  const [recommended, setRecommended] = useState<Product[]>([])
  const [loadingRelated, setLoadingRelated] = useState(true)
  const { data: session, status } = useSession()
  const router = useRouter()
  const isFree = product.freeDrop && isDropActive(product.freeDrop.dropAt, product.freeDrop.claimedAt)
  const displayPrice = isFree ? 0 : (product.price ?? 0)
  const hasDiscount = (product.discount ?? 0) > 0

  useEffect(() => {
    const controller = new AbortController()
    const fetchRecommendations = async () => {
      try {
        setLoadingRelated(true)
        const response = await fetch(
          `/api/products?category=${encodeURIComponent(product.category)}&limit=6`,
          { signal: controller.signal }
        )
        if (response.ok) {
          const data = await response.json()
          const items: Product[] = (data.products || []).filter(
            (item: Product) => item.id !== product.id
          )
          setRecommended(items.slice(0, 4))
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Failed to load recommendations:", error)
        }
      } finally {
        setLoadingRelated(false)
      }
    }

    fetchRecommendations()

    return () => controller.abort()
  }, [product.category, product.id])

  const reviewSummary = useMemo(() => {
    if (SAMPLE_REVIEWS.length === 0) {
      return { average: 0, breakdown: [0, 0, 0, 0, 0] }
    }

    const totals = [0, 0, 0, 0, 0]
    let sum = 0
    SAMPLE_REVIEWS.forEach((review) => {
      const index = review.rating - 1
      totals[index] = totals[index] + 1
      sum += review.rating
    })

    return {
      average: sum / SAMPLE_REVIEWS.length,
      breakdown: totals.reverse(), // for display 5 -> 1
    }
  }, [])

  const handleAddToCart = () => {
    // Check if running in the browser before using localStorage
    if (typeof window === "undefined") {
      toast.error("Cart is unavailable in this environment")
      return
    }

    const userId = session?.user?.id

    if (!userId) {
      if (status === "loading") {
        toast.warning("Please wait while we confirm your session…")
        return
      }
      toast.error("Please sign in to add items to cart.")
      router.push("/auth/signin")
      return
    }

    const cartKey = `cart_${userId}`

    try {
      const existingCart = localStorage.getItem(cartKey)
      const cart = existingCart ? JSON.parse(existingCart) : []
      
      const existingItem = cart.find((item: any) => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: displayPrice,
          image: product.image,
          quantity: quantity
        })
      }
      
      localStorage.setItem(cartKey, JSON.stringify(cart))
      window.dispatchEvent(new Event('cartUpdated'))
      
      toast.success(isFree ? `Free item added to cart!` : `${quantity} item(s) added to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error("Failed to add item to cart")
    }
  }

  // For now, use the single image. In the future, you can add multiple images
  const images = [product.image]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative aspect-square bg-muted">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-contain p-4"
              />
              {isFree && (
                <Badge className="absolute top-4 right-4 bg-green-600 text-white font-bold text-lg px-4 py-2 animate-pulse">
                  <Zap className="h-5 w-5 mr-2 inline fill-current" />
                  FREE DROP!
                </Badge>
              )}
              {hasDiscount && !isFree && (
                <Badge className="absolute top-4 right-4 bg-[var(--deal-badge)] text-[var(--deal-badge-foreground)] font-bold text-lg px-4 py-2">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>
          </Card>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === img ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
          </div>

          <div className="space-y-4">
            <div>
              {isFree ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-green-600">FREE</span>
                  {product.originalPrice && (
                    <span className="text-2xl text-muted-foreground line-through">
                      R{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">R{displayPrice.toLocaleString()}</span>
                  {product.originalPrice && product.originalPrice > displayPrice && (
                    <span className="text-2xl text-muted-foreground line-through">
                      R{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              <p className="text-base leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Free shipping on orders over R500</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>30-day return policy</span>
              </div>
            </div>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full h-12 text-lg font-semibold"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isFree ? "Claim Free Item" : "Add to Cart"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 text-lg font-semibold"
                  size="lg"
                >
                  Buy Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-12 space-y-12">
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">You might also like</h2>
              <p className="text-sm text-muted-foreground">
                Customers who viewed this item also looked at these deals.
              </p>
            </div>
            <Link href="/categories" className="text-primary hover:underline text-sm">
              Browse all categories
            </Link>
          </div>
          {loadingRelated ? (
            <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="h-full animate-pulse">
                  <CardContent className="h-48" />
                </Card>
              ))}
            </div>
          ) : recommended.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
              {recommended.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">
              We are curating personalised recommendations for this item. Check back soon.
            </div>
          )}
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Customer Reviews</h2>
            <Button variant="outline" size="sm">
              Write a review
            </Button>
          </div>

          {SAMPLE_REVIEWS.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                Be the first to review this product.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold">
                      {reviewSummary.average.toFixed(1)}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < Math.round(reviewSummary.average) ? "fill-current" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Based on {SAMPLE_REVIEWS.length} review{SAMPLE_REVIEWS.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {reviewSummary.breakdown.map((count, index) => {
                      const starValue = 5 - index
                      const percentage = (count / SAMPLE_REVIEWS.length) * 100 || 0
                      return (
                        <div key={starValue} className="flex items-center gap-2 text-sm">
                          <span className="flex w-10 items-center gap-1">
                            {starValue}
                            <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
                          </span>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="w-10 text-right text-xs text-muted-foreground">
                            {count}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {SAMPLE_REVIEWS.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="space-y-3 pt-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-yellow-500">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                  key={index}
                                  className={`h-4 w-4 ${
                                    index < review.rating ? "fill-current" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-semibold">{review.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {review.author} &middot;{" "}
                            {new Date(review.createdAt).toLocaleDateString("en-ZA", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                            {review.variant ? ` &middot; ${review.variant}` : ""}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {review.content}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-primary">
                          Helpful
                          {typeof review.helpfulCount === "number" && (
                            <span className="font-medium text-foreground">
                              ({review.helpfulCount})
                            </span>
                          )}
                        </button>
                        <span>&middot;</span>
                        <button className="hover:text-destructive">Report</button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}