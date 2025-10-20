# 📦 Shiplogic API Integration Guide

## Overview

[Shiplogic](https://www.shiplogic.com/api-docs) is a comprehensive courier management platform that provides an API for creating shipments, tracking deliveries, and managing courier operations. This guide shows you how to integrate Shiplogic with your Daily Deals SA e-commerce platform.

---

## What is Shiplogic?

Shiplogic is a **streamlined software for courier companies** that provides:
- ✅ Shipment creation and management
- ✅ Real-time tracking
- ✅ Driver assignment
- ✅ Digital proof of delivery
- ✅ Customer notifications
- ✅ Address geocoding
- ✅ Interhub tracking

---

## Key Features for Your E-commerce Platform

### 1. **Shipment Management**
- Create shipments automatically after order placement
- Track shipments in real-time
- Update delivery status

### 2. **Digital Proof of Delivery**
- Secure One-Time Pins (OTPs)
- Recipient information capture
- Delivery confirmation

### 3. **Real-Time Notifications**
- Send updates to customers at every stage
- Customizable notification templates
- WhatsApp/SMS/Email notifications

### 4. **Address Geocoding**
- Accurate delivery locations
- Route optimization
- Zone-based driver assignment

---

## Getting Started

### Step 1: Download API Documentation

1. Visit [Shiplogic API Docs](https://www.shiplogic.com/api-docs)
2. Download the **Postman Collection**
3. Import into Postman to test endpoints

### Step 2: Get API Credentials

Contact Shiplogic support to get your API credentials:
- **Email**: support@shiplogic.com
- **WhatsApp**: Available on their website
- **Location**: Colab, 194 Bancor Avenue, Menlyn Maine, Pretoria

You'll receive:
- API Key (Bearer Token)
- Client ID
- Environment URL

---

## Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Daily Deals SA                            │
│                                                              │
│  User Places Order                                          │
│       ↓                                                      │
│  Order Created in Database                                  │
│       ↓                                                      │
│  Payment Processed (Yoco)                                   │
│       ↓                                                      │
│  Call Shiplogic API                                         │
│  • Create Shipment                                          │
│  • Get Tracking Number                                      │
│       ↓                                                      │
│  Update Order with Tracking Number                          │
│       ↓                                                      │
│  Send Confirmation Email to Customer                        │
│       ↓                                                      │
│  Shiplogic Handles Delivery                                 │
│  • Driver Assignment                                        │
│  • Real-Time Tracking                                       │
│  • Proof of Delivery                                        │
│       ↓                                                      │
│  Customer Receives Order                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation

### 1. Create Shiplogic Service

Create a new file: `lib/shiplogic.ts`

```typescript
// lib/shiplogic.ts
export class ShiplogicService {
  private apiKey: string;
  private apiUrl: string;
  private clientId: string;

  constructor() {
    this.apiKey = process.env.SHIPLOGIC_API_KEY || '';
    this.apiUrl = process.env.SHIPLOGIC_API_URL || 'https://api.shiplogic.com';
    this.clientId = process.env.SHIPLOGIC_CLIENT_ID || '';

    if (!this.apiKey || !this.clientId) {
      console.warn('Shiplogic credentials not configured');
    }
  }

  /**
   * Create a new shipment
   */
  async createShipment(orderData: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
    };
    items: Array<{
      description: string;
      quantity: number;
      weight: number;
    }>;
    totalValue: number;
  }) {
    try {
      const response = await fetch(`${this.apiUrl}/v1/shipments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Client-ID': this.clientId,
        },
        body: JSON.stringify({
          reference: orderData.orderNumber,
          recipient: {
            name: orderData.customerName,
            email: orderData.customerEmail,
            phone: orderData.customerPhone,
          },
          deliveryAddress: {
            street: orderData.deliveryAddress.street,
            city: orderData.deliveryAddress.city,
            province: orderData.deliveryAddress.province,
            postalCode: orderData.deliveryAddress.postalCode,
            country: 'South Africa',
          },
          items: orderData.items,
          totalValue: orderData.totalValue,
          currency: 'ZAR',
          serviceType: 'standard', // or 'express', 'overnight'
          requireSignature: true,
          requireOTP: true,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create shipment');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Shiplogic shipment creation error:', error);
      throw error;
    }
  }

  /**
   * Get shipment tracking information
   */
  async getTrackingInfo(trackingNumber: string) {
    try {
      const response = await fetch(`${this.apiUrl}/v1/shipments/${trackingNumber}/tracking`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Client-ID': this.clientId,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tracking info');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Shiplogic tracking error:', error);
      throw error;
    }
  }

  /**
   * Update shipment status
   */
  async updateShipmentStatus(trackingNumber: string, status: string, notes?: string) {
    try {
      const response = await fetch(`${this.apiUrl}/v1/shipments/${trackingNumber}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Client-ID': this.clientId,
        },
        body: JSON.stringify({
          status,
          notes,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update shipment status');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Shiplogic status update error:', error);
      throw error;
    }
  }

  /**
   * Cancel a shipment
   */
  async cancelShipment(trackingNumber: string, reason: string) {
    try {
      const response = await fetch(`${this.apiUrl}/v1/shipments/${trackingNumber}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Client-ID': this.clientId,
        },
        body: JSON.stringify({
          reason,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel shipment');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Shiplogic cancellation error:', error);
      throw error;
    }
  }

  /**
   * Get delivery zones and rates
   */
  async getDeliveryRates(deliveryAddress: {
    city: string;
    province: string;
    postalCode: string;
  }) {
    try {
      const response = await fetch(`${this.apiUrl}/v1/rates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Client-ID': this.clientId,
        },
        body: JSON.stringify({
          destination: {
            city: deliveryAddress.city,
            province: deliveryAddress.province,
            postalCode: deliveryAddress.postalCode,
          },
          weight: 1, // kg
          dimensions: {
            length: 10, // cm
            width: 10,
            height: 10,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get delivery rates');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Shiplogic rates error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const shiplogicService = new ShiplogicService();
```

---

### 2. Update Environment Variables

Add to `.env.local`:

```env
# Shiplogic API
SHIPLOGIC_API_KEY=your_api_key_here
SHIPLOGIC_API_URL=https://api.shiplogic.com
SHIPLOGIC_CLIENT_ID=your_client_id_here
```

---

### 3. Update Checkout Process

Modify `app/api/checkout/create-payment/route.ts`:

```typescript
import { shiplogicService } from "@/lib/shiplogic";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, total, userId, shippingInfo } = await request.json();

    // Create order in database
    const order = await db.order.create({
      data: {
        userId,
        orderNumber: `DD-${Date.now()}`,
        status: "PENDING",
        total,
        paymentStatus: "PENDING",
        shippingAddress: {
          create: {
            firstName: shippingInfo.firstName,
            lastName: shippingInfo.lastName,
            address1: shippingInfo.address,
            city: shippingInfo.city,
            province: shippingInfo.province,
            postalCode: shippingInfo.postalCode,
            phone: shippingInfo.phone,
          },
        },
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // Create shipment with Shiplogic
    try {
      const shipment = await shiplogicService.createShipment({
        orderNumber: order.orderNumber,
        customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        customerEmail: session.user.email,
        customerPhone: shippingInfo.phone,
        deliveryAddress: {
          street: shippingInfo.address,
          city: shippingInfo.city,
          province: shippingInfo.province,
          postalCode: shippingInfo.postalCode,
        },
        items: items.map((item: any) => ({
          description: item.name,
          quantity: item.quantity,
          weight: 1, // kg per item
        })),
        totalValue: total,
      });

      // Update order with tracking number
      await db.order.update({
        where: { id: order.id },
        data: {
          trackingNumber: shipment.trackingNumber,
          trackingUrl: shipment.trackingUrl,
        },
      });

      console.log('✅ Shiplogic shipment created:', shipment.trackingNumber);
    } catch (shipmentError) {
      console.error('❌ Failed to create Shiplogic shipment:', shipmentError);
      // Continue with order creation even if shipment fails
      // You can retry later or use fallback courier
    }

    // Create payment with Yoco
    const checkout = await yocoService.createCheckout(
      order.id,
      total,
      `Daily Deals SA - Order #${order.orderNumber}`,
      baseUrl,
      lineItems
    );

    return NextResponse.json({
      paylinkUrl: checkout.redirectUrl,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

### 4. Create Webhook Handler

Create `app/api/webhooks/shiplogic/route.ts`:

```typescript
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
        console.log('Shipment created:', data.trackingNumber);
        break;

      case 'shipment.picked_up':
        // Shipment picked up by courier
        await db.order.update({
          where: { trackingNumber: data.trackingNumber },
          data: { status: 'PROCESSING' },
        });
        console.log('Shipment picked up:', data.trackingNumber);
        break;

      case 'shipment.in_transit':
        // Shipment in transit
        await db.order.update({
          where: { trackingNumber: data.trackingNumber },
          data: { status: 'SHIPPED' },
        });
        console.log('Shipment in transit:', data.trackingNumber);
        break;

      case 'shipment.out_for_delivery':
        // Out for delivery
        await db.order.update({
          where: { trackingNumber: data.trackingNumber },
          data: { status: 'OUT_FOR_DELIVERY' },
        });
        console.log('Out for delivery:', data.trackingNumber);
        break;

      case 'shipment.delivered':
        // Delivered
        await db.order.update({
          where: { trackingNumber: data.trackingNumber },
          data: {
            status: 'COMPLETED',
            deliveredAt: new Date(data.deliveredAt),
          },
        });
        console.log('Delivered:', data.trackingNumber);
        break;

      case 'shipment.failed':
        // Delivery failed
        await db.order.update({
          where: { trackingNumber: data.trackingNumber },
          data: { status: 'FAILED' },
        });
        console.log('Delivery failed:', data.trackingNumber);
        break;

      default:
        console.log('Unknown event:', event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
```

---

### 5. Update Order Tracking Page

Create `app/orders/[id]/page.tsx`:

```typescript
'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, MapPin, CheckCircle } from 'lucide-react';

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.id;
  const [order, setOrder] = useState(null);
  const [tracking, setTracking] = useState(null);

  useEffect(() => {
    fetchOrder();
    fetchTracking();
  }, [orderId]);

  const fetchOrder = async () => {
    const response = await fetch(`/api/orders/${orderId}`);
    const data = await response.json();
    setOrder(data.order);
  };

  const fetchTracking = async () => {
    if (!order?.trackingNumber) return;
    
    const response = await fetch(`/api/tracking/${order.trackingNumber}`);
    const data = await response.json();
    setTracking(data.tracking);
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Order Tracking</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Order Number:</strong> {order.orderNumber}</p>
            <p><strong>Status:</strong> 
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </p>
            <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
            <p><strong>Total:</strong> R{order.total.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
          </CardHeader>
          <CardContent>
            <MapPin className="h-5 w-5 mb-2" />
            <p>{order.shippingAddress.address1}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.province}</p>
            <p>{order.shippingAddress.postalCode}</p>
          </CardContent>
        </Card>
      </div>

      {tracking && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Tracking History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tracking.events.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    {getEventIcon(event.status)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                    {event.location && (
                      <p className="text-sm text-muted-foreground">
                        📍 {event.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'COMPLETED': return 'bg-green-500';
    case 'SHIPPED': return 'bg-blue-500';
    case 'PROCESSING': return 'bg-yellow-500';
    case 'FAILED': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
}

function getEventIcon(status: string) {
  switch (status) {
    case 'delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'in_transit': return <Truck className="h-5 w-5 text-blue-500" />;
    default: return <Package className="h-5 w-5 text-gray-500" />;
  }
}
```

---

## Testing the Integration

### 1. Test Shipment Creation

```typescript
// Test script
import { shiplogicService } from '@/lib/shiplogic';

async function testShiplogic() {
  try {
    const shipment = await shiplogicService.createShipment({
      orderNumber: 'DD-123456',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+27 12 345 6789',
      deliveryAddress: {
        street: '123 Main Street',
        city: 'Cape Town',
        province: 'Western Cape',
        postalCode: '8001',
      },
      items: [
        { description: 'Wireless Earbuds', quantity: 1, weight: 0.5 },
      ],
      totalValue: 799,
    });

    console.log('✅ Shipment created:', shipment);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}
```

---

## Benefits of Shiplogic Integration

### For Your Business:
1. **Automated Shipment Creation** - No manual data entry
2. **Real-Time Tracking** - Customers can track orders
3. **Professional Delivery** - Digital proof of delivery
4. **Reduced Errors** - Automated address geocoding
5. **Better Customer Service** - Real-time notifications

### For Your Customers:
1. **Order Tracking** - Know where their order is
2. **Delivery Updates** - SMS/Email/WhatsApp notifications
3. **Secure Delivery** - OTP verification
4. **Transparency** - See delivery progress
5. **Peace of Mind** - Digital proof of delivery

---

## Support and Resources

### Shiplogic Support:
- **Email**: support@shiplogic.com
- **WhatsApp**: Available on their website
- **Address**: Colab, 194 Bancor Avenue, Park Lane West Building, Menlyn Maine, Pretoria

### Documentation:
- **API Docs**: [https://www.shiplogic.com/api-docs](https://www.shiplogic.com/api-docs)
- **Tech Docs**: [https://www.shiplogic.com/tech](https://www.shiplogic.com/tech)
- **Database**: [https://www.shiplogic.com/tech/database](https://www.shiplogic.com/tech/database)

---

## Next Steps

1. ✅ Contact Shiplogic for API credentials
2. ✅ Download Postman collection
3. ✅ Test API endpoints
4. ✅ Implement Shiplogic service
5. ✅ Update checkout process
6. ✅ Set up webhook handler
7. ✅ Test end-to-end flow
8. ✅ Deploy to production

---

## Summary

Shiplogic provides a powerful API for managing courier operations. By integrating it with your Daily Deals SA platform, you can:

- Automate shipment creation
- Provide real-time tracking
- Send delivery notifications
- Capture digital proof of delivery
- Improve customer experience

The integration is straightforward and follows standard REST API patterns. Start by getting your API credentials from Shiplogic support, then follow this guide to implement the integration step by step.

**Happy shipping! 📦🚚**

