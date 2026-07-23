import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'
import { PageLoader } from '../components/common/Loader'
import SimilarProducts from '../components/products/SimilarProducts'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import neonPodiumImg from '../assets/neon-podium.png'
import CustomCardForm from '../components/products/CustomCardForm'
import step1FullImg from '../assets/step1-full.png'
import step2FullImg from '../assets/step2-full.png'
import step3FullImg from '../assets/step3-full.png'

const styleColors = [
  { name: 'Black', cls: 'bg-black' },
  { name: 'Grey', cls: 'bg-[#4B4B4B]' },
  { name: 'Silver', cls: 'bg-[#E0E0E0]' },
  { name: 'Navy', cls: 'bg-[#1C2951]' },
  { name: 'Green', cls: 'bg-[#1B4332]' },
  { name: 'White', cls: 'bg-white' }
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImage, setActiveImage] = useState(null)
  const [added, setAdded] = useState(false)
  const [selectedColor, setSelectedColor] = useState('Black')

  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  function handleAddToCart() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  useEffect(() => {
    setLoading(true)
    setActiveImage(null)
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

  if (loading) return <div className="bg-[#0A0A0A] min-h-screen"><PageLoader /></div>

  if (error) return (
    <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-white font-bold text-xl mb-2">Product not found</p>
        <p className="text-white/50 text-sm mb-6">{error}</p>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#A64BDF] shadow-lg hover:shadow-xl transition-all"
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

  const getColorFilterClass = (colorName) => {
    switch (colorName) {
      case 'Grey': return '[filter:brightness(1.8)_grayscale(1)]'
      case 'Silver': return '[filter:brightness(3)_grayscale(1)]'
      case 'White': return '[filter:brightness(5)_grayscale(1)]'
      case 'Navy': return '[filter:brightness(2.5)_sepia(1)_hue-rotate(190deg)_saturate(3)_brightness(0.6)]'
      case 'Green': return '[filter:brightness(2.5)_sepia(1)_hue-rotate(90deg)_saturate(3)_brightness(0.6)]'
      case 'Black':
      default: return ''
    }
  }

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white font-sans overflow-x-hidden pb-20 pt-[140px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/60 mb-10 font-medium">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#A64BDF] font-semibold truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── LEFT: Images & Podium ── */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Vertical Thumbnails */}
            <div className="flex sm:flex-col gap-4 sm:gap-6 w-full sm:w-[100px] overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 order-2 sm:order-1 flex-shrink-0 mt-4 sm:mt-8">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveImage(img.url)
                    setSelectedColor('Black')
                  }}
                  className={`flex-shrink-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img.url
                    ? 'border-[#A64BDF] scale-105 shadow-[0_0_15px_rgba(166,75,223,0.3)]'
                    : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                    }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image with CSS Glowing Podium */}
            <div className="relative flex-1 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[550px] order-1 sm:order-2">

              {/* Static Neon Podium Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-20 sm:mt-32 z-10 w-[100%] sm:w-[90%] flex justify-center pointer-events-none">
                <img
                  src={neonPodiumImg}
                  alt="Podium"
                  className="w-full object-contain"
                />
              </div>

              {/* Product Image Static */}
              <img
                key={displayImage}
                src={displayImage}
                alt={product.name}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-16 sm:-mt-24 z-20 w-[280px] sm:w-[380px] object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.8)] transition-all duration-500 ${getColorFilterClass(selectedColor)}`}
              />
            </div>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="flex flex-col pt-4 sm:pt-10">

            {/* Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]"></span>
                NFC Digital Card
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-[44px] font-extrabold text-white leading-tight mb-2 tracking-tight">
              {product.name}
            </h1>

            <p className="text-white/60 text-sm mb-6">
              Share more. Connect smarter.
            </p>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex gap-0.5 text-[#FBBF24] text-lg">
                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <span className="text-white/40 text-xs font-medium ml-1">4.9 (33+ reviews)</span>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-lg">
              {product.description || 'Tapzy metal NFC cards are a premium NFC digital business card that helps you share your details, social links, and more instantly with a simple tap.'}
            </p>

            {/* Choose Style */}
            <div className="mb-10 flex gap-4 items-center">
              <h3 className="text-[#A64BDF] text-sm font-bold leading-tight">Choose<br />Your Style</h3>
              <div className="flex gap-3 sm:gap-5 ml-2">
                {styleColors.map(color => (
                  <div key={color.name} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setSelectedColor(color.name)}>
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[3px] transition-all duration-300 ${color.cls} ${selectedColor === color.name
                      ? 'border-[#A64BDF] scale-110 shadow-[0_0_15px_rgba(166,75,223,0.5)]'
                      : 'border-white/10 group-hover:border-white/30'
                      }`}
                    ></div>
                    <span className={`text-[9px] sm:text-[10px] font-medium transition-colors ${selectedColor === color.name ? 'text-white' : 'text-white/40'}`}>{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Row */}
            <div className="flex gap-6 sm:gap-12 mb-10 border-t border-b border-white/10 py-6">
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <span className="icon text-[28px] text-white font-light">contactless</span>
                <div>
                  <p className="text-white font-bold text-sm">NFC</p>
                  <p className="text-white/40 text-[10px]">Tap & Share</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <span className="icon text-[28px] text-white font-light">qr_code_2</span>
                <div>
                  <p className="text-white font-bold text-sm">QR Code</p>
                  <p className="text-white/40 text-[10px]">Scan & Connect</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <span className="icon text-[28px] text-white font-light">link</span>
                <div>
                  <p className="text-white font-bold text-sm">Instant</p>
                  <p className="text-white/40 text-[10px]">Via Link</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-3 mb-8">
              <span className="text-3xl sm:text-4xl font-bold text-white">₹ {Number(product.price).toLocaleString('en-IN')}/-</span>
              <span className="text-base sm:text-lg text-white/30 line-through">₹ {(Number(product.price) * 2).toLocaleString('en-IN', { maximumFractionDigits: 0 })}/-</span>
              <span className="text-[10px] sm:text-xs text-white/30 w-full sm:w-auto mt-1 sm:mt-0">Inclusive of all taxes.</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 sm:gap-4 mt-auto">
              <button onClick={handleAddToCart} className={`flex-[2] flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all text-sm sm:text-base ${added ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-[#A64BDF] hover:bg-[#8e3bc4] shadow-[0_4px_20px_rgba(166,75,223,0.3)] hover:shadow-[0_4px_25px_rgba(166,75,223,0.5)] hover:-translate-y-0.5'}`}>
                <span className="icon text-[20px]">{added ? 'check' : 'local_mall'}</span>
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button onClick={() => toggleWishlist(product)} className={`flex-1 flex items-center justify-center gap-2 px-2 sm:px-6 py-4 rounded-xl font-bold border border-white/20 transition-all text-sm sm:text-base ${product && isWishlisted(product._id) ? 'text-[#ff4d4d] border-[#ff4d4d] bg-[#ff4d4d]/10' : 'text-white hover:bg-white/5'}`}>
                <span className={`icon text-[20px] ${product && isWishlisted(product._id) ? 'icon-fill' : ''}`}>favorite</span>
                <span className="hidden sm:inline">Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Purple Banner ── */}
      <div className="w-full bg-[#A64BDF] py-5 mt-16 sm:mt-24 shadow-[0_0_30px_rgba(166,75,223,0.2)] relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-white text-xs sm:text-sm font-semibold gap-6">
          <div className="flex items-center gap-3">
            <span className="icon text-[22px]">local_shipping</span>
            Free Shipping on prepaid orders
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/30"></div>
          <div className="flex items-center gap-3">
            <span className="icon text-[22px]">published_with_changes</span>
            7-day easy returns
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/30"></div>
          <div className="flex items-center gap-3">
            <span className="icon text-[22px]">verified_user</span>
            1 year warranty
          </div>
        </div>
      </div>

      {/* ── Bottom Info ── */}
      <div className="max-w-[1151px] mx-auto px-4 mt-16 sm:mt-24 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">How do I customize / design my card?</h2>
        <p className="text-white text-[16px] md:text-[20px] lg:text-[24px] leading-relaxed lg:leading-[32px] font-medium font-['Poppins',_sans-serif]">
          Once you place your order, our design team will reach out to collect your details (your logo, name, designation, etc.) and share a design of your custom card for your approval.
        </p>
      </div>

      <CustomCardForm />

      {/* ── Get Started Today Section ── */}
      <div className="max-w-7xl mx-auto px-4 mt-20 mb-20">
        <div className="text-center mb-12">
          <p className="text-white tracking-[0.15em] text-xs sm:text-sm font-bold uppercase mb-4">GET STARTED TODAY</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">We Take Care Of The Heavy Lifting</h2>
          <p className="text-white/70 text-sm sm:text-base max-w-3xl mx-auto font-medium">
            No confusing tools. No design friction. From the first step to your final launch, we cover all the bases — so you can focus on running your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-24">
          {/* Step 1 Full Image */}
          <div className="w-full h-auto flex items-center justify-center">
            <img src={step1FullImg} alt="Step 1: Choose Your Smart Card" className="w-full h-auto rounded-3xl object-contain shadow-2xl" />
          </div>

          {/* Step 2 Full Image */}
          <div className="w-full h-auto flex items-center justify-center">
            <img src={step2FullImg} alt="Step 2: We Design It For You" className="w-full h-auto rounded-3xl object-contain shadow-2xl" />
          </div>

          {/* Step 3 Full Image */}
          <div className="w-full h-auto flex items-center justify-center">
            <img src={step3FullImg} alt="Step 3: Create Your Digital Profile" className="w-full h-auto rounded-3xl object-contain shadow-2xl" />
          </div>
        </div>

        {/* ── Specification Section ── */}
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#A64BDF] mb-12">Specification</h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left: Specs Table */}
            <div className="flex-1 w-full space-y-6">
              <div className="flex items-center gap-6 border-b border-white/10 pb-6">
                <span className="icon text-3xl text-white/50 w-8">layers</span>
                <span className="text-white/70 w-32 text-lg">Material</span>
                <span className="text-white font-semibold text-lg flex-1">{product?.specifications?.material || 'Metal'}</span>
              </div>
              <div className="flex items-center gap-6 border-b border-white/10 pb-6">
                <span className="icon text-3xl text-white/50 w-8">contactless</span>
                <span className="text-white/70 w-32 text-lg">Technology</span>
                <span className="text-white font-semibold text-lg flex-1">{product?.specifications?.technology || 'NFC'}</span>
              </div>
              <div className="flex items-center gap-6 border-b border-white/10 pb-6">
                <span className="icon text-3xl text-white/50 w-8">devices</span>
                <span className="text-white/70 w-32 text-lg">Compatibility</span>
                <span className="text-white font-semibold text-lg flex-1">{product?.specifications?.compatibility || 'All NFC-enabled devices'}</span>
              </div>
              <div className="flex items-center gap-6 border-b border-white/10 pb-6">
                <span className="icon text-3xl text-white/50 w-8">straighten</span>
                <span className="text-white/70 w-32 text-lg">Dimensions</span>
                <span className="text-white font-semibold text-lg flex-1">{product?.specifications?.dimensions || '163 x 255 mm'}</span>
              </div>
              <div className="flex items-center gap-6 pb-6">
                <span className="icon text-3xl text-white/50 w-8">water_drop</span>
                <span className="text-white/70 w-32 text-lg">Waterproof</span>
                <span className="text-white font-semibold text-lg flex-1">{product?.specifications?.waterproof || 'Yes'}</span>
              </div>
            </div>

            {/* Right: Dimensions Image Placeholder */}
            <div className="flex-1 w-full flex justify-center">
              <div className="relative w-full max-w-sm aspect-[2/3] border border-white/10 rounded-2xl bg-[#111] flex items-center justify-center shadow-2xl">
                {/* Dimensions markings overlay (will be replaced by user's image) */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full h-full border-t border-r border-white/20 relative">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-white/50 text-xs">86 mm</span>
                    <span className="absolute -right-10 top-1/2 -translate-y-1/2 text-white/50 text-xs rotate-90">54 mm</span>
                    <div className="w-full h-full bg-[#1A1A1A] rounded-xl flex items-center justify-center shadow-inner">
                      <span className="text-white/20 font-bold text-2xl tracking-wider">Tapzy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
