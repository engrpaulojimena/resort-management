'use client'

const amenities = [
  {
    icon: '🏊',
    title: 'Swimming Pools',
    desc: 'Two refreshing pools — one for adults and one for kids — surrounded by tropical garden.',
    color: 'bg-ocean-700',
    featured: true,
  },
  {
    icon: '🏖️',
    title: 'Private Beach',
    desc: 'Direct access to the volcanic-sand shore, perfect for sunbathing.',
    color: 'bg-sand-600',
    featured: true,
  },
  {
    icon: '🏖️',
    title: 'Beachfront Access',
    desc: 'Enjoy direct access to our clean and relaxing beachfront, perfect for swimming, sunbathing, and family bonding.',
    color: 'bg-coral-500',
    featured: false,
  },
  {
    icon: '🌴',
    title: 'Cottages & Cabanas',
    desc: 'Shaded cottages and beachside cabanas for your ultimate relaxation.',
    color: 'bg-palm-500',
    featured: false,
  },
  {
    icon: '🎤',
    title: 'Events & KTV',
    desc: 'Host your celebrations, team outings, and parties with our full event facilities.',
    color: 'bg-ink-700',
    featured: false,
  },
  {
    icon: '🏕️',
    title: 'Overnight Stays',
    desc: 'Comfortable accommodations for guests who want to extend their paradise experience.',
    color: 'bg-ocean-600',
    featured: false,
  },
  {
    icon: '🤿',
    title: 'Water Activities',
    desc: 'Snorkeling, kayaking, and beach volleyball for the adventurous at heart.',
    color: 'bg-ocean-500',
    featured: false,
  },
  {
    icon: '🌅',
    title: 'Sunset Viewing',
    desc: 'The most breathtaking sunsets over the water, every single evening.',
    color: 'bg-sand-500',
    featured: false,
  },
]

export default function AmenitiesSection() {
  return (
    <section className="py-24 bg-paper-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-label mb-3 justify-center">What We Offer</p>
          <h2 className="section-title mb-4">
            Everything You Need for the{' '}
            <span className="italic font-display text-ocean-700">Perfect Vacation</span>
          </h2>
          <p className="text-ink-400 text-lg">
            From poolside fun to beachside dining — Kekamiya has it all.
          </p>
        </div>

        {/* Featured amenities — flat color fields, no gradient blobs */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {amenities.filter(a => a.featured).map((a) => (
            <div
              key={a.title}
              className={`relative rounded-2xl ${a.color} p-8 text-white overflow-hidden group card-hover cursor-pointer`}
            >
              {/* Corner accent — a single lantern-dot mark, not a gradient blob */}
              <span className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/70 transition-colors" />

              <div className="relative z-10">
                <span className="text-5xl mb-4 block">{a.icon}</span>
                <h3 className="font-display text-2xl font-semibold mb-2">{a.title}</h3>
                <p className="text-white/80 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Regular amenities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.filter(a => !a.featured).map((a) => (
            <div
              key={a.title}
              className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-ink-100 card-hover group"
            >
              <div className={`w-12 h-12 rounded-xl ${a.color} flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform`}>
                {a.icon}
              </div>
              <div>
                <h4 className="font-semibold text-ink-800 mb-1">{a.title}</h4>
                <p className="text-ink-400 text-sm leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
