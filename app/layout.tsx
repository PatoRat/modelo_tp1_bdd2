import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Modelo TP1',
  description: 'Base de Datos 2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
