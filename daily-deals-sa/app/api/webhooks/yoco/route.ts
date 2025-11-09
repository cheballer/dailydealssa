import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

const YOCO_WEBHOOK_SECRET = process.env.YOCO_WEBHOOK_SECRET || ""

function verifySignature(signature: string | null, payload: string) {
  if (!YOCO_WEBHOOK_SECRET || !signature) {
    return false
  }

  try {
    const encoder = new TextEncoder()
    const keyData = encoder.encode(YOCO_WEBHOOK_SECRET)
    const payloadData = encoder.encode(payload)

    return crypto.subtle
      .importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["verify"])
      .then((key) =>
        crypto.subtle.verify("HMAC", key, hexToBytes(signature), payloadData),
      )
  } catch (error) {
    console.error("Signature verification error:", error)
    return false
  }
}

function hexToBytes(hex: string) {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  }
  return bytes
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get("x-yoco-signature")

    const validSignature = await verifySignature(signature, rawBody)

    if (!validSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const payload = JSON.parse(rawBody)

    const event = payload?.event
    const status = payload?.status
    const metadata = payload?.metadata || {}
    const orderId =
      metadata.orderId || metadata.order_id || metadata.order_id || payload?.paymentRequestId

    if (!orderId) {
      console.warn("Received Yoco webhook without order reference:", payload)
      return NextResponse.json({ received: true })
    }

    if (event === "payment.successful" || status === "successful") {
      await db.order.updateMany({
        where: {
          OR: [{ id: orderId }, { paymentIntentId: payload?.id }, { orderNumber: metadata.orderNumber }],
        },
        data: {
          paymentStatus: "PAID",
          status: "CONFIRMED",
        },
      })
    }

    if (event === "payment.failed" || status === "failed") {
      await db.order.updateMany({
        where: {
          OR: [{ id: orderId }, { paymentIntentId: payload?.id }, { orderNumber: metadata.orderNumber }],
        },
        data: {
          paymentStatus: "FAILED",
          status: "CANCELLED",
        },
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Yoco webhook handler error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}


