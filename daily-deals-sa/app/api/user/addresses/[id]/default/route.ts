import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Verify the address belongs to the user
    const existingAddress = await db.address.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    // Unset all other defaults
    await db.address.updateMany({
      where: {
        userId: session.user.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    })

    // Set this address as default
    const address = await db.address.update({
      where: { id },
      data: {
        isDefault: true,
      },
    })

    return NextResponse.json({ address })
  } catch (error) {
    console.error("Set default address error:", error)
    return NextResponse.json(
      { error: "Failed to set default address" },
      { status: 500 }
    )
  }
}

