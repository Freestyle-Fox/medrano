'use client'
import { useState, useEffect } from 'react'
import { ChevronDown, Trash2, Eye, X } from 'lucide-react'

const STATUSES = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled']

const statusColor = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  preparing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'out-for-delivery': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  delivered: 'bg-emerald-700/20 text-emerald-300 border-emerald-700/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const load = () => {
    setLoading(true)
    fetch('/api/orders')
      .then(r => r.json())
      .then(d => { setOrders(d); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
    if (selected?._id === id) setSelected({ ...selected, status })
  }

  const deleteOrder = async (id) => {
    if (!confirm('Delete this order?')) return
    await fetch(`/api/orders/${id}`, { method: 'DELETE' })
    setSelected(null)
    load()
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand-cream mb-8">Orders</h1>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="bg-brand-surface h-16 rounded-xl animate-pulse border border-brand-border/30" />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-brand-muted">No orders yet.</div>
      ) : (
        <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-brand-border">
              <tr className="text-brand-muted text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-4">Customer</th>
                <th className="text-left px-5 py-4 hidden md:table-cell">Date</th>
                <th className="text-left px-5 py-4">Total</th>
                <th className="text-left px-5 py-4">Status</th>
                <th className="text-left px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {orders.map(o => (
                <tr key={o._id} className="hover:bg-brand-card transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-brand-cream font-medium">{o.customerName}</p>
                    <p className="text-brand-muted text-xs">{o.customerEmail}</p>
                  </td>
                  <td className="px-5 py-4 text-brand-muted hidden md:table-cell">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-brand-amber font-bold">${o.total.toFixed(2)}</td>
                  <td className="px-5 py-4">
                    <select
                      value={o.status}
                      onChange={e => updateStatus(o._id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border bg-transparent capitalize cursor-pointer focus:outline-none ${statusColor[o.status]}`}
                    >
                      {STATUSES.map(s => <option key={s} value={s} className="bg-brand-surface text-brand-cream">{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelected(o)}
                        className="p-1.5 bg-brand-card border border-brand-border text-brand-muted rounded-lg hover:text-brand-cream transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteOrder(o._id)}
                        className="p-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-surface border border-brand-border rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-brand-border">
              <h2 className="text-brand-cream font-bold">Order Details</h2>
              <button onClick={() => setSelected(null)} className="text-brand-muted hover:text-brand-cream">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-brand-muted text-xs mb-1">Customer</p>
                <p className="text-brand-cream font-semibold">{selected.customerName}</p>
                <p className="text-brand-muted text-sm">{selected.customerEmail} · {selected.customerPhone}</p>
              </div>
              <div>
                <p className="text-brand-muted text-xs mb-1">Delivery Address</p>
                <p className="text-brand-cream text-sm">{selected.address}</p>
              </div>
              {selected.notes && (
                <div>
                  <p className="text-brand-muted text-xs mb-1">Notes</p>
                  <p className="text-brand-cream text-sm">{selected.notes}</p>
                </div>
              )}
              <div>
                <p className="text-brand-muted text-xs mb-2">Items</p>
                <div className="space-y-2">
                  {selected.items?.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-brand-card rounded-lg p-3">
                      <div>
                        <p className="text-brand-cream text-sm font-medium">{item.name}</p>
                        <p className="text-brand-muted text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-brand-amber font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pt-2 border-t border-brand-border">
                <span className="text-brand-cream font-bold">Total</span>
                <span className="text-brand-orange font-bold text-xl">${selected.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
