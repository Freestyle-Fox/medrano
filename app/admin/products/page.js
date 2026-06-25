'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

const EMPTY = { name: '', description: '', price: '', category: 'burgers', image: '', badge: '', available: true }
const CATEGORIES = ['burgers', 'sides', 'drinks', 'desserts']

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    fetch('/api/products')
      .then(r => r.json())
      .then(d => { setProducts(d); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal(true) }
  const openEdit = (p) => {
    setForm({ ...p, price: String(p.price) })
    setEditing(p._id)
    setModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = { ...form, price: parseFloat(form.price) }
    const url = editing ? `/api/products/${editing}` : '/api/products'
    const method = editing ? 'PUT' : 'POST'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    setModal(false)
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    load()
  }

  const categoryColor = { burgers: 'text-orange-400', sides: 'text-yellow-400', drinks: 'text-blue-400', desserts: 'text-pink-400' }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-cream">Products</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-brand-surface rounded-2xl h-48 animate-pulse border border-brand-border/30" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p._id} className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
              <div className="h-36 overflow-hidden relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                {!p.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-red-400 font-semibold text-sm">Unavailable</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-brand-cream font-semibold text-sm truncate">{p.name}</p>
                    <p className={`text-xs font-medium capitalize ${categoryColor[p.category]}`}>{p.category}</p>
                  </div>
                  <span className="text-brand-amber font-bold">${p.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex-1 flex items-center justify-center gap-1 bg-brand-card border border-brand-border text-brand-cream text-xs py-1.5 rounded-lg hover:border-brand-orange transition-colors"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex items-center justify-center gap-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-surface border border-brand-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-brand-border">
              <h2 className="text-brand-cream font-bold">{editing ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setModal(false)} className="text-brand-muted hover:text-brand-cream">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { id: 'name', label: 'Name', type: 'text' },
                { id: 'image', label: 'Image URL', type: 'url' },
                { id: 'badge', label: 'Badge (optional)', type: 'text' },
              ].map(f => (
                <div key={f.id}>
                  <label className="block text-brand-muted text-sm mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={form[f.id]}
                    onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-brand-cream focus:outline-none focus:border-brand-orange text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-brand-muted text-sm mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-brand-cream focus:outline-none focus:border-brand-orange text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-muted text-sm mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-brand-cream focus:outline-none focus:border-brand-orange text-sm"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted text-sm mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-brand-cream focus:outline-none focus:border-brand-orange text-sm"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, available: !form.available })}
                  className={`w-10 h-6 rounded-full transition-colors ${form.available ? 'bg-brand-orange' : 'bg-brand-border'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.available ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
                <span className="text-brand-muted text-sm">{form.available ? 'Available' : 'Unavailable'}</span>
              </label>
            </div>
            <div className="p-5 border-t border-brand-border flex gap-3">
              <button
                onClick={() => setModal(false)}
                className="flex-1 border border-brand-border text-brand-muted py-2.5 rounded-xl text-sm hover:text-brand-cream transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-brand-orange text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? 'Saving...' : <><Check className="w-4 h-4" /> Save</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
