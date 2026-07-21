import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'
import { PageLoader } from '../components/common/Loader'
import SimilarProducts from '../components/products/SimilarProducts'
import { useCart } from '../context/CartContext'

const features = [
  { icon: '⚡', label: 'Instant Share', desc: 'Tap and share, no app needed' },
  { icon: '🔄', label: 'Live Updates', desc: 'Edit your info anytime, anywhere' },
  { icon: '📱', label: 'Universal', desc: 'Works on all modern phones' },
  { icon: '♻️', label: 'Eco-Friendly', desc: 'One card, zero reprints ever' },
]

const specs = [
  { label: 'Material', value: 'Premium PVC / Metal' },
  { label: 'NFC Chip', value: 'ISO 14443-A' },
  { label: 'Compatibility', value: 'iOS 14+ · Android 5+' },
  { label: 'Dimensions', value: 'Standard CR80 (85.6 × 54mm)' },
  { label: 'Delivery', value: '5–7 business days' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct]         = useState(null)
  const [similar, setSimilar]         = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState('')
  const [activeImage, setActiveImage] = useState(null)
  const [activeTab, setActiveTab]     = useState('overview')
  const [zoomed, setZoomed]           = useState(false)
  const [added, setAdded]             = useState(false)

  const { addToCart } = useCart()

  function handleAddToCart() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  useEffect(() => {
    setLoading(true)
    setActiveImage(null)
    setActiveTab('overview')
    api.get(`/products/${id}`)
      .then(({ data }) => {
        const p = data.product || data
        setProduct(p)
        setSimilar(data.similar || [])
        setActiveImage(p.mainImage?.url || p.image || null)
      })
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="bg-offwhite min-h-screen"><PageLoader /></div>

  if (error) return (
    <div className="bg-offwhite min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-plum font-bold text-xl mb-2">Product not found</p>
        <p className="text-plum/50 text-sm mb-6">{error}</p>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow transition-all"
        >
          ← Back to Products
        </button>
      </div>
    </div>
  )

  const allImages = [
    ...(product.mainImage ? [product.mainImage] : []),
    ...(product.similarImages || []),
  ]

  const fallback = 'https://placehold.co/600x600/f9f0ff/A64BDF?text=Tapzy'
  const displayImage = activeImage || fallback

  return (
    <main className="bg-offwhite min-h-screen">
      {/* ── Top gradient accent ── */}
      <div className="h-1.5 w-full bg-brand-gradient" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-plum/40 mb-10 font-medium">
          <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
          <span className="icon text-sm">chevron_right</span>
          <Link to="/products" className="hover:text-primary-500 transition-colors">Products</Link>
          <span className="icon text-sm">chevron_right</span>
          <span className="text-plum font-semibold truncate max-w-[180px]">{product.name}</span>
        </nav>

        {/* ── Main Product Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── LEFT: Image Gallery ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-4"
          >
            {/* Main image with zoom */}
            <div
              className={`relative bg-white rounded-3xl overflow-hidden shadow-card border border-primary-100 cursor-zoom-in transition-all duration-300 ${zoomed ? 'ring-2 ring-primary-400' : ''}`}
              style={{ aspectRatio: '1 / 1' }}
              onClick={() => setZoomed(!zoomed)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={displayImage}
                  src={displayImage}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: zoomed ? 1.12 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm border border-primary-100">
                <span className="icon text-plum/50" style={{ fontSize: '14px' }}>zoom_in</span>
                <span className="text-[10px] text-plum/50 font-semibold">{zoomed ? 'Click to reset' : 'Click to zoom'}</span>
              </div>

              {/* Category badge */}
              {product.category && (
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-primary-100">
                    {product.category}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImage(img.url); setZoomed(false) }}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === img.url
                        ? 'border-primary-500 shadow-glow-sm scale-[1.04]'
                        : 'border-transparent hover:border-primary-300 hover:scale-[1.02] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-1">
              {[
                { icon: '🛡️', text: 'Secure Order' },
                { icon: '🚚', text: 'Fast Delivery' },
                { icon: '💯', text: 'Quality Guaranteed' },
              ].map((b) => (
                <div key={b.text} className="flex flex-col items-center gap-1.5 bg-white rounded-2xl py-3 px-2 border border-primary-100 text-center">
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-[10px] font-semibold text-plum/60 leading-tight">{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Product Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Rating row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="icon icon-fill text-base text-yellow-400" style={{ fontSize: '16px' }}>star</span>
                ))}
              </div>
              <span className="text-xs text-plum/40 font-medium">4.9 · 248 reviews</span>
              <span className="w-1 h-1 rounded-full bg-plum/20" />
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">In Stock</span>
            </div>

            {/* Product name */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-plum leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price block */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-extrabold bg-brand-gradient bg-clip-text text-transparent">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-plum/40 font-medium line-through">
                ₹{(Number(product.price) * 1.2).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                20% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-plum/60 leading-relaxed text-sm mb-7 border-l-2 border-primary-200 pl-4">
              {product.description || 'A premium NFC business card crafted for professionals who want to make every connection count. Tap once and share everything, forever.'}
            </p>

            {/* Tab switcher */}
            <div className="flex gap-1 bg-primary-50 p-1 rounded-2xl mb-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'specs', label: 'Specs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-plum/50 hover:text-plum/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 gap-3 mb-7"
                >
                  {features.map((f) => (
                    <div key={f.label} className="flex gap-3 items-start bg-primary-50 rounded-2xl p-4 border border-primary-100">
                      <span className="text-2xl">{f.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-plum mb-0.5">{f.label}</p>
                        <p className="text-xs text-plum/50 leading-snug">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
              {activeTab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-primary-100 overflow-hidden mb-7"
                >
                  {specs.map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex items-center justify-between px-5 py-3.5 text-sm ${
                        i % 2 === 0 ? 'bg-white' : 'bg-primary-50/50'
                      }`}
                    >
                      <span className="text-plum/50 font-medium">{s.label}</span>
                      <span className="text-plum font-bold">{s.value}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                className={`flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-white shadow-glow-sm hover:shadow-glow hover:scale-[1.02] active:scale-100 transition-all text-sm ${
                  added ? 'bg-green-500' : 'bg-brand-gradient'
                }`}
              >
                <span className="icon text-base leading-none">
                  {added ? 'check_circle' : 'add_shopping_cart'}
                </span>
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <Link
                to="/contact"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold border-2 border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-400 transition-all text-center text-sm"
              >
                <span className="icon text-base">chat_bubble</span>
                Ask a Question
              </Link>
            </div>

            {/* Delivery note */}
            <div className="flex items-center gap-2.5 mt-5 text-xs text-plum/50 font-medium">
              <span className="icon text-primary-400 flex-shrink-0 text-base">local_shipping</span>
              Free shipping on orders above ₹999 · Delivered in 5–7 business days
            </div>
          </motion.div>
        </div>

        {/* ── How it works mini strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-brand-gradient rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-hero-mesh opacity-20 pointer-events-none" />
          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl">📦</div>
              <p className="font-bold text-white text-sm">1. Order Online</p>
              <p className="text-white/60 text-xs leading-relaxed max-w-[180px]">Pick your card, place your order in seconds</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl">✨</div>
              <p className="font-bold text-white text-sm">2. We Craft It</p>
              <p className="text-white/60 text-xs leading-relaxed max-w-[180px]">Premium materials, NFC chip pre-programmed</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl">🚀</div>
              <p className="font-bold text-white text-sm">3. Start Tapping</p>
              <p className="text-white/60 text-xs leading-relaxed max-w-[180px]">Receive, tap, and share your profile instantly</p>
            </div>
          </div>
        </motion.div>

        {/* ── Similar Products ── */}
        <SimilarProducts products={similar} />
      </div>
    </main>
  )
}
