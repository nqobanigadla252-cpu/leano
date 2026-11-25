"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/data/products"

type CartLine = { product: Product; quantity: number }
type StoreState = {
  cart: CartLine[]
  wishlist: string[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  toggleWishlist: (id: string) => void
  clearCart: () => void
}

export const useStore = create<StoreState>()(persist((set) => ({
  cart: [],
  wishlist: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find((line) => line.product.id === product.id)
    return { cart: existing ? state.cart.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line) : [...state.cart, { product, quantity: 1 }] }
  }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((line) => line.product.id !== id) })),
  setQuantity: (id, quantity) => set((state) => ({ cart: quantity < 1 ? state.cart.filter((line) => line.product.id !== id) : state.cart.map((line) => line.product.id === id ? { ...line, quantity } : line) })),
  toggleWishlist: (id) => set((state) => ({ wishlist: state.wishlist.includes(id) ? state.wishlist.filter((item) => item !== id) : [...state.wishlist, id] })),
  clearCart: () => set({ cart: [] }),
}), { name: "leano-store-v1" }))
