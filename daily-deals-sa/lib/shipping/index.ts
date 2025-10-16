import { MockShippingProvider } from './mock-provider';
import type { ShippingProvider } from './types';

export function getShippingProvider(): ShippingProvider {
  // For now, always use mock. In production, could switch based on env
  return new MockShippingProvider();
}

export * from './types';

