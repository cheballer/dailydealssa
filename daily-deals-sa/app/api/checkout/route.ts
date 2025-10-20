import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getPaymentProvider } from '@/lib/payments';
import { getShippingProvider } from '@/lib/shipping';
import { shiplogicService } from '@/lib/shiplogic';
import { isDropActive, getStartOfToday, getEndOfToday } from '@/lib/free-drops';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { items, shippingAddressId } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get shipping address if provided
    let shippingAddress = null;
    if (shippingAddressId) {
      shippingAddress = await prisma.address.findFirst({
        where: {
          id: shippingAddressId,
          userId: user.id,
        },
      });
    }

    // Validate and process items
    const startOfToday = getStartOfToday();
    const endOfToday = getEndOfToday();
    
    let subtotal = 0;
    let hasFreeItems = false;
    const orderItems: Array<{ productId: string; quantity: number; price: number }> = [];
    const freeDropClaims: string[] = [];

    for (const item of items) {
      const { productId, quantity } = item;

      // Get product with free drop info
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
          freeDrops: {
            where: {
              dropAt: {
                gte: startOfToday,
                lte: endOfToday,
              },
            },
          },
        },
      });

      if (!product || !product.active) {
        return NextResponse.json({ error: `Product ${productId} not available` }, { status: 400 });
      }

      if (product.stock < quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 400 });
      }

      // Check if this is a free drop
      const freeDrop = product.freeDrops[0];
      const isFree = freeDrop && isDropActive(freeDrop.dropAt, freeDrop.claimedAt);

      if (isFree) {
        // Check if user already claimed this drop today
        const existingClaim = await prisma.freeDrop.findFirst({
          where: {
            productId: product.id,
            claimedByUserId: user.id,
            dropAt: {
              gte: startOfToday,
              lte: endOfToday,
            },
          },
        });

        if (existingClaim) {
          return NextResponse.json({ 
            error: `You have already claimed a free ${product.name} today` 
          }, { status: 400 });
        }

        // Free item - only allow quantity of 1
        if (quantity > 1) {
          return NextResponse.json({ 
            error: `Free drops are limited to 1 per customer` 
          }, { status: 400 });
        }

        hasFreeItems = true;
        freeDropClaims.push(freeDrop.id);
        orderItems.push({ productId: product.id, quantity: 1, price: 0 });
      } else {
        // Regular paid item
        const itemTotal = product.price * quantity;
        subtotal += itemTotal;
        orderItems.push({ productId: product.id, quantity, price: product.price });
      }
    }

    // Calculate totals
    const shippingCost = subtotal > 500 ? 0 : 65; // Free shipping over R500
    const tax = 0; // VAT included in price
    const total = subtotal + shippingCost + tax;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    let paymentIntentId: string | null = null;
    let trackingNumber: string | null = null;
    let courierService = 'Shiplogic';
    let estimatedDelivery: Date | null = null;

    // Handle payment
    if (total === 0) {
      // Free order - skip payment
      paymentIntentId = `free-${Date.now()}`;
    } else {
      // Create payment intent
      const paymentProvider = getPaymentProvider();
      const paymentIntent = await paymentProvider.createPaymentIntent({
        amount: Math.round(total * 100), // Convert to cents
        currency: 'ZAR',
        metadata: {
          orderNumber,
          userId: user.id,
        },
      });
      paymentIntentId = paymentIntent.id;

      // In mock mode, auto-confirm
      if (process.env.PAYMENTS_MODE === 'mock') {
        await paymentProvider.confirmPayment(paymentIntentId);
      }
    }

    // Create shipping label with Shiplogic

    try {
      // Get product details for shipment
      const productIds = orderItems.map(item => item.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, name: true }
      });

      // Create shipment with Shiplogic
      const shiplogicShipment = await shiplogicService.createShipment({
        orderNumber,
        customerName: shippingAddress ? 
          `${shippingAddress.firstName} ${shippingAddress.lastName}` : 
          user.name || 'Customer',
        customerEmail: user.email,
        customerPhone: shippingAddress?.phone || '',
        deliveryAddress: shippingAddress ? {
          street: shippingAddress.address1,
          city: shippingAddress.city,
          province: shippingAddress.province,
          postalCode: shippingAddress.postalCode,
        } : {
          street: 'To be provided',
          city: 'Cape Town',
          province: 'Western Cape',
          postalCode: '8000',
        },
        items: orderItems.map((item) => {
          const product = products.find(p => p.id === item.productId);
          return {
            description: product?.name || 'Product',
            quantity: item.quantity,
            weight: 1, // kg per item
          };
        }),
        totalValue: total,
      });

      trackingNumber = shiplogicShipment.trackingNumber;
      estimatedDelivery = shiplogicShipment.estimatedDelivery 
        ? new Date(shiplogicShipment.estimatedDelivery) 
        : null;

      console.log('✅ Shiplogic shipment created:', trackingNumber);
    } catch (shiplogicError) {
      console.error('❌ Shiplogic error, using fallback:', shiplogicError);
      
      // Fallback to mock shipping provider
      const shippingProvider = getShippingProvider();
      const shipment = await shippingProvider.createShipment({
        orderId: orderNumber,
        recipientName: shippingAddress ? 
          `${shippingAddress.firstName} ${shippingAddress.lastName}` : 
          user.name || 'Customer',
        recipientPhone: shippingAddress?.phone || '',
        address: shippingAddress ? {
          line1: shippingAddress.address1,
          line2: shippingAddress.address2 || undefined,
          city: shippingAddress.city,
          province: shippingAddress.province,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
        } : {
          line1: 'To be provided',
          city: 'Cape Town',
          province: 'Western Cape',
          postalCode: '8000',
          country: 'South Africa',
        },
        items: orderItems.map((item) => ({
          name: `Product ${item.productId}`,
          quantity: item.quantity,
          value: item.price,
        })),
      });
      
      trackingNumber = shipment.trackingNumber;
      courierService = shipment.service;
      estimatedDelivery = shipment.estimatedDelivery;
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        orderNumber,
        status: 'CONFIRMED',
        subtotal,
        shippingCost,
        tax,
        total,
        paymentStatus: total === 0 || process.env.PAYMENTS_MODE === 'mock' ? 'PAID' : 'PENDING',
        paymentIntentId,
        shippingAddressId: shippingAddress?.id || null,
        trackingNumber,
        courierService,
        estimatedDelivery,
        items: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Claim free drops and decrement stock
    for (const freeDropId of freeDropClaims) {
      await prisma.freeDrop.update({
        where: { id: freeDropId },
        data: {
          claimedByUserId: user.id,
          claimedAt: new Date(),
        },
      });
    }

    // Decrement stock for all items
    for (const item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        trackingNumber: order.trackingNumber,
        paymentStatus: order.paymentStatus,
      },
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to process checkout' }, { status: 500 });
  }
}

