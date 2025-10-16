export interface ShippingQuote {
  service: string;
  cost: number;
  estimatedDays: number;
}

export interface CreateShipmentParams {
  orderId: string;
  recipientName: string;
  recipientPhone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    value: number;
  }>;
}

export interface Shipment {
  trackingNumber: string;
  service: string;
  estimatedDelivery: Date;
  status: 'pending' | 'in_transit' | 'delivered';
}

export interface ShippingProvider {
  getQuote(params: Omit<CreateShipmentParams, 'orderId'>): Promise<ShippingQuote[]>;
  createShipment(params: CreateShipmentParams): Promise<Shipment>;
  trackShipment(trackingNumber: string): Promise<Shipment>;
}

