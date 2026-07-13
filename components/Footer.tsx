import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      {/* Lantern-line top edge — the signature motif closes out the page
          the same way it opens the hero */}
      <div className="flex items-center justify-center gap-14 pt-8">
        {[...Array(11)].map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-sand-400 animate-lantern-glow" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/icon.png"
                  alt="Kekamiya Beach Resort"
                  fill
                  className="object-contain drop-shadow-md"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="font-display font-semibold text-lg">Kekamiya</div>
                <div className="text-sand-400 text-xs tracking-wider">Beach Resort</div>
              </div>
            </div>
            <p className="text-ocean-200 text-sm leading-relaxed mb-5">
              Your paradise on Zambales' volcanic shoreline, Botolan.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook className="w-4 h-4" />, href: 'https://facebook.com/kekamiyabeachresort', label: 'Facebook' },
                { icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                    </svg>
                  ),
                  href: '#',
                  label: 'YouTube'
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-sand-500 hover:text-ink-900 flex items-center justify-center transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-sand-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Accommodations', href: '/accommodations' },
                { label: 'Amenities', href: '/amenities' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Policies & Guidelines', href: '/policies' },
                { label: 'Book Now', href: '/book' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-ocean-200 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-sand-400 mb-4">Facilities</h4>
            <ul className="space-y-2 text-ocean-200 text-sm">
              {['Swimming Pool', 'Private Beach', 'Seafood Restaurant', 'Event Venue', 'Cottages & Cabanas', 'Water Activities'].map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-sand-400 mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-ocean-200">
              <p>📍 Botolan, Zambales, Philippines</p>
              <p>📞 +63 XXX XXX XXXX</p>
              <p>✉️ info@kekamiyabeachresort.com</p>
              <p>🕐 Open Daily: 6AM – 10PM</p>
            </div>
            <div className="mt-5">
              <Link href="/book" className="btn-primary text-sm px-5 py-2.5">
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-ocean-300 text-xs">
          <span>© {new Date().getFullYear()} Kekamiya Beach Resort. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 fill-coral-400 text-coral-400" /> in the Philippines
          </span>
        </div>
      </div>
    </footer>
  )
}
