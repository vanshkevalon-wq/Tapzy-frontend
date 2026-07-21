import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  function handleMoveToCart(product) {
    addToCart(product)
    removeFromWishlist(product._id)
  }

  return (
    <main className="bg-offwhite min-h-screen">
      <div className="h-1.5 w-full bg-brand-gradient" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-plum">My Wishlist</h1>
            <p className="text-plum/50 text-sm mt-1">
              {items.length === 0
                ? 'Your wishlist is empty'
                : `${items.length} item${items.length > 1 ? 's' : ''} saved`}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-semibold text-plum/40 hover:text-red-500 transition-colors flex items-center gap-1.5"
            >
              <span className="icon text-base">delete_sweep</span>
              Clear all
            </button>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center mb-6 border border-primary-100">
              <span className="icon text-5xl text-primary-300">favorite_border</span>
            </div>
            <h2 className="text-xl font-bold text-plum mb-2">Nothing here yet</h2>
            <p className="text-plum/40 text-sm mb-8 max-w-xs">
              Tap the heart icon on any product to save it here for later.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.02] active:scale-100 transition-all text-sm"
            >
              <span className="icon text-base">shopping_bag</span>
              Browse Products
            </Link>
          </motion.div>
        )}

        {/* Wishlist grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence>
              {items.map((product) => {
                const imgUrl =
                  product.mainImage?.url ||
                  product.image ||
                  'https://placehold.co/400x400/f9f0ff/A64BDF?text=Tapzy'
                const discountedPrice = (Number(product.price) * 1.2).toLocaleString('en-IN', {
                  maximumFractionDigits: 0,
                })

                return (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="group relative bg-white rounded-3xl border border-primary-100 shadow-card hover:shadow-card-hover hover:border-primary-200 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Remove from wishlist */}
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      aria-label="Remove from wishlist"
                      className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-primary-100 text-red-500 hover:bg-red-50 hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      <span className="icon icon-fill text-lg leading-none">favorite</span>
                    </button>

                    {/* Image */}
                    <Link
                      to={`/products/${product._id}`}
                      className="relative overflow-hidden bg-primary-50/60 block"
                      style={{ aspectRatio: '1 / 1' }}
                    >
                      <img
                        src={imgUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-plum/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {product.category && (
                        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-primary-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-primary-100">
                          {product.category}
                        </span>
                      )}
                    </Link>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1 gap-1">
                      <Link to={`/products/${product._id}`}>
                        <h3 className="font-bold text-plum text-sm leading-snug line-clamp-2 hover:text-primary-700 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-baseline gap-2 mt-1 mb-3">
                        <span className="text-xl font-extrabold bg-brand-gradient bg-clip-text text-transparent">
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-plum/30 line-through font-medium">
                          ₹{discountedPrice}
                        </span>
                      </div>
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-2xl font-bold text-white text-xs bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.02] active:scale-100 transition-all"
                      >
                        <span className="icon text-sm leading-none">add_shopping_cart</span>
                        Move to Cart
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  )
}
