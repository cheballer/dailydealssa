export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  metadata?: Record<string, any>;
}

export interface CreatePaymentIntentParams {
  amount: number;
  currency?: string;
  metadata?: Record<string, any>;
}

export interface PaymentProvider {
  createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntent>;
  confirmPayment(paymentIntentId: string): Promise<PaymentIntent>;
  cancelPayment(paymentIntentId: string): Promise<void>;
}

