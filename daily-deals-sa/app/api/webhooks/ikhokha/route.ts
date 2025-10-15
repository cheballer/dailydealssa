import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ikhokhaService } from "@/lib/ikhokha"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("ik-sign") || ""
    const appId = request.headers.get("ik-appid") || ""

    // Verify webhook signature
    const callbackUrl = `${process.env.NEXTAUTH_URL}/api/webhooks/ikhokha`
    const isValidSignature = ikhokhaService.verifyWebhookSignature(body, signature, callbackUrl)

    if (!isValidSignature) {
      console.error("Invalid webhook signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const webhookData = JSON.parse(body)
    const { paylinkID, status, externalTransactionID, responseCode } = webhookData

    if (responseCode !== "00") {
      console.error("Invalid response code from webhook:", responseCode)
      return NextResponse.json({ error: "Invalid response code" }, { status: 400 })
    }

    // Find the order by externalTransactionID (which is our order ID)
    const order = await db.order.findUnique({
      where: { id: externalTransactionID },
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!order) {
      console.error("Order not found:", externalTransactionID)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Update order status based on payment result
    if (status === "SUCCESS") {
      await db.order.update({
        where: { id: order.id },
        data: {
          status: "CONFIRMED",
          paymentStatus: "PAID",
          trackingNumber: paylinkID, // Store paylinkID as reference
        }
      })

      // TODO: Send confirmation email to customer
      console.log(`Payment successful for order ${order.orderNumber}`)

      // TODO: Trigger courier service integration
      // You can call your courier service here to create shipment

    } else if (status === "FAILURE") {
      await db.order.update({
        where: { id: order.id },
        data: {
          status: "CANCELLED",
          paymentStatus: "FAILED",
        }
      })

      console.log(`Payment failed for order ${order.orderNumber}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
