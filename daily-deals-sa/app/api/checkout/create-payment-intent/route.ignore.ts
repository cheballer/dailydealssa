import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items, total, userId } = await request.json()

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: "zar",
      metadata: {
        userId,
        items: JSON.stringify(items),
      },
    })

    // Create order in database
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
        paymentIntentId: paymentIntent.id,
        items: {
          create: items.map((item: any) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    })

    // Clear cart
    await db.cartItem.deleteMany({
      where: { userId },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    })
  } catch (error) {
    console.error("Payment intent creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
