import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface RegisterWebhookPayload {
  name?: string
  url: string
  events?: string[]
}

const YOCO_WEBHOOK_ENDPOINT = "https://payments.yoco.com/api/webhooks"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!process.env.YOCO_SECRET_KEY) {
      return NextResponse.json(
        { error: "YOCO_SECRET_KEY env variable is not set" },
        { status: 500 }
      )
    }

    const body = (await request.json()) as RegisterWebhookPayload

    if (!body?.url) {
      return NextResponse.json({ error: "Webhook url is required" }, { status: 400 })
    }

    const payload = {
      name: body.name ?? "dailydealzsa-webhook",
      url: body.url,
      events:
        body.events && body.events.length > 0
          ? body.events
          : [
              "payment.successful",
              "payment.failed",
            ],
    }

    const response = await fetch(YOCO_WEBHOOK_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to register webhook",
          details: data,
        },
        { status: response.status },
      )
    }

    return NextResponse.json({
      success: true,
      webhook: data,
    })
  } catch (error) {
    console.error("Yoco webhook registration error:", error)
    return NextResponse.json(
      { error: "Unexpected error registering webhook" },
      { status: 500 },
    )
  }
}


