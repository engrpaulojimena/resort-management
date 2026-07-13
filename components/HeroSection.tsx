'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Star, MapPin, Waves, Sun, Trees } from 'lucide-react'

// Best hero candidates: 19285 (night pool+sunset), 19288 (daytime pool+sea), 19289 (golden hour pool)
const heroImages = [
  { src: '/images/19288.jpg', alt: 'Kekamiya infinity pool overlooking the black-sand shore' },
  { src: '/images/resort-villas-golden-hour.jpg', alt: 'Guests enjoying the infinity pool at golden hour beside the A-frame villas' },
  { src: '/images/19289.jpg', alt: 'Guests enjoying the pool at golden hour' },
  { src: '/images/resort-villas-night.jpg', alt: 'A-frame villas strung with lantern lights at night' },
]

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [currentImg, setCurrentImg] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background images with crossfade */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === currentImg ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Dark overlay for text readability — basalt tint, not neutral black */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/65 via-ink-900/30 to-ink-900/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/25 via-transparent to-ink-900/15 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 pb-16">
        {/* Eyebrow */}
        <div
          className={`inline-flex items-center gap-2.5 text-white/80 text-[11px] font-bold tracking-[0.3em] uppercase mb-7 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="w-6 h-px bg-sand-400" />
          <MapPin className="w-3.5 h-3.5 text-sand-300" />
          Botolan, Zambales
          <span className="w-6 h-px bg-sand-400" />
        </div>

        {/* Headline */}
        <h1
          className={`font-display text-white leading-[1.05] mb-6 transition-all duration-1000 delay-150 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold drop-shadow-lg tracking-tight">
            Where the Black Sand
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold italic text-gradient-sand drop-shadow-lg tracking-tight">
            Meets the Tide
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={`text-white/85 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10 drop-shadow transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          Kekamiya sits on Zambales' volcanic shoreline, shaped by Pinatubo itself — a private
          stretch of dark sand, an infinity pool, and A-frame villas lit by lantern light at dusk.
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 mb-14 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <Link href="/book" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-2xl shadow-ink-900/40 justify-center">
            <Waves className="w-4 h-4 sm:w-5 sm:h-5" />
            Book Your Stay
          </Link>
          <Link href="/gallery" className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 justify-center">
            View Gallery
          </Link>
        </div>

        {/* Lantern-line divider with feature tags */}
        <div
          className={`w-full max-w-xl transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="lantern-line text-white/30 mb-6">
            <span className="lantern-dots">
              <span className="lantern-dot" style={{ animationDelay: '0s' }} />
              <span className="lantern-dot" style={{ animationDelay: '0.5s' }} />
              <span className="lantern-dot" style={{ animationDelay: '1s' }} />
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {[
              { Icon: Waves, label: 'Volcanic Black-Sand Shore' },
              { Icon: Sun, label: 'Infinity Pool' },
              { Icon: Trees, label: 'A-Frame Villas' },
            ].map((item) => (
              <div key={item.label} className="text-white/85 text-sm font-medium flex items-center gap-2">
                <item.Icon className="w-3.5 h-3.5 text-sand-300" />
                {item.label}
              </div>
            ))}
            <div className="text-white/85 text-sm font-medium flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-sand-300 text-sand-300" />
              ))}
              <span className="ml-1">5.0</span>
            </div>
          </div>
        </div>

        {/* Image dots */}
        <div className="flex gap-2 mt-9">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImg(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImg ? 'bg-sand-400 w-7' : 'bg-white/35 w-1.5'}`}
              aria-label={`Hero image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-20 pb-8 flex justify-center">
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="text-white/60 hover:text-white transition-colors animate-float"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-7 h-7" />
        </button>
      </div>
    </section>
  )
}
