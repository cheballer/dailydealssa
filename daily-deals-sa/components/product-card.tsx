'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Zap } from "lucide-react"
import { isDropActive } from "@/lib/free-drops"
import Link from "next/link"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

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
  const { data: session } = useSession();
  const router = useRouter();
  const isFree = product.freeDrop && isDropActive(product.freeDrop.dropAt, product.freeDrop.claimedAt);
  const displayPrice = isFree ? 0 : (product.price ?? 0);
  const hasDiscount = (product.discount ?? 0) > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if user is logged in
    if (!session) {
      toast.error("Please sign in to add items to cart");
      router.push("/auth/signin");
      return;
    }
    
    try {
      // Get user-specific cart key
      const userId = session.user.id;
      const cartKey = `cart_${userId}`;
      
      // Get existing cart from localStorage
      const existingCart = localStorage.getItem(cartKey);
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
      
      // Save back to localStorage with user-specific key
      localStorage.setItem(cartKey, JSON.stringify(cart));
      
      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Show success message
      toast.success(isFree ? "Free item added to cart!" : "Added to cart!");
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <Card className="group overflow-hidden rounded-3xl border border-border/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white via-white to-[#f2f5ff]">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {isFree ? (
            <Badge className="absolute top-3 right-3 bg-green-600 text-white font-semibold px-3 py-1 shadow-md">
              <Zap className="h-3 w-3 mr-1 inline fill-current" />
              FREE DROP!
            </Badge>
          ) : hasDiscount ? (
            <Badge className="absolute top-3 right-3 bg-[var(--deal-badge)] text-[var(--deal-badge-foreground)] font-semibold px-3 py-1 shadow-md">
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

      <CardContent className="space-y-4 p-5">
        <Badge variant="secondary" className="text-[11px] font-medium uppercase tracking-wide">
          {product.category}
        </Badge>
        <h3
          className="line-clamp-1 text-xl font-semibold tracking-tight text-[#152548]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-baseline gap-2">
          {isFree ? (
            <span className="text-3xl font-bold text-green-600">FREE</span>
          ) : (
            <>
              <span className="text-2xl font-semibold text-primary">R{displayPrice.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > displayPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  R{product.originalPrice.toLocaleString()}
                </span>
              )}
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        <Button
          className="w-full text-sm font-semibold shadow-md transition-colors duration-200 hover:from-[#3658b8] hover:to-[#1a2f6d]"
          size="lg"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isFree ? "Claim Free" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
