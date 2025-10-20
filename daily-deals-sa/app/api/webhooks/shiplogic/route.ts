import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const signature = headersList.get("x-shiplogic-signature");

    // Verify webhook signature (implement based on Shiplogic docs)
    // if (!verifySignature(signature, body)) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    const body = await request.json();
    const { event, data } = body;

    console.log('📦 Shiplogic webhook received:', event);

    switch (event) {
      case 'shipment.created':
        // Shipment created successfully
        console.log('✅ Shipment created:', data.trackingNumber);
        break;

      case 'shipment.picked_up':
        // Shipment picked up by courier
        await db.order.updateMany({
          where: { trackingNumber: data.trackingNumber },
          data: { status: 'PROCESSING' },
        });
        console.log('📦 Shipment picked up:', data.trackingNumber);
        break;

      case 'shipment.in_transit':
        // Shipment in transit
        await db.order.updateMany({
          where: { trackingNumber: data.trackingNumber },
          data: { status: 'SHIPPED' },
        });
        console.log('🚚 Shipment in transit:', data.trackingNumber);
        break;

      case 'shipment.out_for_delivery':
        // Out for delivery
        await db.order.updateMany({
          where: { trackingNumber: data.trackingNumber },
          data: { status: 'OUT_FOR_DELIVERY' },
        });
        console.log('🚗 Out for delivery:', data.trackingNumber);
        break;

      case 'shipment.delivered':
        // Delivered
        await db.order.updateMany({
          where: { trackingNumber: data.trackingNumber },
          data: {
            status: 'COMPLETED',
            deliveredAt: new Date(data.deliveredAt),
          },
        });
        console.log('✅ Delivered:', data.trackingNumber);
        break;

      case 'shipment.failed':
        // Delivery failed
        await db.order.updateMany({
          where: { trackingNumber: data.trackingNumber },
          data: { status: 'FAILED' },
        });
        console.log('❌ Delivery failed:', data.trackingNumber);
        break;

      default:
        console.log('ℹ️ Unknown event:', event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

