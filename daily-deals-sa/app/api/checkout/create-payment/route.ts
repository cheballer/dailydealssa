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

    const { items, userId, shippingInfo, total: clientTotal } = await request.json()

    console.log("📦 Creating order with items:", items.length)
    if (typeof clientTotal === "number") {
      console.log("💰 Client provided total amount:", clientTotal)
    }

    // Create order in database first
    const orderNumber = `DDZ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
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
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0)
    const shippingCost = 99
    const tax = subtotal * 0.15
    const computedTotal = subtotal + shippingCost + tax

    console.log("📊 Computed totals -> Subtotal:", subtotal, "Shipping:", shippingCost, "Tax:", tax, "Total:", computedTotal)

    const order = await db.order.create({
      data: {
        userId,
        orderNumber,
        status: "PENDING",
        subtotal,
        shippingCost,
        tax,
        total: computedTotal,
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
    const description = `DailyDealzSA - Order #${order.orderNumber}`
    
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
          price: unitPrice,
          quantity: quantity,
        }
      };
    })

    const shippingCostCents = Math.round(shippingCost * 100);
    if (shippingCostCents > 0) {
      lineItems.push({
        displayName: "Shipping",
        quantity: 1,
        unitPrice: shippingCostCents,
        totalPrice: shippingCostCents,
        pricingDetails: {
          price: shippingCostCents,
          quantity: 1,
        }
      })
    }

    const taxAmountCents = Math.round(tax * 100);
    if (taxAmountCents > 0) {
      lineItems.push({
        displayName: "VAT (15%)",
        quantity: 1,
        unitPrice: taxAmountCents,
        totalPrice: taxAmountCents,
        pricingDetails: {
          price: taxAmountCents,
          quantity: 1,
        }
      })
    }

    const checkoutRequest = yocoService.createCheckoutRequest(
      order.id,
      computedTotal,
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
