import type { Metadata } from 'next'
import { Suspense } from 'react'
import BookClient from './BookClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Book Your Stay | Kekamiya Beach Resort',
  description: 'Reserve your villa at Kekamiya Beach Resort in Botolan, Zambales. Pick your dates, guests, and room type to get started.',
}

function BookingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse text-gray-400 text-sm">Loading booking page…</div>
    </div>
  )
}

export default function BookPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Suspense fallback={<BookingFallback />}>
        <BookClient />
      </Suspense>
      <Footer />
    </main>
  )
}
