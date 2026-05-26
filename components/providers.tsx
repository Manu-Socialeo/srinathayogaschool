'use client'

import { ReactNode } from 'react'
import { CartProvider } from '@/components/cart/cart-context'
import { AuthProvider } from '@/components/auth-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  )
}
