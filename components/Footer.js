import Link from 'next/link'
import { Flame, MapPin, Phone, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-20">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="text-brand-orange w-6 h-6" />
            <span className="font-display text-xl font-bold text-brand-cream">Medrano's</span>
          </div>
          <p className="text-brand-muted text-sm leading-relaxed">
            Flame-grilled burgers crafted with passion since 2010. Every patty tells a story of fire and flavor.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-brand-cream font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/menu', label: 'Menu' },
              { href: '/order', label: 'Order Online' },
              { href: '/reservations', label: 'Reserve a Table' },
              { href: '/about', label: 'About Us' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-brand-muted hover:text-brand-orange text-sm transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-brand-cream font-semibold mb-4 text-sm uppercase tracking-wider">Find Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-brand-muted text-sm">
              <MapPin className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
              123 Flame Street, Grill District, NY 10001
            </li>
            <li className="flex items-center gap-2 text-brand-muted text-sm">
              <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
              (555) 123-4567
            </li>
            <li className="flex items-start gap-2 text-brand-muted text-sm">
              <Clock className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
              <div>
                Mon–Thu: 11am – 10pm<br />
                Fri–Sun: 11am – 11pm
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border py-5 text-center text-brand-muted text-xs">
        © {new Date().getFullYear()} Medrano's Burgers. All rights reserved.
      </div>
    </footer>
  )
}
