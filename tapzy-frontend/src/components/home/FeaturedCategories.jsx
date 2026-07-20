import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import api from '../../services/api'

/* ─────────────────────────────────────────
   Static category definitions
   (shown even when no products exist yet)
───────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'pvc',
    name: 'PVC Card',
    category: 'PVC Card',
    badge: 'Most Popular',
    badgeColor: 'bg-primary-100 text-primary-700',
    desc: 'Our PVC NFC card is a standard quality option, making everyday tasks like access and data sharing simple and practical.',
    highlights: ['Lightweight & durable', 'Full-colour printing', 'Instant tap sharing'],
    icon: '💳',
    gradient: 'from-primary-500/10 via-primary-100/30 to-offwhite',
    border: 'border-primary-200 hover:border-primary-400',
    accentColor: 'bg-primary-500',
    textAccent: 'text-primary-600',
    /* SVG card mockup */
    visual: (
      <div className="relative flex items-center justify-center h-40">
        {/* back card */}
        <div
          className="absolute w-32 h-20 rounded-xl shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #7a22a8 0%, #A64BDF 100%)',
            transform: 'rotate(-12deg) translateX(-18px) translateY(6px)',
          }}
        >
          <div className="absolute bottom-2 left-3 text-white/60 text-[7px] font-bold tracking-widest uppercase">NFC Card</div>
        </div>
        {/* front card */}
        <div
          className="relative w-36 h-22 rounded-xl shadow-2xl overflow-hidden"
          style={{
            width: 144, height: 88,
            background: 'linear-gradient(135deg, #A64BDF 0%, #B289D5 100%)',
          }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)' }} />
          {/* NFC waves */}
          <div className="absolute top-2 right-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 8.5C7.5 7 9.7 6 12 6s4.5 1 6 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7"/>
              <path d="M8.5 11C9.6 9.8 10.7 9.2 12 9.2s2.4.6 3.5 1.8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="14" r="1.5" fill="white"/>
            </svg>
          </div>
          {/* chip */}
          <div className="absolute top-3 left-3 w-7 h-5 rounded bg-white/20 border border-white/30 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-px w-4 h-3">
              {[...Array(9)].map((_, i) => <div key={i} className="bg-white/40 rounded-sm" />)}
            </div>
          </div>
          <div className="absolute bottom-2 left-3">
            <p className="text-white/50 text-[6px] font-semibold tracking-widest uppercase">Your Name</p>
            <p className="text-white font-extrabold text-[10px] tracking-widest">TAPZY</p>
          </div>
          <div className="absolute bottom-2 right-3 text-white/20 text-[8px] font-mono">logo</div>
        </div>
      </div>
    ),
  },
  {
    id: 'social',
    name: 'Social Cards',
    category: 'Social Card',
    badge: 'New Launch',
    badgeColor: 'bg-pink-100 text-pink-700',
    desc: 'Our Social Cards come in three variants: Instagram, Google Review, and YouTube. Crafted with PVC quality for longevity and reliability.',
    highlights: ['Instagram · Google · YouTube', 'One tap to follow/review', 'Fully customisable'],
    icon: '📱',
    gradient: 'from-pink-100/40 via-pink-50/20 to-offwhite',
    border: 'border-pink-200 hover:border-pink-400',
    accentColor: 'bg-gradient-to-br from-pink-500 to-orange-400',
    textAccent: 'text-pink-600',
    visual: (
      <div className="relative flex items-center justify-center h-40">
        {[
          { bg: 'from-yellow-400 via-pink-500 to-purple-600', icon: '📷', label: 'Instagram', off: { left: 4, top: 20, rotate: -14, z: 0 } },
          { bg: 'from-blue-500 to-green-500',                  icon: '⭐', label: 'Google',    off: { left: 48, top: 10, rotate: 2,  z: 1 } },
          { bg: 'from-red-600 to-red-800',                     icon: '▶',  label: 'YouTube',   off: { left: 92, top: 22, rotate: 12, z: 2 } },
        ].map((c, i) => (
          <div key={c.label}
            className={`absolute w-28 h-40 rounded-2xl bg-gradient-to-br ${c.bg} shadow-xl overflow-hidden border-2 border-white/20`}
            style={{ left: c.off.left, top: c.off.top, transform: `rotate(${c.off.rotate}deg)`, zIndex: c.off.z }}
          >
            <div className="absolute top-2 left-2 bg-white/20 rounded-md px-1 py-0.5 text-[7px] text-white font-bold tracking-widest">TAPZY</div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="text-2xl">{c.icon}</span>
              <span className="text-white font-bold text-[9px]">{c.label}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 py-1.5 px-2">
              <p className="text-white/70 text-[7px]">Tap to connect</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'standee',
    name: 'Smart NFC Standee',
    category: 'NFC Standee',
    badge: 'For Business',
    badgeColor: 'bg-teal-100 text-teal-700',
    desc: 'Our Smart NFC Standee is a complete solution for easy digital connections. Built for durability and simplicity, it\'s your must-have tool for smooth business interactions.',
    highlights: ['Restaurants, gyms, salons', 'QR + NFC in one', 'Custom branding ready'],
    icon: '🏢',
    gradient: 'from-teal-100/40 via-teal-50/20 to-offwhite',
    border: 'border-teal-200 hover:border-teal-400',
    accentColor: 'bg-teal-500',
    textAccent: 'text-teal-600',
    visual: (
      <div className="relative flex items-end justify-center h-40">
        <div className="relative" style={{ transform: 'perspective(400px) rotateY(-8deg)' }}>
          {/* card body */}
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              width: 108, height: 144,
              background: 'linear-gradient(160deg, rgba(255,255,255,0.97) 0%, rgba(220,210,255,0.9) 100%)',
              boxShadow: '4px 8px 24px rgba(120,60,200,0.2)',
              border: '1.5px solid rgba(180,160,230,0.5)',
            }}
          >
            <div className="flex flex-col items-center px-2 pt-3 pb-2 h-full gap-1">
              {/* mini logo pill */}
              <div className="bg-[#111] rounded-lg px-2 py-0.5 mb-1">
                <p className="text-white text-[7px] font-extrabold tracking-widest">TAPZY</p>
              </div>
              {/* QR */}
              <div className="bg-white rounded-lg p-1 w-14 h-14 flex items-center justify-center border border-gray-100">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <rect width="44" height="44" fill="white"/>
                  <rect x="0" y="0" width="16" height="16" rx="2" fill="#1a0a2e"/>
                  <rect x="2" y="2" width="12" height="12" rx="1" fill="white"/>
                  <rect x="4" y="4" width="8" height="8" rx="0.5" fill="#1a0a2e"/>
                  <rect x="28" y="0" width="16" height="16" rx="2" fill="#1a0a2e"/>
                  <rect x="30" y="2" width="12" height="12" rx="1" fill="white"/>
                  <rect x="32" y="4" width="8" height="8" rx="0.5" fill="#1a0a2e"/>
                  <rect x="0" y="28" width="16" height="16" rx="2" fill="#1a0a2e"/>
                  <rect x="2" y="30" width="12" height="12" rx="1" fill="white"/>
                  <rect x="4" y="32" width="8" height="8" rx="0.5" fill="#1a0a2e"/>
                  <rect x="18" y="18" width="4" height="4" fill="#1a0a2e"/>
                  <rect x="22" y="22" width="4" height="4" fill="#1a0a2e"/>
                  <rect x="26" y="18" width="4" height="4" fill="#1a0a2e"/>
                  <rect x="18" y="26" width="4" height="4" fill="#1a0a2e"/>
                  <rect x="28" y="20" width="4" height="4" fill="#1a0a2e"/>
                  <rect x="32" y="28" width="8" height="8" rx="1" fill="#1a0a2e"/>
                  <rect x="34" y="30" width="4" height="4" rx="0.5" fill="white"/>
                  <rect x="35" y="31" width="2" height="2" fill="#1a0a2e"/>
                  <rect x="20" y="32" width="4" height="4" fill="#1a0a2e"/>
                </svg>
              </div>
              <p className="text-[7px] font-bold text-purple-800 tracking-widest uppercase">Tap or Scan</p>
              <p className="text-[8px] font-extrabold text-primary-500">to Connect</p>
            </div>
          </div>
          {/* base */}
          <div className="h-4 rounded-b-xl" style={{ width: 108, background: 'linear-gradient(180deg,#c4b5e8,#b0a4cc)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'metal',
    name: 'Metal Card',
    category: 'Metal Card',
    badge: 'Premium',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    desc: 'Our Metal NFC card is a premium quality choice, offering advanced technology and a stylish, high-quality metal design that commands attention.',
    highlights: ['Stainless steel finish', 'Laser engraved', 'Lifetime durability'],
    icon: '✨',
    gradient: 'from-yellow-50/60 via-gray-50/30 to-offwhite',
    border: 'border-yellow-200 hover:border-yellow-400',
    accentColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    textAccent: 'text-yellow-700',
    visual: (
      <div className="relative flex items-center justify-center h-40">
        {/* shadow card */}
        <div
          className="absolute w-36 h-22 rounded-xl shadow-2xl"
          style={{
            width: 144, height: 90,
            background: 'linear-gradient(135deg, #6b6b6b 0%, #9a9a9a 50%, #6b6b6b 100%)',
            transform: 'rotate(8deg) translateX(14px) translateY(-10px)',
          }}
        >
          <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)' }} />
          <div className="absolute bottom-2 right-3 text-white/20 text-[7px] font-bold tracking-widest">Your Name</div>
        </div>
        {/* front metal card */}
        <div
          className="relative rounded-xl overflow-hidden shadow-2xl"
          style={{
            width: 148, height: 92,
            background: 'linear-gradient(135deg, #b0b0b0 0%, #e8e8e8 30%, #c0c0c0 55%, #f0f0f0 75%, #a8a8a8 100%)',
          }}
        >
          {/* sheen */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)' }} />
          {/* NFC waves */}
          <div className="absolute top-2 right-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 8.5C7.5 7 9.7 6 12 6s4.5 1 6 2.5" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7"/>
              <path d="M8.5 11C9.6 9.8 10.7 9.2 12 9.2s2.4.6 3.5 1.8" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="14" r="1.5" fill="#666"/>
            </svg>
          </div>
          {/* chip */}
          <div className="absolute top-3 left-3 w-8 h-6 rounded border border-gray-400/40 bg-gradient-to-br from-yellow-200/50 to-yellow-400/30 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-px w-5 h-4">
              {[...Array(9)].map((_, i) => <div key={i} className="bg-yellow-600/30 rounded-sm" />)}
            </div>
          </div>
          <div className="absolute bottom-2 left-3">
            <p className="text-gray-500 text-[6px] font-semibold tracking-widest uppercase">Your Name</p>
            <p className="text-gray-700 font-extrabold text-[10px] tracking-widest">TAPZY</p>
          </div>
          <div className="absolute bottom-2 right-3 text-gray-400 text-[7px] font-bold tracking-widest">logo</div>
        </div>
      </div>
    ),
  },
]

/* ─────────────────────────────────────────
   CATEGORY CARD
───────────────────────────────────────── */
function CategoryCard({ cat, productId, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const navigate = useNavigate()

  // If a matching product exists, go to its detail page; else filter by category on /products
  const href = productId ? `/products/${productId}` : `/products?category=${encodeURIComponent(cat.category)}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={href}
        className={`group relative flex flex-col bg-white rounded-3xl border-2 ${cat.border} shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden h-full`}
      >
        {/* gradient bg accent */}
        <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

        {/* badge */}
        <div className="relative px-6 pt-5 pb-0 flex items-center justify-between">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${cat.badgeColor}`}>
            {cat.badge}
          </span>
          <motion.div
            className={`w-8 h-8 rounded-full ${cat.accentColor} flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-glow-sm`}
            whileHover={{ scale: 1.15 }}
          >
            <span className="icon text-base">arrow_forward</span>
          </motion.div>
        </div>

        {/* visual */}
        <div className="relative px-4 py-2 flex items-center justify-center overflow-hidden">
          {cat.visual}
        </div>

        {/* text */}
        <div className="relative px-6 pb-6 flex flex-col flex-1 gap-2">
          <h3 className={`text-lg font-extrabold text-plum group-hover:${cat.textAccent} transition-colors duration-200`}>
            {cat.name}
          </h3>
          <p className="text-plum/55 text-xs leading-relaxed flex-1">
            {cat.desc}
          </p>
          {/* highlights */}
          <ul className="mt-2 space-y-1.5">
            {cat.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-xs text-plum/60 font-medium">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${cat.accentColor}`}>
                  <span className="icon text-white" style={{ fontSize: '10px' }}>check</span>
                </span>
                {h}
              </li>
            ))}
          </ul>

          {/* cta */}
          <div className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold ${cat.textAccent} group-hover:gap-2.5 transition-all duration-200`}>
            Shop Now
            <span className="icon text-sm">arrow_forward</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function FeaturedCategories() {
  const [productMap, setProductMap] = useState({}) // category → first product _id
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    api.get('/products')
      .then(({ data }) => {
        // Build a map: category name → first product _id for that category
        const map = {}
        data.forEach((p) => {
          if (p.category && !map[p.category]) {
            map[p.category] = p._id
          }
        })
        setProductMap(map)
      })
      .catch(() => {})
  }, [])

  return (
    <section className="py-20 px-4 bg-offwhite relative overflow-hidden">
      {/* subtle background blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-100/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-lavender-100/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-full mb-4">
            Our Products
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-plum leading-tight mb-3">
            Buy Premium NFC<br className="hidden sm:block" /> Business Cards
          </h2>
          <p className="text-plum/50 text-base max-w-xl mx-auto leading-relaxed">
            Tap once. Share everything. Choose the card that fits your style and workflow.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              productId={productMap[cat.category]}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-brand-gradient shadow-glow hover:scale-[1.03] hover:shadow-glow transition-all"
          >
            View All Products
            <span className="icon text-xl">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
