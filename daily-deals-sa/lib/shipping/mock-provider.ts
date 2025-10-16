import type { ShippingProvider, ShippingQuote, CreateShipmentParams, Shipment } from './types';

export class MockShippingProvider implements ShippingProvider {
  async getQuote(params: Omit<CreateShipmentParams, 'orderId'>): Promise<ShippingQuote[]> {
    // Mock quotes
    return [
      { service: 'Standard', cost: 65, estimatedDays: 5 },
      { service: 'Express', cost: 120, estimatedDays: 2 },
      { service: 'Overnight', cost: 200, estimatedDays: 1 },
    ];
  }

  async createShipment(params: CreateShipmentParams): Promise<Shipment> {
    // Generate mock tracking number
    const year = new Date().getFullYear();
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    const trackingNumber = `TG-${year}-${randomId}`;

    // Mock estimated delivery (3-5 days from now)
    const estimatedDays = 3 + Math.floor(Math.random() * 3);
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + estimatedDays);

    return {
      trackingNumber,
      service: 'Standard',
      estimatedDelivery,
      status: 'pending',
    };
  }

  async trackShipment(trackingNumber: string): Promise<Shipment> {
    // Mock tracking info
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

    return {
      trackingNumber,
      service: 'Standard',
      estimatedDelivery,
      status: 'in_transit',
    };
  }
}

