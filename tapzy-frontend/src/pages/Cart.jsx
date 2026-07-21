import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart()

  return (
    <main className="bg-offwhite min-h-screen">
      {/* Top accent */}
      <div className="h-1.5 w-full bg-brand-gradient" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-plum">Your Cart</h1>
            <p className="text-plum/40 text-sm mt-1 font-medium">
              {totalItems === 0 ? 'No items yet' : `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-all duration-200"
            >
              <span className="icon text-base leading-none">delete_sweep</span>
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* ── Empty state ── */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 rounded-3xl bg-primary-50 flex items-center justify-center mb-6 text-5xl shadow-card">
              🛒
            </div>
            <h2 className="text-2xl font-extrabold text-plum mb-2">Your cart is empty</h2>
            <p className="text-plum/40 text-sm mb-8 max-w-xs">
              Browse our premium NFC card collection and add something you love.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.02] transition-all"
            >
              <span className="icon text-base leading-none">storefront</span>
              Shop Products
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Cart items ── */}
            <div className="flex-1 flex flex-col gap-4">
              <AnimatePresence>
                {items.map((item) => {
                  const imgUrl = item.mainImage?.url || item.image || 'https://placehold.co/200x200/f9f0ff/A64BDF?text=Tapzy'
                  return (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-4 bg-white rounded-3xl p-4 shadow-card border border-primary-100"
                    >
                      {/* Product image */}
                      <Link to={`/products/${item._id}`} className="shrink-0">
                        <img
                          src={imgUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-2xl border border-primary-100 hover:scale-105 transition-transform duration-200"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item._id}`}
                          className="font-bold text-plum text-sm leading-snug line-clamp-2 hover:text-primary-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.category && (
                          <span className="text-[10px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                            {item.category}
                          </span>
                        )}
                        <div className="flex items-baseline gap-2 mt-1.5">
                          <span className="text-base font-extrabold bg-brand-gradient bg-clip-text text-transparent">
                            ₹{Number(item.price).toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-plum/30 font-medium">each</span>
                        </div>
                      </div>

                      {/* Qty controls + remove */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {/* Qty stepper */}
                        <div className="flex items-center gap-1 bg-primary-50 rounded-xl p-1">
                          <button
                            onClick={() => updateQty(item._id, item.qty - 1)}
                            disabled={item.qty <= 1}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-plum/60 hover:bg-white hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                          >
                            <span className="icon text-base leading-none">remove</span>
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-plum">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item._id, item.qty + 1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-plum/60 hover:bg-white hover:text-primary-600 transition-all duration-150"
                          >
                            <span className="icon text-base leading-none">add</span>
                          </button>
                        </div>

                        {/* Subtotal */}
                        <span className="text-xs font-bold text-plum/50">
                          ₹{(Number(item.price) * item.qty).toLocaleString('en-IN')}
                        </span>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-red-400 hover:text-red-600 transition-colors"
                        >
                          <span className="icon text-sm leading-none">delete</span>
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* ── Order summary ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:w-80 shrink-0"
            >
              <div className="bg-white rounded-3xl shadow-card border border-primary-100 p-6 sticky top-24">
                <h2 className="text-lg font-extrabold text-plum mb-5">Order Summary</h2>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-plum/60 font-medium">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-plum/60 font-medium">
                    <span>Shipping</span>
                    <span className={totalPrice >= 999 ? 'text-green-600 font-bold' : ''}>
                      {totalPrice >= 999 ? 'FREE' : '₹99'}
                    </span>
                  </div>
                  {totalPrice < 999 && (
                    <p className="text-[11px] text-primary-500 font-medium bg-primary-50 px-3 py-2 rounded-xl">
                      Add ₹{(999 - totalPrice).toLocaleString('en-IN')} more for free shipping 🎉
                    </p>
                  )}
                  <div className="h-px bg-primary-100 my-1" />
                  <div className="flex justify-between font-extrabold text-plum text-base">
                    <span>Total</span>
                    <span className="bg-brand-gradient bg-clip-text text-transparent">
                      ₹{(totalPrice + (totalPrice >= 999 ? 0 : 99)).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  to="/contact"
                  className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.02] active:scale-100 transition-all text-sm"
                >
                  Proceed to Order
                  <span className="icon text-base leading-none">arrow_forward</span>
                </Link>

                <Link
                  to="/products"
                  className="mt-3 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold text-primary-600 border-2 border-primary-100 hover:bg-primary-50 hover:border-primary-300 transition-all text-sm"
                >
                  <span className="icon text-base leading-none">storefront</span>
                  Continue Shopping
                </Link>

                {/* Trust row */}
                <div className="flex items-center justify-center gap-4 mt-5 text-[10px] text-plum/40 font-medium">
                  <span>🔒 Secure</span>
                  <span>🚚 Fast Delivery</span>
                  <span>💯 Quality</span>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </main>
  )
}
