import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, Calendar, Package, Flame } from 'lucide-react'
export const dynamic = 'force-dynamic'
export const metadata = { title: "Admin — Medrano's" }

export default function AdminLayout({ children }) {
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/reservations', label: 'Reservations', icon: Calendar },
  ]

  return (
    <div className="min-h-screen flex pt-16">
      {/* Sidebar */}
      <aside className="fixed top-16 left-0 bottom-0 w-56 bg-brand-surface border-r border-brand-border z-40">
        <div className="p-5 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <Flame className="text-brand-orange w-5 h-5" />
            <span className="text-brand-cream font-bold text-sm">Admin Panel</span>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-brand-muted hover:text-brand-cream hover:bg-brand-card text-sm font-medium transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-brand-muted hover:text-brand-cream text-xs py-2"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
