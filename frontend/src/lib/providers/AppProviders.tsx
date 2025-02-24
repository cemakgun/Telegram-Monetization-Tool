'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from 'react-redux';
import { store } from '../store';
import { StripeProvider } from './StripeProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <StripeProvider>
          {children}
        </StripeProvider>
      </Provider>
    </ClerkProvider>
  );
}

// Create a hook to get the typed dispatch
export type AppDispatch = typeof store.dispatch;
