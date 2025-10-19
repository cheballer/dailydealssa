'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Zap, Package, Truck, Shield } from "lucide-react"
import { isDropActive } from "@/lib/free-drops"
import { useState } from "react"
import { toast } from "sonner"

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

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(product.image)
  const [quantity, setQuantity] = useState(1)
  const isFree = product.freeDrop && isDropActive(product.freeDrop.dropAt, product.freeDrop.claimedAt)
  const displayPrice = isFree ? 0 : (product.price ?? 0)
  const hasDiscount = (product.discount ?? 0) > 0

  const handleAddToCart = () => {
    try {
      const existingCart = localStorage.getItem('cart')
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
      
      localStorage.setItem('cart', JSON.stringify(cart))
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
    </div>
  )
}

