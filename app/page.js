import Link from 'next/link'
import { Flame, Star, Clock, MapPin, ChevronRight } from 'lucide-react'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import ProductCard from '@/components/ProductCard'

async function getFeaturedProducts() {
  try {
    await connectDB()
    return await Product.find({ available: true, badge: { $ne: '' } }).limit(4).lean()
  } catch {
    return []
  }
}

export default async function Home() {
  const featured = await getFeaturedProducts()

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80')" }}
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-amber text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Flame className="w-4 h-4" />
            Flame-Grilled to Perfection
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-brand-cream leading-tight glow-text mb-6">
            Medrano's<br />
            <span className="text-brand-orange">Burgers</span>
          </h1>
          <p className="text-brand-muted text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Handcrafted flame-grilled burgers made with the freshest ingredients. 
            Every bite is a taste of pure fire and flavor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-brand-orange text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-orange-600 transition-colors glow-orange inline-flex items-center gap-2 justify-center"
            >
              Order Now <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/reservations"
              className="border border-brand-cream/30 text-brand-cream px-8 py-4 rounded-xl font-semibold text-base hover:border-brand-orange hover:text-brand-orange transition-colors inline-flex items-center gap-2 justify-center"
            >
              Reserve a Table
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-muted text-xs flex flex-col items-center gap-2 animate-bounce">
          <span>Scroll</span>
          <div className="w-px h-8 bg-brand-border" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-brand-surface border-y border-brand-border py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '15+', label: 'Years of fire' },
            { value: '50K+', label: 'Happy customers' },
            { value: '4.9★', label: 'Average rating' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl md:text-4xl font-display font-bold text-brand-orange">{s.value}</div>
              <div className="text-brand-muted text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED MENU */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <p className="text-brand-orange text-sm font-semibold uppercase tracking-widest mb-2">Fan Favourites</p>
            <h2 className="font-display text-4xl font-bold text-brand-cream">Can't-Miss Burgers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => (
              <ProductCard key={p._id.toString()} product={{ ...p, _id: p._id.toString() }} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 border border-brand-orange text-brand-orange px-6 py-3 rounded-xl font-semibold hover:bg-brand-orange hover:text-white transition-colors"
            >
              View Full Menu <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* WHY US */}
      <section className="bg-brand-surface border-y border-brand-border py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-brand-cream">Why Medrano's?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔥',
                title: 'Real Flame Grill',
                desc: 'We never use flat-top grills. Every patty meets open flame for that unmistakable charred crust.',
              },
              {
                icon: '🥩',
                title: 'Fresh, Never Frozen',
                desc: 'Our beef is ground fresh daily from locally sourced cattle. No freezers, no shortcuts.',
              },
              {
                icon: '🍞',
                title: 'House-Baked Buns',
                desc: 'Pillowy brioche buns baked in-house every morning. Soft enough to squeeze, sturdy enough to hold.',
              },
            ].map(f => (
              <div key={f.title} className="text-center p-8 rounded-2xl bg-brand-card border border-brand-border/50">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-brand-cream font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVE CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-brand-surface via-brand-card to-brand-surface rounded-3xl border border-brand-border p-12">
          <Star className="w-10 h-10 text-brand-amber mx-auto mb-4" />
          <h2 className="font-display text-4xl font-bold text-brand-cream mb-3">Book Your Table</h2>
          <p className="text-brand-muted text-base max-w-md mx-auto mb-8">
            Skip the queue. Reserve your spot and arrive to a table ready for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservations"
              className="bg-brand-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors"
            >
              Make a Reservation
            </Link>
            <div className="flex items-center gap-2 justify-center text-brand-muted text-sm">
              <Clock className="w-4 h-4" />
              <span>Mon–Sun: 11am – 11pm</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
