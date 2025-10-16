import { PAYMENT_MODE } from '../constants';
import { MockPaymentProvider } from './mock-provider';
import { IkhokhaPaymentProvider } from './ikhokha-provider';
import type { PaymentProvider } from './types';

export function getPaymentProvider(): PaymentProvider {
  if (PAYMENT_MODE === 'mock') {
    return new MockPaymentProvider();
  }
  return new IkhokhaPaymentProvider();
}

export * from './types';

