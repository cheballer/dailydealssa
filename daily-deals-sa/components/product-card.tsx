import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  originalPrice: number
  dealPrice: number
  discount: number
  image: string
  category: string
  stock: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/30">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-[var(--deal-badge)] text-[var(--deal-badge-foreground)] font-bold">
          {product.discount}% OFF
        </Badge>
        {product.stock < 20 && (
          <Badge variant="destructive" className="absolute top-3 left-3 font-semibold">
            Low Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2 text-xs">
          {product.category}
        </Badge>
        <h3 className="mb-2 text-lg font-bold text-card-foreground line-clamp-1">{product.name}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">R{product.dealPrice.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground line-through">R{product.originalPrice.toLocaleString()}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full font-semibold" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
