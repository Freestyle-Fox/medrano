'use client'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from './CartProvider'
import Link from 'next/link'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, total, clearCart } = useCart()

  if (!cartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-surface z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-brand-orange w-5 h-5" />
            <h2 className="text-brand-cream font-bold text-lg">Your Order</h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="text-brand-muted hover:text-brand-cream p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-brand-border mx-auto mb-3" />
              <p className="text-brand-muted">Your cart is empty</p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-4 text-brand-orange text-sm underline"
              >
                Browse the menu
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item._id} className="flex gap-3 bg-brand-card rounded-xl p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-brand-cream font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-brand-orange font-bold text-sm mt-0.5">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item._id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-brand-border flex items-center justify-center text-brand-cream hover:bg-brand-orange transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-brand-cream text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item._id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-brand-border flex items-center justify-center text-brand-cream hover:bg-brand-orange transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-auto text-brand-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-brand-border space-y-3">
            <div className="flex justify-between text-brand-cream">
              <span className="font-medium">Total</span>
              <span className="font-bold text-xl text-brand-orange">${total.toFixed(2)}</span>
            </div>
            <Link
              href="/order"
              onClick={() => setCartOpen(false)}
              className="block w-full bg-brand-orange text-white text-center py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="block w-full text-brand-muted text-sm text-center hover:text-red-400 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
