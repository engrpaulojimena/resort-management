'use client'

import Image from 'next/image'
import { Anchor, Sun, Shell } from 'lucide-react'

const highlights = [
  {
    icon: Anchor,
    title: 'Volcanic Shoreline',
    desc: 'A private stretch of dark, mineral-rich sand — shaped by Mt. Pinatubo, unlike any beach in the country.',
  },
  {
    icon: Sun,
    title: 'Dusk at the Pool',
    desc: 'Watch the sun drop below the water from the infinity pool, every evening without fail.',
  },
  {
    icon: Shell,
    title: 'A-Frame Villas',
    desc: 'Timber-and-nipa cottages built in the classic A-frame silhouette, lit by lantern at night.',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="section-label mb-3">Welcome to Kekamiya</p>
            <h2 className="section-title mb-6">
              A Coastline{' '}
              <span className="italic font-display text-ocean-700">Reshaped by Fire</span>,
              <br />Softened by Tide
            </h2>
            <p className="text-ink-600 text-lg leading-relaxed mb-6">
              Nestled along the shores of Botolan, Zambales, Kekamiya sits on sand made dark by
              the 1991 Pinatubo eruption — a landscape found nowhere else in the Philippines. Our
              A-frame villas sit beside an infinity pool that seems to merge with the horizon.
            </p>
            <p className="text-ink-600 leading-relaxed mb-8">
              Whether you're here for a family getaway, a quiet retreat, or a weekend with
              friends — wake up to slow sunrises, swim until the light turns gold, and fall
              asleep to the sound of the tide. This is more than a resort. It's a coastline
              with a history.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-ink-100">
              {[
                { num: '500+', label: 'Happy Guests' },
                { num: '10+', label: 'Villas & Cabins' },
                { num: '★ 5.0', label: 'Guest Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-semibold text-ocean-700">{s.num}</div>
                  <div className="text-ink-400 text-sm mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo collage */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-ocean-100 rounded-full blur-3xl opacity-40 -z-10" />

            {/* Main big photo */}
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-ink-900/10 mb-4 relative h-72 border border-ink-100">
              <Image
                src="/images/resort-villas-daytime.jpg"
                alt="Kekamiya A-frame villas beside the swimming pool"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Two smaller photos */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl overflow-hidden shadow-lg relative h-44 border border-ink-100">
                <Image
                  src="/images/19286.jpg"
                  alt="Sunset view from the Kekamiya pool"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg relative h-44 border border-ink-100">
                <Image
                  src="/images/resort-pavilion-pool.jpg"
                  alt="Kekamiya beachfront pavilion overlooking the pool and shore"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>

            {/* Highlight list — a quiet, rule-divided list rather than colored icon tiles */}
            <div className="divide-y divide-ink-100 border-t border-ink-100">
              {highlights.map((h) => {
                const Icon = h.icon
                return (
                  <div key={h.title} className="flex items-start gap-4 py-4">
                    <Icon className="w-5 h-5 text-ocean-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-ink-800 mb-0.5">{h.title}</h4>
                      <p className="text-ink-400 text-sm leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
