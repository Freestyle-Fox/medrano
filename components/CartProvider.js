'use client'
import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === product._id)
      if (existing) {
        return prev.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i._id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCart(prev => prev.map(i => i._id === id ? { ...i, quantity: qty } : i))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
