import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { CATEGORIES } from "@/lib/constants"
import { generateProductSku } from "@/lib/products"

const CATEGORY_NAMES = new Set(CATEGORIES.map((category) => category.name))

async function getUniqueSku(name?: string, category?: string) {
  let attempts = 0
  let sku: string
  do {
    sku = generateProductSku(name, category)
    const existing = await db.product.findUnique({
      where: { sku },
    })
    if (!existing) {
      return sku
    }
    attempts += 1
  } while (attempts < 5)

  return `${generateProductSku().slice(0, 12)}${Math.random().toString(36).substring(2, 6).toUpperCase()}`
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const products = await db.product.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      brand,
      image,
      stock,
      sku,
      featured,
      active
    } = body

    // Check if SKU already exists
    if (!CATEGORY_NAMES.has(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      )
    }

    let normalizedSku = typeof sku === "string" ? sku.trim().toUpperCase() : ""

    if (normalizedSku) {
      const existingProduct = await db.product.findUnique({
        where: { sku: normalizedSku }
      })

      if (existingProduct) {
        return NextResponse.json(
          { error: "Product with this SKU already exists" },
          { status: 400 }
        )
      }
    } else {
      normalizedSku = await getUniqueSku(name, category)
    }

    const product = await db.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        category,
        brand,
        image,
        stock: parseInt(stock),
        sku: normalizedSku,
        featured: featured || false,
        active: active !== false
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
