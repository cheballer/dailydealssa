import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { CourierService } from "@/lib/courier"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { courierService } = await request.json()

    // Get order details
    const order = await db.order.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: true
          }
        },
        shippingAddress: true,
        user: true
      }
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Create shipment with courier service
    const shipment = await CourierService.createShipment(
      order.id,
      courierService,
      {
        name: `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim(),
        address: order.shippingAddress?.address1 || "",
        city: order.shippingAddress?.city || "",
        province: order.shippingAddress?.province || "",
        postalCode: order.shippingAddress?.postalCode || "",
        phone: order.shippingAddress?.phone || ""
      },
      order.items.map(item => ({
        name: item.product.name,
        weight: 1, // Default weight - should be calculated based on product
        value: item.price
      }))
    )

    // Update order with tracking information
    await db.order.update({
      where: { id: params.id },
      data: {
        status: "SHIPPED",
        trackingNumber: shipment.trackingNumber,
        courierService,
        estimatedDelivery: shipment.estimatedDelivery
      }
    })

    // Update order tracking in courier service
    await CourierService.updateOrderTracking(order.id, shipment.trackingNumber)

    return NextResponse.json({
      message: "Shipping updated successfully",
      trackingNumber: shipment.trackingNumber,
      estimatedDelivery: shipment.estimatedDelivery
    })
  } catch (error) {
    console.error("Error updating shipping:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
