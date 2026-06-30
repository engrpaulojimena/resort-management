'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Users, BedDouble, ArrowRight } from 'lucide-react'

const rooms = [
  {
    image: '/images/resort-villas-golden-hour.jpg',
    name: 'A-Frame Loft · Ground Floor',
    capacity: '2–3 Guests',
    beds: '1 Queen Bed',
    price: 3500,
    tag: 'Most Popular',
    tagColor: 'bg-ocean-500',
    features: ['Pool View', 'Air Conditioning', 'Mini Bar'],
  },
  {
    image: '/images/resort-villas-night.jpg',
    name: 'A-Frame Loft · Upper Deck',
    capacity: '2 Guests',
    beds: '1 Double Bed',
    price: 3000,
    tag: 'Romantic Escape',
    tagColor: 'bg-coral-500',
    features: ['Loft Bedroom', 'Pool & Tree View', 'Air Conditioning'],
  },
  {
    image: '/images/resort-villas-daytime.jpg',
    name: 'Poolside Villa Package',
    capacity: '4–8 Guests',
    beds: 'Multiple Rooms',
    price: 6500,
    tag: 'Perfect for Groups',
    tagColor: 'bg-palm-500',
    features: ['Pool Access', 'Deck Seating', 'Beach View'],
  },
]

export default function AccommodationsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">Where You'll Stay</p>
            <h2 className="section-title">
              Iconic A-Frame Villas,{' '}
              <span className="text-gradient-ocean">Unforgettable Views</span>
            </h2>
          </div>
          <Link href="/accommodations" className="btn-outline whitespace-nowrap self-start md:self-auto">
            See All Rooms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Room cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="group rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              {/* Room photo */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className={`absolute top-4 left-4 ${room.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full z-10`}>
                  {room.tag}
                </span>
              </div>

              {/* Room details */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-1">{room.name}</h3>

                <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {room.capacity}
                  </span>
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5" /> {room.beds}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {room.features.map((f) => (
                    <span key={f} className="bg-ocean-50 text-ocean-600 text-xs font-medium px-3 py-1 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400">Starting at</span>
                    <div className="font-display text-2xl font-bold text-ocean-600">
                      ₱{room.price.toLocaleString()}
                      <span className="text-sm font-normal text-gray-400">/night</span>
                    </div>
                  </div>
                  <Link
                    href={`/book?room=${encodeURIComponent(room.name)}`}
                    className="btn-primary text-sm px-5 py-2.5"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
