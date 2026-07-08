import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kekamiya Beach Resort | Botolan, Zambales',
  description:
    'Located in Botolan, Zambales, Kekamiya Beach Resort is your ideal getaway to immerse, relax, and recharge. Book your stay today.',
  keywords: ['beach resort', 'Zambales', 'Botolan', 'Philippines', 'swimming pool'],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '1024x1024', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Kekamiya Beach Resort | Botolan, Zambales',
    description: 'Your tropical paradise in Botolan, Zambales.',
    type: 'website',
    images: [{ url: '/images/resort-villas-golden-hour.jpg', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-body bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
