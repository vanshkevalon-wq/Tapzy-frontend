import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { _id, name, price, mainImage, image, category } = product
  const imgUrl = mainImage?.url || image || 'https://placehold.co/400x400/f9f0ff/A64BDF?text=Tapzy'
  const discountedPrice = (Number(price) * 1.2).toLocaleString('en-IN', { maximumFractionDigits: 0 })

  const { addToCart } = useCart()

  function handleAddToCart(e) {
    e.preventDefault()   // stop the Link navigation
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Link
      to={`/products/${_id}`}
      className="group relative bg-white rounded-3xl border border-primary-100 shadow-card hover:shadow-card-hover hover:border-primary-200 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-primary-50/60" style={{ aspectRatio: '1 / 1' }}>
        <img
          src={imgUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-plum/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {category && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-primary-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-primary-100">
            {category}
          </span>
        )}

        {/* Add to Cart button — appears on hover */}
        <motion.button
          initial={false}
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 active:scale-95 text-white text-[11px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-glow-sm"
        >
          <span className="icon text-sm leading-none">add_shopping_cart</span>
          Add to Cart
        </motion.button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-1">
        <h3 className="font-bold text-plum text-sm leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">
          {name}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-xl font-extrabold bg-brand-gradient bg-clip-text text-transparent">
            ₹{Number(price).toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-plum/30 line-through font-medium">
            ₹{discountedPrice}
          </span>
        </div>
      </div>
    </Link>
  )
}
