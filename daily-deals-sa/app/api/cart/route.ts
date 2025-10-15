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

    const cartItems = await db.cartItem.findMany({
      where: { userId: session.user?.id },
      include: {
        product: true
      }
    })

    return NextResponse.json(cartItems)
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json(
      { error: "Internal server error" },
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

    const { productId, quantity = 1 } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      )
    }

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product || !product.active) {
      return NextResponse.json(
        { error: "Product not found or inactive" },
        { status: 404 }
      )
    }

    // Check if item already exists in cart
    const existingItem = await db.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: session.user?.id!,
          productId
        }
      }
    })

    if (existingItem) {
      // Update quantity
      const updatedItem = await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          product: true
        }
      })
      return NextResponse.json(updatedItem)
    } else {
      // Create new cart item
      const newItem = await db.cartItem.create({
        data: {
          userId: session.user?.id!,
          productId,
          quantity
        },
        include: {
          product: true
        }
      })
      return NextResponse.json(newItem, { status: 201 })
    }
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
