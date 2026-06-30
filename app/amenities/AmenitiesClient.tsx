'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Waves, Utensils, Music, Tent, Fish, Sunset,
  Clock, MapPin, Users, ChevronDown, ChevronUp
} from 'lucide-react'

const categories = ['All', 'Water & Pool', 'Dining', 'Events', 'Outdoor'] as const

const amenities = [
  {
    icon: Waves,
    title: 'Infinity Swimming Pool',
    category: 'Water & Pool',
    desc: 'Our signature infinity pool stretches toward the horizon with the open water as its backdrop. Two connected pools accommodate both adults and children, surrounded by loungers and tropical landscaping.',
    image: '/images/19288.jpg',
    hours: '6:00 AM – 10:00 PM',
    color: 'from-ocean-400 to-ocean-600',
    featured: true,
  },
  {
    icon: Sunset,
    title: 'Private Beach Access',
    category: 'Outdoor',
    desc: 'Direct access to the sandy shores fronting the beach. Spend your days sunbathing, beachcombing, or simply watching the waves roll in.',
    image: '/images/19286.jpg',
    hours: 'Open Daily',
    color: 'from-sand-400 to-sand-600',
    featured: true,
  },
  {
    icon: Utensils,
    title: 'Seafood Restaurant',
    category: 'Dining',
    desc: 'Taste the freshest catch of the day, prepared with the bold flavors of Zambales cuisine. Our open-air dining area overlooks the pool and sea.',
    image: '/images/19287.jpg',
    hours: '7:00 AM – 9:00 PM',
    color: 'from-coral-400 to-coral-600',
    featured: false,
  },
  {
    icon: Tent,
    title: 'Cottages & Cabanas',
    category: 'Outdoor',
    desc: 'Shaded poolside cottages and beachside cabanas give you a private spot to relax, available for day use or as part of your overnight stay.',
    image: '/images/19301.jpg',
    hours: '6:00 AM – 10:00 PM',
    color: 'from-palm-400 to-palm-600',
    featured: false,
  },
  {
    icon: Music,
    title: 'Events & KTV Venue',
    category: 'Events',
    desc: 'Host birthdays, reunions, corporate outings, and celebrations in our dedicated event space, complete with KTV and sound system rental.',
    image: '/images/19295.jpg',
    hours: 'By Reservation',
    color: 'from-purple-400 to-purple-600',
    featured: false,
  },
  {
    icon: Fish,
    title: 'Water Activities',
    category: 'Water & Pool',
    desc: 'Snorkeling gear, kayaks, and beach volleyball sets are available for guests looking to add a little adventure to their stay.',
    image: '/images/19289.jpg',
    hours: '7:00 AM – 6:00 PM',
    color: 'from-cyan-400 to-cyan-600',
    featured: false,
  },
]

const faqs = [
  {
    q: 'Are amenities included in the room rate?',
    a: 'Pool access, beach access, and cottages are included for all overnight guests. Water activity equipment and certain event facilities may carry a separate rental fee.',
  },
  {
    q: 'Can day-trippers use the pool and beach?',
    a: 'Yes! We welcome day-use guests with a separate day-pass rate that includes pool and beach access. Contact us for current day-pass pricing.',
  },
  {
    q: 'Do I need to reserve the KTV/events venue in advance?',
    a: 'Yes, the events venue and KTV room are subject to availability and should be reserved at least one week in advance, especially for weekends.',
  },
  {
    q: 'Is the restaurant open to non-guests?',
    a: 'Our seafood restaurant welcomes both resort guests and outside visitors during operating hours.',
  },
]

export default function AmenitiesClient() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filtered = activeCategory === 'All'
    ? amenities
    : amenities.filter((a) => a.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <div className="relative pt-20 pb-16 bg-gradient-to-br from-ocean-700 to-ocean-900 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image src="/images/19285.jpg" alt="Amenities background" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/60 to-ocean-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          <p className="text-ocean-300 font-semibold text-sm tracking-[0.2em] uppercase mb-3">What We Offer</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Resort Amenities
          </h1>
          <p className="text-ocean-200 text-lg max-w-2xl mx-auto">
            From poolside fun to beachside dining — everything you need for the perfect getaway in Botolan, Zambales.
          </p>
        </div>
      </div>

      {/* Featured */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {amenities.filter((a) => a.featured).map((a) => {
              const Icon = a.icon
              return (
                <div key={a.title} className="group relative rounded-3xl overflow-hidden h-80 cursor-pointer">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{a.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed max-w-md">{a.desc}</p>
                    <div className="flex items-center gap-1.5 text-white/60 text-xs mt-3">
                      <Clock className="w-3.5 h-3.5" />
                      {a.hours}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Filterable grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Explore by Category</p>
            <h2 className="section-title">All <span className="text-gradient-ocean">Facilities</span></h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-200'
                    : 'bg-white text-gray-600 hover:bg-ocean-50 hover:text-ocean-600 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => {
              const Icon = a.icon
              return (
                <div key={a.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-ocean-400 uppercase tracking-wider">{a.category}</span>
                    <h3 className="font-display text-lg font-bold text-gray-900 mt-1 mb-2">{a.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{a.desc}</p>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs pt-3 border-t border-gray-100">
                      <Clock className="w-3.5 h-3.5" />
                      {a.hours}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No amenities found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Quick info strip */}
      <section className="py-12 bg-ocean-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-7 h-7 text-ocean-300" />
              <p className="text-white font-semibold">Open Daily</p>
              <p className="text-ocean-300 text-sm">6:00 AM – 10:00 PM</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-7 h-7 text-ocean-300" />
              <p className="text-white font-semibold">Botolan, Zambales</p>
              <p className="text-ocean-300 text-sm">Botolan, Zambales</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users className="w-7 h-7 text-ocean-300" />
              <p className="text-white font-semibold">Day Use Welcome</p>
              <p className="text-ocean-300 text-sm">No overnight stay required</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Quick Answers</p>
            <h2 className="section-title">Amenity <span className="text-gradient-ocean">FAQs</span></h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-ocean-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 text-sm pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-ocean-500 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-ocean-700 to-ocean-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/19288.jpg" alt="Pool CTA" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Come Experience It Yourself
          </h2>
          <p className="text-ocean-200 text-lg mb-8">
            Book your stay or plan a day visit to enjoy everything Kekamiya has to offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary text-base px-8 py-4">
              Book Your Stay
            </Link>
            <Link href="/contact" className="btn-secondary text-base px-8 py-4">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}