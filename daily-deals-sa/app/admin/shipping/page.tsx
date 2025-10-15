"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Truck, Package, MapPin, Clock } from "lucide-react"
import { toast } from "sonner"

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  total: number
  trackingNumber?: string
  courierService?: string
  estimatedDelivery?: string
  createdAt: string
  user: {
    name: string
    email: string
  }
  shippingAddress?: {
    firstName: string
    lastName: string
    address1: string
    city: string
    province: string
    postalCode: string
  }
}

export default function AdminShippingPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCourier = async (orderId: string, courierService: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/shipping`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courierService }),
      })

      if (response.ok) {
        toast.success("Shipping updated successfully")
        fetchOrders()
      } else {
        toast.error("Failed to update shipping")
      }
    } catch (error) {
      console.error("Error updating shipping:", error)
      toast.error("Failed to update shipping")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "secondary"
      case "CONFIRMED":
        return "default"
      case "PROCESSING":
        return "default"
      case "SHIPPED":
        return "default"
      case "DELIVERED":
        return "default"
      case "CANCELLED":
        return "destructive"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const shippedOrders = orders.filter(order => order.status === "SHIPPED" || order.trackingNumber)
  const pendingOrders = orders.filter(order => order.status === "PROCESSING" || order.status === "CONFIRMED")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shipping Management</h1>
        <p className="text-gray-600">Manage order shipping and tracking</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              Orders ready to ship
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipped Orders</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shippedOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              Orders in transit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">
              All orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              On-time delivery
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            Manage shipping for all orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.user.name}</p>
                      <p className="text-sm text-gray-500">{order.user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>R{order.total}</TableCell>
                  <TableCell>
                    {order.courierService ? (
                      <Badge variant="outline">{order.courierService}</Badge>
                    ) : (
                      <Select
                        value=""
                        onValueChange={(value) => handleUpdateCourier(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="POSTNET">PostNet</SelectItem>
                          <SelectItem value="ARAMEX">Aramex</SelectItem>
                          <SelectItem value="FASTWAY">Fastway</SelectItem>
                          <SelectItem value="DHL">DHL</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.trackingNumber ? (
                      <a
                        href="#"
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          // Open tracking in new window
                          window.open(`/track/${order.trackingNumber}`, '_blank')
                        }}
                      >
                        {order.trackingNumber}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not shipped</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {order.trackingNumber && (
                        <Button size="sm" variant="outline">
                          Track
                        </Button>
                      )}
                      {!order.trackingNumber && (
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdateCourier(order.id, "POSTNET")}
                        >
                          Ship Now
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
