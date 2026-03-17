import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'xFactor + Tatiana March Madness',
  description: 'AI-powered March Madness bracket predictions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
