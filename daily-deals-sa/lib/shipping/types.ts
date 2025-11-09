export interface ShippingAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country?: string;
}

export interface ShipmentItem {
  description: string;
  quantity: number;
  weight?: number;
  value?: number;
}

export interface CreateShipmentParams {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address: ShippingAddress;
  items: ShipmentItem[];
  totalValue: number;
}

export interface ShippingQuote {
  service: string;
  cost: number;
  estimatedDays: number;
  currency?: string;
}

export type ShipmentStatus = 'pending' | 'in_transit' | 'delivered' | 'cancelled';

export interface Shipment {
  trackingNumber: string;
  service: string;
  estimatedDelivery: Date;
  status: ShipmentStatus;
}

export interface ShippingProvider {
  getQuote(params: Omit<CreateShipmentParams, 'orderId'>): Promise<ShippingQuote[]>;
  createShipment(params: CreateShipmentParams): Promise<Shipment>;
  trackShipment(trackingNumber: string): Promise<Shipment>;
}


