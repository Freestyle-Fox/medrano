'use client'
import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { Search } from 'lucide-react'

const CATEGORIES = [
  { value: 'all', label: '🍽️ All' },
  { value: 'burgers', label: '🍔 Burgers' },
  { value: 'sides', label: '🍟 Sides' },
  { value: 'drinks', label: '🥤 Drinks' },
  { value: 'desserts', label: '🍫 Desserts' },
]

export default function MenuPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(`/api/products${category !== 'all' ? `?category=${category}` : ''}`)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [category])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-orange text-sm font-semibold uppercase tracking-widest mb-2">Full Menu</p>
          <h1 className="font-display text-5xl font-bold text-brand-cream">What We're Serving</h1>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
          <input
            type="text"
            placeholder="Search the menu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border rounded-xl pl-11 pr-4 py-3 text-brand-cream placeholder:text-brand-muted focus:outline-none focus:border-brand-orange text-sm"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 justify-center flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === cat.value
                  ? 'bg-brand-orange text-white'
                  : 'bg-brand-surface border border-brand-border text-brand-muted hover:border-brand-orange hover:text-brand-cream'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-brand-card rounded-2xl h-72 animate-pulse border border-brand-border/30" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-muted text-lg">No items found.</p>
            <button onClick={() => setSearch('')} className="mt-3 text-brand-orange text-sm underline">
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
