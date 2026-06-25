'use client'
import { Plus } from 'lucide-react'
import { useCart } from './CartProvider'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-brand-card rounded-2xl overflow-hidden card-hover border border-brand-border/50">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-brand-orange text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-brand-cream font-bold text-base">{product.name}</h3>
        <p className="text-brand-muted text-sm mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-brand-amber font-bold text-xl">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-brand-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
