import axios from 'axios';
import type { PaymentProvider, CreatePaymentIntentParams, PaymentIntent } from './types';

export class IkhokhaPaymentProvider implements PaymentProvider {
  private apiUrl: string;
  private appId: string;
  private appSecret: string;

  constructor() {
    this.apiUrl = process.env.IKHOKHA_API_URL || 'https://api.ikhokha.com';
    this.appId = process.env.IKHOKHA_APP_ID || '';
    this.appSecret = process.env.IKHOKHA_APP_SECRET || '';

    if (!this.appId || !this.appSecret) {
      console.warn('iKhokha credentials not configured. Payment processing may fail.');
    }
  }

  async createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntent> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/v1/payments/create`,
        {
          amount: params.amount,
          currency: params.currency || 'ZAR',
          metadata: params.metadata,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-App-Id': this.appId,
            'X-App-Secret': this.appSecret,
          },
        }
      );

      return {
        id: response.data.id,
        amount: response.data.amount,
        currency: response.data.currency,
        status: response.data.status,
        metadata: response.data.metadata,
      };
    } catch (error) {
      console.error('iKhokha payment creation failed:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<PaymentIntent> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/v1/payments/${paymentIntentId}/confirm`,
        {},
        {
          headers: {
            'X-App-Id': this.appId,
            'X-App-Secret': this.appSecret,
          },
        }
      );

      return {
        id: response.data.id,
        amount: response.data.amount,
        currency: response.data.currency,
        status: response.data.status,
      };
    } catch (error) {
      console.error('iKhokha payment confirmation failed:', error);
      throw new Error('Failed to confirm payment');
    }
  }

  async cancelPayment(paymentIntentId: string): Promise<void> {
    try {
      await axios.post(
        `${this.apiUrl}/v1/payments/${paymentIntentId}/cancel`,
        {},
        {
          headers: {
            'X-App-Id': this.appId,
            'X-App-Secret': this.appSecret,
          },
        }
      );
    } catch (error) {
      console.error('iKhokha payment cancellation failed:', error);
      throw new Error('Failed to cancel payment');
    }
  }
}

