import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { yocoService } from "@/lib/yoco"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items, total, userId, shippingInfo } = await request.json()

    console.log("📦 Creating order with items:", items.length)
    console.log("💰 Total amount:", total)

    // Create order in database first
    const orderNumber = `DD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    // First, create the shipping address
    const shippingAddress = await db.address.create({
      data: {
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
    })
    
    // Then create the order with the shipping address ID
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
        shippingAddressId: shippingAddress.id,
        items: {
          create: items.map((item: any) => ({
            productId: item.id, // Use item.id directly since we're passing from localStorage
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    })

    console.log("✅ Order created:", order.orderNumber)

    // Create Yoco checkout request
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
    const description = `Daily Deals SA - Order #${order.orderNumber}`
    
    console.log("🔗 Creating Yoco checkout...")
    console.log("Base URL:", baseUrl)
    
    // Prepare line items for Yoco
    const lineItems = items.map((item: any) => {
      const unitPrice = Math.round(item.product.price * 100);
      const quantity = item.quantity;
      const totalPrice = unitPrice * quantity;
      
      return {
        displayName: item.product.name,
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        pricingDetails: {
          unitPrice: unitPrice,
          quantity: quantity,
          totalPrice: totalPrice,
        }
      };
    })

    const checkoutRequest = yocoService.createCheckoutRequest(
      order.id,
      total,
      description,
      baseUrl,
      lineItems
    )

    console.log("Checkout request:", JSON.stringify(checkoutRequest, null, 2))

    // Create checkout with Yoco
    const checkoutResponse = await yocoService.createCheckout(checkoutRequest)

    console.log("Checkout response:", JSON.stringify(checkoutResponse, null, 2))

    if (checkoutResponse.redirectUrl) {
      // Update order with payment details
      await db.order.update({
        where: { id: order.id },
        data: {
          paymentIntentId: checkoutResponse.id,
        }
      })

      console.log("✅ Yoco checkout created successfully:", checkoutResponse.redirectUrl)

      return NextResponse.json({
        paylinkUrl: checkoutResponse.redirectUrl,
        orderId: order.id,
        checkoutId: checkoutResponse.id,
      })
    } else {
      // Delete the order if checkout creation failed
      await db.order.delete({
        where: { id: order.id }
      })

      console.error("❌ Failed to create Yoco checkout:", checkoutResponse)

      return NextResponse.json(
        { 
          error: "Failed to create checkout",
          details: "Unknown error"
        },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error("❌ Payment creation error:", error)
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error.message || "Unknown error",
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
