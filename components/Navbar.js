'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Menu, X, Flame } from 'lucide-react'
import { useCart } from './CartProvider'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, setCartOpen } = useCart()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/reservations', label: 'Reserve' },
    { href: '/about', label: 'About' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Flame className="text-brand-orange w-6 h-6 flame" />
            <span className="font-display text-xl font-bold text-brand-cream tracking-wide">
              Medrano's
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-brand-muted hover:text-brand-cream text-sm font-medium tracking-wide transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-brand-cream hover:text-brand-orange transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </button>

            <Link
              href="/menu"
              className="hidden md:inline-flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
            >
              Order Now
            </Link>

            <button
              className="md:hidden text-brand-cream p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-brand-surface border-t border-brand-border px-4 py-4 flex flex-col gap-3">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-brand-cream py-2 text-base border-b border-brand-border/50"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/menu"
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-brand-orange text-white text-center py-3 rounded-lg font-semibold"
            >
              Order Now
            </Link>
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  )
}
