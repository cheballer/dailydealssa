"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Truck,
  CreditCard,
  MapPin,
  Calendar,
  ArrowLeft,
  CheckCircle,
  CircleDot,
} from "lucide-react"
import Link from "next/link"

interface Address {
  firstName: string
  lastName: string
  company?: string | null
  address1: string
  address2?: string | null
  city: string
  province: string
  postalCode: string
  country: string
  phone?: string | null
}

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    name: string
    image: string | null
    sku: string | null
  }
}

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  trackingNumber?: string | null
  courierService?: string | null
  estimatedDelivery?: string | null
  createdAt: string
  items: OrderItem[]
  shippingAddress?: Address | null
  billingAddress?: Address | null
}

const ORDER_STEPS: { status: string; title: string; description: string }[] = [
  {
    status: "PENDING",
    title: "Order Placed",
    description: "We received your order and it is awaiting confirmation.",
  },
  {
    status: "CONFIRMED",
    title: "Payment Confirmed",
    description: "Your payment has been confirmed and we are preparing your order.",
  },
  {
    status: "PROCESSING",
    title: "In Process",
    description: "Items are being picked and packed.",
  },
  {
    status: "SHIPPED",
    title: "Shipped",
    description: "Your parcel is on the way.",
  },
  {
    status: "DELIVERED",
    title: "Delivered",
    description: "Delivered successfully.",
  },
]

export default function OrderDetailPage() {
  const params = useParams<{ orderId: string }>()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
      return
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/user/orders/${params.orderId}`)
        if (response.ok) {
          const data = await response.json()
          setOrder(data.order)
        } else if (response.status === 404) {
          router.push("/orders")
        }
      } catch (error) {
        console.error("Error fetching order detail:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [session, status, params.orderId, router])

  const timeline = useMemo(() => {
    if (!order) return ORDER_STEPS
    const currentStatus = order.status
    return ORDER_STEPS.map((step) => ({
      ...step,
      completed:
        ORDER_STEPS.findIndex((s) => s.status === currentStatus) >=
        ORDER_STEPS.findIndex((s) => s.status === step.status),
    }))
  }, [order])

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              className="mb-2 flex items-center gap-2 px-0"
              onClick={() => router.push("/orders")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to orders
            </Button>
            <h1 className="text-3xl font-bold">Order #{order?.orderNumber ?? "…"}</h1>
            {order && (
              <p className="text-muted-foreground">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-ZA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
          {order && (
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-primary text-primary-foreground">
                {order.status}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Payment: {order.paymentStatus}
              </Badge>
            </div>
          )}
        </div>

        {loading || !order ? (
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <Package className="mr-3 h-6 w-6 animate-spin text-muted-foreground" />
              <span className="text-muted-foreground">Loading order details...</span>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Order Progress</CardTitle>
                <CardDescription>
                  Follow the journey of your order from placement to delivery.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-5">
                  {timeline.map((step, index) => (
                    <div key={step.status} className="flex flex-col items-center text-center">
                      <div
                        className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                          step.completed
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-muted text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <CircleDot className="h-6 w-6" />
                        )}
                      </div>
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                      {index < timeline.length - 1 && (
                        <div className="hidden h-px w-full max-w-[120px] flex-1 bg-muted md:block" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Items in this order</CardTitle>
                  <CardDescription>Purchased products and quantities.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-lg border p-4"
                    >
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <span className="font-semibold">
                            R{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Qty {item.quantity} × R{item.price.toLocaleString()}
                        </p>
                        {item.product.sku && (
                          <p className="text-xs text-muted-foreground">
                            SKU: {item.product.sku}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Subtotal</span>
                      <span>R{order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Shipping</span>
                      <span>R{order.shippingCost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Tax</span>
                      <span>R{order.tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-base font-semibold">
                      <span>Total Paid</span>
                      <span>R{order.total.toLocaleString()}</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Download Receipt
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Details</CardTitle>
                    {order.trackingNumber && (
                      <CardDescription>
                        Tracking #{order.trackingNumber} · {order.courierService ?? "Courier"}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                      {order.shippingAddress ? (
                        <div>
                          <p className="font-medium">
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                          </p>
                          <p>{order.shippingAddress.address1}</p>
                          {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                          <p>
                            {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
                            {order.shippingAddress.postalCode}
                          </p>
                          <p>{order.shippingAddress.country}</p>
                          {order.shippingAddress.phone && (
                            <p className="mt-1 text-muted-foreground">
                              Phone: {order.shippingAddress.phone}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p>No shipping address on file.</p>
                      )}
                    </div>
                    {order.estimatedDelivery && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Estimated delivery{" "}
                          {new Date(order.estimatedDelivery).toLocaleDateString("en-ZA", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Need help?</CardTitle>
                <CardDescription>
                  Contact us if you have any questions about this order.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Support</Link>
                </Button>
                {order.trackingNumber && (
                  <Button variant="outline">
                    <Truck className="mr-2 h-4 w-4" />
                    Track Shipment
                  </Button>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}


