// lib/shiplogic.ts
export class ShiplogicService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.SHIPLOGIC_API_KEY || '96f1b69f4a8646be8eb897218574437a';
    this.apiUrl = process.env.SHIPLOGIC_API_URL || 'https://api.shiplogic.com';

    if (!this.apiKey) {
      console.warn('Shiplogic API key not configured');
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
      console.log('📦 Creating Shiplogic shipment for order:', orderData.orderNumber);

      const response = await fetch(`${this.apiUrl}/v1/shipments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
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
          serviceType: 'standard',
          requireSignature: true,
          requireOTP: true,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Shiplogic API error:', error);
        throw new Error(error.message || 'Failed to create shipment');
      }

      const data = await response.json();
      console.log('✅ Shiplogic shipment created:', data.trackingNumber);
      
      return data;
    } catch (error) {
      console.error('❌ Shiplogic shipment creation error:', error);
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
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tracking info');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Shiplogic tracking error:', error);
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
      console.error('❌ Shiplogic status update error:', error);
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
      console.error('❌ Shiplogic cancellation error:', error);
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
      console.error('❌ Shiplogic rates error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const shiplogicService = new ShiplogicService();

