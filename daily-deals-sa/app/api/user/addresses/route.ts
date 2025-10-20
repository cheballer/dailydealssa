import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user's addresses
    const addresses = await db.address.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: [
        { isDefault: "desc" },
        { createdAt: "desc" },
      ],
    })

    return NextResponse.json({ addresses })
  } catch (error) {
    console.error("Addresses fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Check if user already has 4 addresses
    const addressCount = await db.address.count({
      where: {
        userId: session.user.id,
      },
    })

    if (addressCount >= 4) {
      return NextResponse.json(
        { error: "Maximum of 4 addresses allowed per user. Please delete an existing address first." },
        { status: 400 }
      )
    }

    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await db.address.updateMany({
        where: {
          userId: session.user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      })
    }

    // Create new address
    const address = await db.address.create({
      data: {
        userId: session.user.id,
        type: "SHIPPING",
        firstName: data.firstName,
        lastName: data.lastName,
        address1: data.address1,
        address2: data.address2 || "",
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
        phone: data.phone,
        isDefault: data.isDefault || false,
      },
    })

    return NextResponse.json({ address })
  } catch (error) {
    console.error("Address creation error:", error)
    return NextResponse.json(
      { error: "Failed to create address" },
      { status: 500 }
    )
  }
}

