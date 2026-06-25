import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import Order from '@/models/Order'
import Reservation from '@/models/Reservation'
import { Package, ShoppingBag, Calendar, TrendingUp } from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  await connectDB()
  const [products, orders, reservations] = await Promise.all([
    Product.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(5).lean(),
    Reservation.find().sort({ createdAt: -1 }).limit(5).lean(),
  ])
  const totalRevenue = (await Order.find({ status: { $ne: 'cancelled' } }).lean())
    .reduce((sum, o) => sum + o.total, 0)
  return { products, orders, reservations, totalRevenue }
}

export default async function AdminDashboard() {
  const { products, orders, reservations, totalRevenue } = await getStats()

  const stats = [
    { label: 'Total Products', value: products, icon: Package, color: 'text-blue-400', link: '/admin/products' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-green-400', link: '/admin/orders' },
    { label: 'Reservations', value: reservations.length, icon: Calendar, color: 'text-purple-400', link: '/admin/reservations' },
    { label: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: TrendingUp, color: 'text-brand-amber', link: '/admin/orders' },
  ]

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    confirmed: 'bg-green-500/20 text-green-400',
    preparing: 'bg-blue-500/20 text-blue-400',
    'out-for-delivery': 'bg-purple-500/20 text-purple-400',
    delivered: 'bg-green-700/20 text-green-300',
    cancelled: 'bg-red-500/20 text-red-400',
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand-cream mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(s => (
          <Link key={s.label} href={s.link} className="bg-brand-surface border border-brand-border rounded-2xl p-6 card-hover">
            <div className="flex items-center justify-between mb-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-brand-muted text-sm">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-brand-cream font-bold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-brand-orange text-sm hover:underline">View all</Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-brand-muted text-sm text-center py-8">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.map(o => (
                <div key={o._id.toString()} className="flex items-center justify-between bg-brand-card rounded-xl p-3">
                  <div>
                    <p className="text-brand-cream text-sm font-medium">{o.customerName}</p>
                    <p className="text-brand-muted text-xs">{new Date(o.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-brand-amber font-bold text-sm">${o.total.toFixed(2)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[o.status] || 'bg-gray-500/20 text-gray-400'}`}>
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Reservations */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-brand-cream font-bold">Recent Reservations</h2>
            <Link href="/admin/reservations" className="text-brand-orange text-sm hover:underline">View all</Link>
          </div>
          {reservations.length === 0 ? (
            <p className="text-brand-muted text-sm text-center py-8">No reservations yet.</p>
          ) : (
            <div className="space-y-3">
              {reservations.map(r => (
                <div key={r._id.toString()} className="flex items-center justify-between bg-brand-card rounded-xl p-3">
                  <div>
                    <p className="text-brand-cream text-sm font-medium">{r.name}</p>
                    <p className="text-brand-muted text-xs">{r.date} at {r.time} · {r.guests} guests</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                    r.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                    r.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
