"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Order {
  id: string
  orderNumber: string
  total: number
  status: string
  paymentStatus: string
  createdAt: string
  items: Array<{
    product: {
      name: string
      image: string
    }
    quantity: number
    price: number
  }>
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const paylinkId = searchParams.get("paylinkId")
    const externalTransactionId = searchParams.get("externalTransactionId")

    if (paylinkId || externalTransactionId) {
      fetchOrderDetails(paylinkId || externalTransactionId)
    } else {
      setLoading(false)
    }
  }, [searchParams])

  const fetchOrderDetails = async (transactionId: string) => {
    try {
      const response = await fetch(`/api/orders/by-transaction/${transactionId}`)
      if (response.ok) {
        const orderData = await response.json()
        setOrder(orderData)
      }
    } catch (error) {
      console.error("Error fetching order:", error)
      toast.error("Failed to load order details")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-800">Payment Successful!</CardTitle>
            <CardDescription className="text-green-600">
              Thank you for your purchase. Your order has been confirmed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {order && (
              <>
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2">Order Details</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Order Number:</span> #{order.orderNumber}</p>
                    <p><span className="font-medium">Total:</span> R{order.total.toFixed(2)}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className="ml-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">R{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold mb-2 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                What's Next?
              </h3>
              <ul className="text-sm space-y-1">
                <li>• You'll receive an email confirmation shortly</li>
                <li>• Your order is being processed</li>
                <li>• We'll notify you when it ships</li>
                <li>• Track your order in your account</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/orders">
                  <Package className="h-4 w-4 mr-2" />
                  View My Orders
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
