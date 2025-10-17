"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ShoppingCart, CreditCard, MapPin, Loader2, X } from "lucide-react"

interface CartItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    image: string
  }
  quantity: number
}

function CheckoutForm({ cartItems, total, shippingInfo }: { 
  cartItems: CartItem[], 
  total: number, 
  shippingInfo: any 
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/checkout/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          total,
          userId: session?.user?.id,
          shippingInfo,
        }),
      })

      const { paylinkUrl, orderId } = await response.json()

      if (paylinkUrl) {
        // Redirect to Yoco payment page
        window.location.href = paylinkUrl
      } else {
        toast.error("Failed to create payment link")
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Payment Information
        </CardTitle>
        <CardDescription>
          Secure payment powered by Yoco
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">
              You will be redirected to Yoco's secure payment page to complete your purchase.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>SSL Encrypted</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Secure Payment</span>
            </div>
          </div>
          
          <Button
            onClick={handlePayment}
            className="w-full"
            disabled={loading || !shippingInfo.firstName || !shippingInfo.address}
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Payment Link...
              </>
            ) : (
              `Pay R${total.toFixed(2)}`
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CheckoutPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
  })

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin")
      return
    }
    fetchCartItems()
  }, [session, router])

  const fetchCartItems = () => {
    try {
      // Get cart items from localStorage
      const cartData = localStorage.getItem('cart')
      
      if (cartData) {
        const items = JSON.parse(cartData)
        
        // Convert localStorage items to cart items format
        const cartItemsData = items.map((item: any) => ({
          id: item.id,
          product: {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image
          },
          quantity: item.quantity
        }))
        
        setCartItems(cartItemsData)
      } else {
        setCartItems([])
      }
    } catch (error) {
      console.error("Error fetching cart items:", error)
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = 99 // Fixed shipping cost in South Africa
  const tax = subtotal * 0.15 // 15% VAT
  const total = subtotal + shipping + tax

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-4">Add some items to your cart before checking out</p>
          <Button onClick={() => router.push("/")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Information
              </CardTitle>
              <CardDescription>
                Enter your shipping details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    value={shippingInfo.province}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, province: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <CheckoutForm cartItems={cartItems} total={total} shippingInfo={shippingInfo} />
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="font-medium">R{(item.product.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updatedCart = cartItems.filter(i => i.id !== item.id);
                        setCartItems(updatedCart);
                        localStorage.setItem('cart', JSON.stringify(updatedCart.map(i => ({
                          id: i.id,
                          name: i.product.name,
                          price: i.product.price,
                          image: i.product.image,
                          quantity: i.quantity
                        }))));
                        window.dispatchEvent(new Event('cartUpdated'));
                        toast.success('Item removed from cart');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>R{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (15% VAT)</span>
                  <span>R{tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
