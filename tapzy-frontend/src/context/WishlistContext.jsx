import { createContext, useContext, useState, useCallback } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([])

  const addToWishlist = useCallback((product) => {
    setItems((prev) => {
      if (prev.find((i) => i._id === product._id)) return prev
      return [...prev, product]
    })
  }, [])

  const removeFromWishlist = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i._id !== id))
  }, [])

  const toggleWishlist = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i._id === product._id)
      if (exists) return prev.filter((i) => i._id !== product._id)
      return [...prev, product]
    })
  }, [])

  const isWishlisted = useCallback(
    (id) => items.some((i) => i._id === id),
    [items]
  )

  const clearWishlist = useCallback(() => setItems([]), [])

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted, clearWishlist, totalItems: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}
