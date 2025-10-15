import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    description: "Active noise cancellation, 30hr battery life",
    originalPrice: 1299,
    dealPrice: 799,
    discount: 38,
    image: "/wireless-earbuds-black.jpg",
    category: "Electronics",
    stock: 24,
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    description: "Fitness tracking, heart rate monitor, GPS",
    originalPrice: 3499,
    dealPrice: 2199,
    discount: 37,
    image: "/smart-watch-fitness.png",
    category: "Electronics",
    stock: 15,
  },
  {
    id: 4,
    name: "Vape Starter Kit",
    description: "Complete kit with 3 flavors, rechargeable",
    originalPrice: 899,
    dealPrice: 549,
    discount: 39,
    image: "/vape-device-modern.jpg",
    category: "Vapes",
    stock: 31,
  },
  {
    id: 5,
    name: "Cordless Drill Set",
    description: "20V lithium battery, 50-piece accessory kit",
    originalPrice: 1899,
    dealPrice: 1299,
    discount: 32,
    image: "/cordless-drill-power-tool.jpg",
    category: "Hardware",
    stock: 18,
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Waterproof, 360° sound, 12hr battery",
    originalPrice: 799,
    dealPrice: 449,
    discount: 44,
    image: "/bluetooth-speaker-portable.jpg",
    category: "Electronics",
    stock: 27,
  },
  {
    id: 7,
    name: "Electric Kettle 1.7L",
    description: "Rapid boil, auto shut-off, stainless steel",
    originalPrice: 599,
    dealPrice: 349,
    discount: 42,
    image: "/electric-kettle-stainless.jpg",
    category: "Appliances",
    stock: 22,
  },
  {
    id: 8,
    name: "LED Work Light",
    description: "Rechargeable, 3 brightness modes, magnetic base",
    originalPrice: 499,
    dealPrice: 279,
    discount: 44,
    image: "/led-work-light-tool.jpg",
    category: "Hardware",
    stock: 35,
  },
  {
    id: 9,
    name: "Gaming Mouse RGB",
    description: "16000 DPI, programmable buttons, ergonomic",
    originalPrice: 899,
    dealPrice: 599,
    discount: 33,
    image: "/gaming-mouse-rgb.jpg",
    category: "Electronics",
    stock: 19,
  },
]

export function ProductGrid() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">More Amazing Deals</h2>
          <p className="text-lg text-muted-foreground">Limited stock on all items. Grab them before they're gone!</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
