'use client'
import { useState, useEffect } from 'react'
import { Trash2, Check, X, Calendar, Clock, Users } from 'lucide-react'

export default function AdminReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const load = () => {
    setLoading(true)
    fetch('/api/reservations')
      .then(r => r.json())
      .then(d => { setReservations(d); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    await fetch(`/api/reservations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
  }

  const deleteRes = async (id) => {
    if (!confirm('Delete this reservation?')) return
    await fetch(`/api/reservations/${id}`, { method: 'DELETE' })
    load()
  }

  const statusColor = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    confirmed: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
  }

  const filtered = filter === 'all' ? reservations : reservations.filter(r => r.status === filter)

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand-cream mb-8">Reservations</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
              filter === f ? 'bg-brand-orange text-white' : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-cream'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="bg-brand-surface h-24 rounded-xl animate-pulse border border-brand-border/30" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-brand-muted">No reservations found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => (
            <div key={r._id} className="bg-brand-surface border border-brand-border rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <p className="text-brand-cream font-semibold">{r.name}</p>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColor[r.status]}`}>
                      {r.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-brand-muted text-sm">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-orange" />{r.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />{r.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-orange" />{r.guests} guests
                    </span>
                  </div>
                  <p className="text-brand-muted text-xs mt-1">{r.email} · {r.phone}</p>
                  {r.notes && <p className="text-brand-muted text-xs mt-1 italic">"{r.notes}"</p>}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {r.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(r._id, 'confirmed')}
                        className="flex items-center gap-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition-colors"
                      >
                        <Check className="w-3 h-3" /> Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(r._id, 'cancelled')}
                        className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                      >
                        <X className="w-3 h-3" /> Cancel
                      </button>
                    </>
                  )}
                  {r.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(r._id, 'cancelled')}
                      className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <X className="w-3 h-3" /> Cancel
                    </button>
                  )}
                  <button
                    onClick={() => deleteRes(r._id)}
                    className="p-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
