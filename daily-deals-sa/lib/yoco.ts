import axios from 'axios';

interface YocoCheckoutRequest {
  amount: number; // Amount in cents
  currency: string; // ZAR
  cancelUrl?: string;
  successUrl?: string;
  failureUrl?: string;
  metadata?: Record<string, any>;
  totalDiscount?: number;
  totalTaxAmount?: number;
  subtotalAmount?: number;
  lineItems?: Array<{
    displayName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  clientReferenceId?: string;
}

interface YocoCheckoutResponse {
  id: string;
  status: 'created' | 'started' | 'processing' | 'completed';
  amount: number;
  currency: string;
  redirectUrl: string;
  paymentId: string | null;
  successUrl: string | null;
  cancelUrl: string | null;
  failureUrl: string | null;
  metadata: Record<string, any> | null;
  merchantId: string;
  totalDiscount: number | null;
  totalTaxAmount: number | null;
  subtotalAmount: number | null;
  lineItems: any[] | null;
  externalId: string | null;
  processingMode: 'live' | 'test';
  clientReferenceId: string | null;
}

export class YocoService {
  private apiEndpoint: string;
  private secretKey: string;

  constructor() {
    this.apiEndpoint = 'https://payments.yoco.com/api/checkouts';
    this.secretKey = process.env.YOCO_SECRET_KEY || '';
    
    if (!this.secretKey) {
      console.warn('⚠️ YOCO_SECRET_KEY not set. Yoco payments will not work.');
    }
  }

  async createCheckout(request: YocoCheckoutRequest): Promise<YocoCheckoutResponse> {
    try {
      console.log('🔗 Creating Yoco checkout...');
      console.log('Request:', JSON.stringify(request, null, 2));

      const response = await axios.post(this.apiEndpoint, request, {
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Yoco checkout created successfully');
      console.log('Response:', JSON.stringify(response.data, null, 2));

      return response.data;
    } catch (error: any) {
      console.error('❌ Error creating Yoco checkout:', error.response?.data || error.message);
      throw new Error(`Failed to create Yoco checkout: ${error.response?.data?.message || error.message}`);
    }
  }

  // Helper method to create checkout request for our e-commerce store
  createCheckoutRequest(
    orderId: string,
    amount: number,
    description: string,
    baseUrl: string,
    lineItems?: Array<{
      displayName: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }>
  ): YocoCheckoutRequest {
    return {
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'ZAR',
      cancelUrl: `${baseUrl}/checkout/cancel`,
      successUrl: `${baseUrl}/checkout/success`,
      failureUrl: `${baseUrl}/checkout/failure`,
      metadata: {
        orderId,
        description,
      },
      clientReferenceId: orderId,
      lineItems: lineItems || undefined,
    };
  }
}

export const yocoService = new YocoService();
