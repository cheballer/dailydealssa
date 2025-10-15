import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { quantity } = await request.json()

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Valid quantity is required" },
        { status: 400 }
      )
    }

    const updatedItem = await db.cartItem.update({
      where: {
        id: params.id,
        userId: session.user?.id
      },
      data: { quantity },
      include: {
        product: true
      }
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("Error updating cart item:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await db.cartItem.delete({
      where: {
        id: params.id,
        userId: session.user?.id
      }
    })

    return NextResponse.json({ message: "Item removed from cart" })
  } catch (error) {
    console.error("Error removing cart item:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
