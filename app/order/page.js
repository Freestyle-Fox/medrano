'use client'
import { useState } from 'react'
import { useCart } from '@/components/CartProvider'
import { useRouter } from 'next/navigation'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function OrderPage() {
  const { cart, total, clearCart } = useCart()
  const router = useRouter()
  const [form, setForm] = useState({
    customerName: '', customerEmail: '', customerPhone: '',
    address: '', notes: '', paymentMethod: 'cash',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (cart.length === 0) { setError('Your cart is empty!'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: cart, total }),
      })
      if (!res.ok) throw new Error('Order failed')
      clearCart()
      setSuccess(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="font-display text-4xl font-bold text-brand-cream mb-3">Order Placed!</h2>
          <p className="text-brand-muted mb-8">
            We've received your order and we're firing up the grill. You'll get a confirmation soon!
          </p>
          <Link href="/menu" className="bg-brand-orange text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
            Back to Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-brand-cream">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Order Summary */}
          <div>
            <h2 className="text-brand-cream font-bold text-lg mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-orange" /> Your Order
            </h2>
            {cart.length === 0 ? (
              <div className="bg-brand-surface rounded-2xl p-8 text-center border border-brand-border">
                <p className="text-brand-muted">Your cart is empty.</p>
                <Link href="/menu" className="mt-4 inline-block text-brand-orange underline text-sm">
                  Browse the menu
                </Link>
              </div>
            ) : (
              <div className="bg-brand-surface rounded-2xl border border-brand-border overflow-hidden">
                {cart.map(item => (
                  <div key={item._id} className="flex items-center gap-3 p-4 border-b border-brand-border last:border-0">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-brand-cream font-semibold text-sm">{item.name}</p>
                      <p className="text-brand-muted text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-brand-amber font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="p-4 flex justify-between items-center bg-brand-card">
                  <span className="text-brand-cream font-bold">Total</span>
                  <span className="text-brand-orange font-bold text-2xl">${total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div>
            <h2 className="text-brand-cream font-bold text-lg mb-4">Delivery Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: 'customerName', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
                { id: 'customerEmail', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                { id: 'customerPhone', label: 'Phone', type: 'tel', placeholder: '+1 555 000 0000' },
                { id: 'address', label: 'Delivery Address', type: 'text', placeholder: '123 Main St, City' },
              ].map(field => (
                <div key={field.id}>
                  <label className="block text-brand-muted text-sm mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.id]}
                    onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                    className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-brand-cream placeholder:text-brand-muted focus:outline-none focus:border-brand-orange text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="block text-brand-muted text-sm mb-1">Payment Method</label>
                <select
                  value={form.paymentMethod}
                  onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
                  className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-orange text-sm"
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Card on Delivery</option>
                </select>
              </div>

              <div>
                <label className="block text-brand-muted text-sm mb-1">Special Instructions (optional)</label>
                <textarea
                  rows={3}
                  placeholder="No onions, extra sauce..."
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-brand-cream placeholder:text-brand-muted focus:outline-none focus:border-brand-orange text-sm resize-none"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
