'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { StoreProvider } from '@/lib/providers/StoreProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <StoreProvider>
        {children}
      </StoreProvider>
    </ClerkProvider>
  );
}
