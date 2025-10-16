import type { PaymentProvider, CreatePaymentIntentParams, PaymentIntent } from './types';

export class MockPaymentProvider implements PaymentProvider {
  async createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntent> {
    // Mock: always create a successful payment intent
    const paymentIntent: PaymentIntent = {
      id: `mock_pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: params.amount,
      currency: params.currency || 'ZAR',
      status: 'pending',
      metadata: params.metadata,
    };
    
    return paymentIntent;
  }

  async confirmPayment(paymentIntentId: string): Promise<PaymentIntent> {
    // Mock: always confirm successfully
    return {
      id: paymentIntentId,
      amount: 0,
      currency: 'ZAR',
      status: 'succeeded',
    };
  }

  async cancelPayment(paymentIntentId: string): Promise<void> {
    // Mock: do nothing
    return;
  }
}

