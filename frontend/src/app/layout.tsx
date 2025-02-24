/**
 * Root Layout Component
 * This component wraps the entire application layout
 * and provides global styles and context providers
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

// Load Google font
const inter = Inter({ subsets: ['latin'] })

/**
 * Metadata for the application
 * Sets the title and description for the page
 */
export const metadata: Metadata = {
  title: 'Telegram Monetization Tool',
  description: 'A full-stack Telegram monetization SaaS platform',
}

/**
 * Root Layout Function
 * Wraps the application in the ClerkProvider for authentication
 * and applies global styles
 * 
 * @param children - The child components to be rendered within the layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
