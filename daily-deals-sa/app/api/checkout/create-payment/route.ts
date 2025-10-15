import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { ikhokhaService } from "@/lib/ikhokha"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items, total, userId, shippingInfo } = await request.json()

    // Create order in database first
    const orderNumber = `DD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    const order = await db.order.create({
      data: {
        userId,
        orderNumber,
        status: "PENDING",
        subtotal: items.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0),
        shippingCost: 99,
        tax: items.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0) * 0.15,
        total,
        paymentStatus: "PENDING",
        items: {
          create: items.map((item: any) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
        shippingAddress: {
          create: {
            userId,
            type: "SHIPPING",
            firstName: shippingInfo.firstName,
            lastName: shippingInfo.lastName,
            address1: shippingInfo.address,
            city: shippingInfo.city,
            province: shippingInfo.province,
            postalCode: shippingInfo.postalCode,
            phone: shippingInfo.phone,
            isDefault: false,
          }
        }
      },
    })

    // Create iKhokha payment request
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
    const description = `Daily Deals SA - Order #${order.orderNumber}`
    
    const paymentRequest = ikhokhaService.createPaymentRequest(
      order.id,
      total,
      description,
      baseUrl
    )

    // Create payment link with iKhokha
    const paymentResponse = await ikhokhaService.createPaymentLink(paymentRequest)

    if (paymentResponse.responseCode === "00" && paymentResponse.paylinkUrl) {
      // Update order with payment details
      await db.order.update({
        where: { id: order.id },
        data: {
          paymentIntentId: paymentResponse.paylinkID,
        }
      })

      // Clear cart
      await db.cartItem.deleteMany({
        where: { userId },
      })

      return NextResponse.json({
        paylinkUrl: paymentResponse.paylinkUrl,
        orderId: order.id,
        paylinkId: paymentResponse.paylinkID,
      })
    } else {
      // Delete the order if payment creation failed
      await db.order.delete({
        where: { id: order.id }
      })

      return NextResponse.json(
        { error: "Failed to create payment link" },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
