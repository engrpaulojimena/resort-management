'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  CalendarDays,
  Users,
  BedDouble,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronDown,
} from 'lucide-react'

const rooms = [
  {
    id: 'ground',
    name: 'A-Frame Villa · Ground Floor',
    image: '/images/resort-villas-daytime.jpg',
    capacity: 3,
    capacityLabel: '2–3 Guests',
    price: 3500,
  },
  {
    id: 'loft',
    name: 'A-Frame Villa · Upper Loft',
    image: '/images/19287.jpg',
    capacity: 2,
    capacityLabel: '2 Guests',
    price: 3000,
  },
  {
    id: 'poolside',
    name: 'Poolside Villa Package',
    image: '/images/resort-villas-night.jpg',
    capacity: 8,
    capacityLabel: '4–8 Guests',
    price: 6500,
  },
]

const perks = [
  { icon: Sparkles, label: 'Infinity pool & beach access' },
  { icon: ShieldCheck, label: 'Free cancellation up to 48 hrs before check-in' },
  { icon: Clock, label: 'Check-in 2:00 PM · Check-out 12:00 PM' },
]

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

export default function BookClient() {
  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomId: 'ground',
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const selectedRoom = rooms.find((r) => r.id === form.roomId) ?? rooms[0]

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0
    const inDate = new Date(form.checkIn)
    const outDate = new Date(form.checkOut)
    const diff = Math.round((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }, [form.checkIn, form.checkOut])

  const estimatedTotal = nights * selectedRoom.price

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'guests' ? Number(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.checkIn || !form.checkOut || !form.name || !form.email) return
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setConfirmationCode(data.confirmationCode)
      setStatus('sent')

      // Redirect to booking confirmation page with all details
      const params = new URLSearchParams({
        code: data.confirmationCode,
        id: String(data.reservationId),
        name: form.name,
        email: form.email,
        phone: form.phone || '',
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: String(form.guests),
        roomId: form.roomId,
        notes: form.notes || '',
      })
      router.push(`/booking-confirmation?${params.toString()}`)
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 pt-24 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-palm-500/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-9 h-9 text-palm-500" />
          </div>
          <h1 className="font-display text-2xl font-bold text-ocean-900 mb-2">Request Sent!</h1>
          <p className="text-gray-600 mb-4">
            Thank you, {form.name.split(' ')[0] || 'guest'}! We&apos;ve received your booking request for{' '}
            <span className="font-semibold text-ocean-700">{selectedRoom.name}</span>
            {nights > 0 && (
              <> ({nights} night{nights > 1 ? 's' : ''})</>
            )}. Our team will confirm within 24 hours.
          </p>
          {confirmationCode && (
            <div className="bg-ocean-50 border border-ocean-200 rounded-xl px-6 py-4 mb-6">
              <p className="text-xs font-bold text-ocean-500 uppercase tracking-widest mb-1">Confirmation Code</p>
              <p className="font-display text-3xl font-bold text-ocean-900 tracking-widest">{confirmationCode}</p>
              <p className="text-xs text-gray-500 mt-1">A copy was sent to {form.email}</p>
            </div>
          )}
          <a href="/" className="btn-primary justify-center w-full">
            Back to Home
          </a>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero band */}
      <div className="relative pt-20 pb-16 bg-gradient-to-br from-ocean-700 to-ocean-900 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image src="/images/19289.jpg" alt="Booking background" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/60 to-ocean-900/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          <p className="section-label justify-center text-sand-300 mb-3">Reserve Your Getaway</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Book Your Stay
          </h1>
          <p className="text-ocean-200 text-lg max-w-xl mx-auto">
            Pick your dates, choose your villa, and let us take care of the rest.
          </p>
        </div>
      </div>

      {/* Main content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-10">

            {/* Left — Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col gap-7">

              {/* Dates */}
              <div>
                <p className="section-label mb-4">Your Dates</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-gray-700">Check-in</span>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-400" />
                      <input
                        type="date"
                        name="checkIn"
                        required
                        min={todayStr()}
                        value={form.checkIn}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-200 focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 outline-none transition-all text-sm text-gray-800"
                      />
                    </div>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-gray-700">Check-out</span>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-400" />
                      <input
                        type="date"
                        name="checkOut"
                        required
                        min={form.checkIn || todayStr()}
                        value={form.checkOut}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-200 focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 outline-none transition-all text-sm text-gray-800"
                      />
                    </div>
                  </label>
                </div>
                {nights > 0 && (
                  <p className="text-xs font-medium text-sand-600 mt-2">
                    {nights} night{nights > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>

              {/* Guests & Room */}
              <div>
                <p className="section-label mb-4">Guests &amp; Villa</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-gray-700">Guests</span>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-400" />
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="w-full pl-9 pr-9 py-3 rounded-xl border border-gray-200 focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 outline-none transition-all text-sm text-gray-800 appearance-none bg-white"
                      >
                        {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} Guest{n > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-gray-700">Room Type</span>
                    <div className="relative">
                      <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-400" />
                      <select
                        name="roomId"
                        value={form.roomId}
                        onChange={handleChange}
                        className="w-full pl-9 pr-9 py-3 rounded-xl border border-gray-200 focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 outline-none transition-all text-sm text-gray-800 appearance-none bg-white"
                      >
                        {rooms.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </label>
                </div>
              </div>

              {/* Contact details */}
              <div>
                <p className="section-label mb-4">Your Details</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="text-sm font-semibold text-gray-700">Full Name</span>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Juan Dela Cruz"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 outline-none transition-all text-sm text-gray-800"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-gray-700">Email</span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="juan@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 outline-none transition-all text-sm text-gray-800"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-gray-700">Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="09XX XXX XXXX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 outline-none transition-all text-sm text-gray-800"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="text-sm font-semibold text-gray-700">Special Requests (optional)</span>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Celebrating an occasion? Need extra beddings? Let us know."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 outline-none transition-all text-sm text-gray-800 resize-none"
                    />
                  </label>
                </div>
              </div>

              {status === 'error' && errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary justify-center w-full text-base py-4 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === 'sending' ? 'Sending Request…' : 'Request Booking'}
              </button>
              <p className="text-xs text-gray-400 -mt-3 text-center">
                This sends a request only — we&apos;ll confirm availability and final pricing by email or phone.
                By booking, you agree to our{' '}
                <a href="/policies" target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:underline font-medium">
                  Policies &amp; Booking Terms
                </a>.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5 -mt-2">
                <span className="text-amber-500 text-base leading-none mt-0.5">⏳</span>
                <p className="text-xs text-amber-700">
                  <strong>Important:</strong> After submitting, you&apos;ll have <strong>30 minutes</strong> to pay your deposit. Bookings with no payment submitted within this window will be automatically cancelled. You can always{' '}
                  <a href="/my-booking" className="underline font-medium text-amber-800">find your booking</a>{' '}
                  using your confirmation code if you need to return to the payment page.
                </p>
              </div>
            </div>

            {/* Right — Summary */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-44">
                  <Image src={selectedRoom.image} alt={selectedRoom.name} fill className="object-cover" sizes="400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-white font-display font-bold text-lg leading-tight drop-shadow">
                      {selectedRoom.name}
                    </p>
                    <p className="text-white/80 text-xs flex items-center gap-1">
                      <Users className="w-3 h-3" /> {selectedRoom.capacityLabel}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Rate per night</span>
                    <span className="font-semibold text-ocean-900">₱{selectedRoom.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Nights</span>
                    <span className="font-semibold text-ocean-900">{nights || '—'}</span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Estimated Total</span>
                    <span className="font-display font-bold text-xl text-sand-600">
                      {estimatedTotal > 0 ? `₱${estimatedTotal.toLocaleString()}` : '—'}
                    </span>
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div className="flex flex-col gap-3">
                    {perks.map((perk) => (
                      <div key={perk.label} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <perk.icon className="w-4 h-4 text-palm-500 mt-0.5 shrink-0" />
                        <span>{perk.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}