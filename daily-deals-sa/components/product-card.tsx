'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Zap } from "lucide-react"
import { isDropActive } from "@/lib/free-drops"
import Link from "next/link"
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
  freeDrop?: FreeDrop | null
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isFree = product.freeDrop && isDropActive(product.freeDrop.dropAt, product.freeDrop.claimedAt);
  const displayPrice = isFree ? 0 : (product.price ?? 0);
  const hasDiscount = (product.discount ?? 0) > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if product already in cart
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      // Update quantity
      existingItem.quantity += 1;
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.name,
        price: displayPrice,
        image: product.image,
        quantity: 1
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success message
    toast.success(isFree ? "Free item added to cart!" : "Added to cart!");
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/30">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {isFree ? (
            <Badge className="absolute top-3 right-3 bg-green-600 text-white font-bold text-sm px-3 py-1 animate-pulse">
              <Zap className="h-3 w-3 mr-1 inline fill-current" />
              FREE DROP!
            </Badge>
          ) : hasDiscount ? (
            <Badge className="absolute top-3 right-3 bg-[var(--deal-badge)] text-[var(--deal-badge-foreground)] font-bold">
              {product.discount}% OFF
            </Badge>
          ) : null}
          {product.stock < 20 && !isFree && (
            <Badge variant="destructive" className="absolute top-3 left-3 font-semibold">
              Low Stock
            </Badge>
          )}
          {isFree && product.stock < 5 && (
            <Badge variant="destructive" className="absolute top-3 left-3 font-semibold">
              Only {product.stock} left!
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2 text-xs">
          {product.category}
        </Badge>
        <h3 className="mb-2 text-lg font-bold text-card-foreground line-clamp-1">{product.name}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex items-baseline gap-2">
          {isFree ? (
            <span className="text-3xl font-bold text-green-600">FREE</span>
          ) : (
            <>
              <span className="text-2xl font-bold text-primary">R{displayPrice.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > displayPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  R{product.originalPrice.toLocaleString()}
                </span>
              )}
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full font-semibold" 
          size="sm"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isFree ? "Claim Free" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
