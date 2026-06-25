'use client'
import { useState } from 'react'
import { CheckCircle, Calendar, Clock, Users } from 'lucide-react'

const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30',
]

export default function ReservationsPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    date: '', time: '', guests: 2, notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Reservation failed')
      setSuccess(true)
    } catch {
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
          <h2 className="font-display text-4xl font-bold text-brand-cream mb-3">Table Reserved!</h2>
          <p className="text-brand-muted mb-2">We've received your reservation for</p>
          <p className="text-brand-amber font-bold text-xl">{form.date} at {form.time}</p>
          <p className="text-brand-muted mt-2 mb-8">See you soon, {form.name}! A confirmation will be sent to {form.email}.</p>
          <button
            onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', date: '', time: '', guests: 2, notes: '' }) }}
            className="bg-brand-orange text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-orange text-sm font-semibold uppercase tracking-widest mb-2">Book a Table</p>
          <h1 className="font-display text-5xl font-bold text-brand-cream mb-3">Reserve Your Spot</h1>
          <p className="text-brand-muted">Secure your table in seconds. We'll confirm within the hour.</p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: Calendar, label: 'Open Daily' },
            { icon: Clock, label: '11am – 11pm' },
            { icon: Users, label: 'Up to 12 guests' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
              <Icon className="w-5 h-5 text-brand-orange mx-auto mb-2" />
              <p className="text-brand-muted text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-brand-surface border border-brand-border rounded-2xl p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
              { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 555 000 0000' },
            ].map(f => (
              <div key={f.id}>
                <label className="block text-brand-muted text-sm mb-1">{f.label}</label>
                <input
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={form[f.id]}
                  onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-cream placeholder:text-brand-muted focus:outline-none focus:border-brand-orange text-sm"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-brand-muted text-sm mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-cream placeholder:text-brand-muted focus:outline-none focus:border-brand-orange text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-brand-muted text-sm mb-1">Date</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-orange text-sm"
              />
            </div>
            <div>
              <label className="block text-brand-muted text-sm mb-1">Number of Guests</label>
              <select
                value={form.guests}
                onChange={e => setForm({ ...form, guests: parseInt(e.target.value) })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-orange text-sm"
              >
                {[1,2,3,4,5,6,7,8,10,12].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-brand-muted text-sm mb-3">Time Slot</label>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, time: t })}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    form.time === t
                      ? 'bg-brand-orange text-white'
                      : 'bg-brand-bg border border-brand-border text-brand-muted hover:border-brand-orange hover:text-brand-cream'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-brand-muted text-sm mb-1">Special Requests (optional)</label>
            <textarea
              rows={3}
              placeholder="Allergies, birthday occasion, high chair needed..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-cream placeholder:text-brand-muted focus:outline-none focus:border-brand-orange text-sm resize-none"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading || !form.time}
            className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Booking...' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </div>
  )
}
