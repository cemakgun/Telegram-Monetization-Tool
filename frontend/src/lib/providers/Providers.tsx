'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from 'react-redux';
import { store } from '../store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </ClerkProvider>
  );
}

// Create a hook to get the typed dispatch
export type AppDispatch = typeof store.dispatch;
