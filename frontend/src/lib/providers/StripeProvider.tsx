'use client';

import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../stripe';

export function StripeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}
