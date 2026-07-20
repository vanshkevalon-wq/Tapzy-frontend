import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoLocal from '../../assets/tapzy-logo.png'

const LOGO_URL = 'https://res.cloudinary.com/k4latagc/image/upload/v1784487298/tapzy/brand/tapzy-logo.png'

/* ─────────────────────────────────────────
   SLIDE DATA
───────────────────────────────────────── */
const slides = [
  {
    id: 'nfc',
    tag: 'Best Seller',
    tagColor: 'bg-primary-100 text-primary-700 border-primary-200',
    headline: ['One Tap.', 'Infinite', 'Impressions.'],
    gradientWord: 1,
    sub: 'Share your full profile: socials, portfolio, website, with a single tap. No paper. No friction. Pure you.',
    cta: { label: 'Shop NFC Cards', to: '/products' },
    glow: 'bg-primary-400/25',
  },
  {
    id: 'social',
    tag: 'New Launch',
    tagColor: 'bg-pink-50 text-pink-700 border-pink-200',
    headline: ['Introducing', 'Social NFC', 'Cards!'],
    gradientWord: 1,
    sub: 'Step into the future of networking with Tapzy Social NFC Cards. Effortlessly share your Instagram, Google Reviews, or YouTube with just a tap.',
    cta: { label: 'Explore Social Cards', to: '/products' },
    glow: 'bg-pink-400/20',
  },
  {
    id: 'standee',
    tag: 'For Business',
    tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
    headline: ['Elevate with', 'Smart NFC', 'Standee!'],
    gradientWord: 2,
    sub: 'Perfect for restaurants, gyms, salons, and stores. Just a tap away from sharing socials, reviews, and essential business info.',
    cta: { label: 'View Standee', to: '/products' },
    glow: 'bg-teal-400/20',
  },
]

/* ─────────────────────────────────────────
   NFC TAP RIPPLE
───────────────────────────────────────── */
function TapRipple() {
  return (
    <span className="relative flex items-center justify-center w-7 h-7">
      <motion.span
        className="absolute inset-0 rounded-full bg-primary-400"
        animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
      />
      <span className="w-3 h-3 rounded-full bg-primary-500 z-10" />
    </span>
  )
}

/* ─────────────────────────────────────────
   SLIDE 1 — Phone mockup (NFC card profile)
───────────────────────────────────────── */
function PhoneMockup() {
  return (
    <div className="relative flex items-end justify-center gap-4">
      {/* Back NFC card tilted */}
      <motion.div
        animate={{ rotate: [-8, -5, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-4 bottom-8 w-36 h-56 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-800 shadow-2xl opacity-80 overflow-hidden"
        style={{ transformOrigin: 'bottom center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 8.5C7.5 7 9.7 6 12 6s4.5 1 6 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.7"/>
            <path d="M8.5 11C9.6 9.8 10.7 9.2 12 9.2s2.4.6 3.5 1.8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="12" cy="14" r="1.5" fill="white"/>
          </svg>
        </div>
        <div className="absolute bottom-3 left-3">
          <p className="text-white/60 text-[8px] font-semibold tracking-widest uppercase mb-0.5">NFC Card</p>
          <p className="text-white font-extrabold text-base tracking-widest">TAPZY</p>
        </div>
      </motion.div>

      {/* Phone frame */}
      <div className="relative w-48 rounded-[2.2rem] bg-gray-900 shadow-2xl border-4 border-gray-800 overflow-hidden" style={{ height: '360px' }}>
        {/* status bar */}
        <div className="bg-gray-900 h-6 flex items-center justify-between px-4">
          <span className="text-white/60 text-[8px]">9:41</span>
          <div className="w-10 h-2.5 bg-gray-800 rounded-full" />
          <span className="icon text-white/60" style={{ fontSize: '10px' }}>wifi</span>
        </div>
        {/* screen content */}
        <div className="bg-gradient-to-b from-plum to-primary-900 h-full flex flex-col items-center pt-5 pb-3 px-3">
          {/* NFC signal top */}
          <div className="text-white/30 mb-3">
            <svg width="20" height="14" viewBox="0 0 24 16" fill="none">
              <path d="M2 8 C5 3, 10 1, 12 1 S19 3, 22 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
              <path d="M5 8 C7 5, 10 3.5, 12 3.5 S17 5, 19 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
              <path d="M8 8 C9.5 6, 11 5.5, 12 5.5 S14.5 6, 16 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9"/>
            </svg>
          </div>
          {/* avatar */}
          <div className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center text-white font-extrabold text-xl shadow-glow mb-2">T</div>
          {/* name */}
          <p className="text-white font-bold text-sm">Tapzy Cards</p>
          <p className="text-white/40 text-[10px] mb-3">tapzy.io/profile</p>
          {/* links */}
          <div className="w-full space-y-1.5">
            {[
              { label: 'Contact', icon: 'call', color: 'bg-primary-500/30' },
              { label: 'Instagram', icon: 'photo_camera', color: 'bg-pink-500/30' },
              { label: 'LinkedIn', icon: 'work', color: 'bg-blue-500/30' },
              { label: 'Website', icon: 'language', color: 'bg-green-500/30' },
            ].map(l => (
              <div key={l.label} className={`${l.color} rounded-xl px-3 py-2 flex items-center gap-2`}>
                <span className="icon text-white/80" style={{ fontSize: '12px' }}>{l.icon}</span>
                <span className="text-white/80 text-[10px] font-semibold">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating badges */}
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="absolute -top-2 -right-2 bg-white rounded-2xl shadow-card px-3 py-2 flex items-center gap-2 border border-primary-100"
      >
        <div className="w-7 h-7 rounded-xl bg-green-100 flex items-center justify-center">
          <span className="icon text-green-500" style={{ fontSize: '15px' }}>check_circle</span>
        </div>
        <div>
          <p className="text-xs font-bold text-plum leading-tight">Contact Saved!</p>
          <p className="text-[10px] text-plum/40">Just now</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        className="absolute -bottom-4 -left-2 bg-white rounded-2xl shadow-card px-3 py-2 flex items-center gap-2 border border-primary-100"
      >
        <div className="relative w-7 h-7 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
          <span className="icon text-white" style={{ fontSize: '15px' }}>nfc</span>
          <motion.div className="absolute inset-0 rounded-xl border-2 border-primary-400"
            animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }} />
        </div>
        <div>
          <p className="text-xs font-bold text-plum leading-tight">Tap to Share</p>
          <p className="text-[10px] text-plum/40">No app needed</p>
        </div>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   SLIDE 2 — Stacked Social Cards
───────────────────────────────────────── */
function SocialCardsMockup() {
  const cards = [
    { label: 'Instagram', bg: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500', icon: 'photo_camera', handle: '@yourbrand', sub: 'Tap to Follow' },
    { label: 'Google Review', bg: 'bg-gradient-to-br from-blue-500 to-green-500', icon: 'star', handle: 'Your Business', sub: 'Tap to Review' },
    { label: 'YouTube', bg: 'bg-gradient-to-br from-red-600 to-red-800', icon: 'play_circle', handle: '@yourchannel', sub: 'Tap to Subscribe' },
  ]
  return (
    <div className="relative flex items-center justify-center" style={{ width: 320, height: 300 }}>
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          animate={{ rotate: [(-12 + i * 12) - 1, -12 + i * 12 + 1, (-12 + i * 12) - 1] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          className={`absolute w-44 h-64 rounded-3xl ${card.bg} shadow-2xl overflow-hidden border-2 border-white/20`}
          style={{ left: i * 52 + 8, zIndex: i, top: i * 6 }}
        >
          {/* NFC chip */}
          <div className="absolute top-3 right-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 8.5C7.5 7 9.7 6 12 6s4.5 1 6 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8"/>
              <path d="M8.5 11C9.6 9.8 10.7 9.2 12 9.2s2.4.6 3.5 1.8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="12" cy="14" r="1.5" fill="white"/>
            </svg>
          </div>
          {/* logo placeholder */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <span className="icon text-white text-3xl">{card.icon}</span>
            </div>
            <p className="text-white font-extrabold text-xs mt-1 text-center leading-tight">YOUR<br/>LOGO</p>
          </div>
          {/* bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm px-3 py-2.5">
            <p className="text-white font-bold text-xs">{card.handle}</p>
            <p className="text-white/60 text-[10px]">{card.sub}</p>
          </div>
          {/* Tapzy badge */}
          <div className="absolute top-3 left-3 bg-white/20 rounded-lg px-1.5 py-0.5">
            <p className="text-white text-[8px] font-bold tracking-widest">TAPZY</p>
          </div>
        </motion.div>
      ))}

      {/* floating badge */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: 'spring' }}
        className="absolute -bottom-6 right-0 bg-white rounded-2xl shadow-card px-3 py-2 flex items-center gap-2 border border-pink-100 z-10"
      >
        <div className="w-7 h-7 rounded-xl bg-pink-100 flex items-center justify-center">
          <span className="icon text-pink-500" style={{ fontSize: '15px' }}>thumb_up</span>
        </div>
        <div>
          <p className="text-xs font-bold text-plum leading-tight">Boost Engagement</p>
          <p className="text-[10px] text-plum/40">3 platforms, 1 tap</p>
        </div>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   SLIDE 3 — NFC Standee (realistic acrylic)
───────────────────────────────────────── */

/* Proper QR code SVG — 3 finders + alignment + data modules, no overlaps */
function QRCodeSVG({ size = 110 }) {
  const S = 4   // module size
  const modules = [
    // data modules (avoid finder zones 0-6, 0-6 | 14-20,0-6 | 0-6,14-20 and alignment 14-18,14-18)
    // row 7 (timing)
    [7,0],[7,2],[7,4],[7,6],[7,8],[7,10],[7,12],
    // col 7 (timing)
    [0,7],[2,7],[4,7],[6,7],[8,7],[10,7],[12,7],
    // data area — hand-crafted realistic pattern
    [8,0],[8,2],[9,1],[9,3],[10,0],[10,2],[11,1],[12,2],
    [8,8],[9,8],[10,8],[11,8],[12,8],[12,10],[12,12],
    [8,9],[8,11],[9,10],[10,9],[10,11],[11,10],[11,12],
    [13,0],[13,2],[13,4],[14,1],[14,3],[15,0],[15,4],
    [16,1],[16,3],[17,0],[17,2],[18,1],[19,0],[19,2],[20,1],
    [13,8],[13,10],[13,12],[14,9],[14,11],[15,8],[15,10],[15,12],
    [16,9],[16,11],[17,8],[17,10],[18,9],[18,11],[19,10],[20,9],[20,11],
    [8,13],[9,14],[10,13],[10,15],[11,14],[11,16],[12,15],[12,17],
    [13,13],[13,15],[13,17],[14,14],[14,16],[15,13],[15,15],[15,17],
    [16,14],[16,16],[17,13],[17,15],[17,17],[18,14],[18,16],[19,13],[19,15],[20,14],[20,16],
    [8,14],[8,16],[9,15],[9,17],[10,16],[11,15],[11,17],[12,14],[12,16],
  ]
  const GRID = 21
  const viewBox = GRID * S
  return (
    <svg width={size} height={size} viewBox={`0 0 ${viewBox} ${viewBox}`} fill="none" style={{ display: 'block' }}>
      {/* white background */}
      <rect width={viewBox} height={viewBox} fill="white"/>

      {/* Finder TL */}
      <rect x="0" y="0" width={7*S} height={7*S} rx="2.5" fill="#1a0a2e"/>
      <rect x={S} y={S} width={5*S} height={5*S} rx="1.5" fill="white"/>
      <rect x={2*S} y={2*S} width={3*S} height={3*S} rx="1" fill="#1a0a2e"/>

      {/* Finder TR */}
      <rect x={14*S} y="0" width={7*S} height={7*S} rx="2.5" fill="#1a0a2e"/>
      <rect x={15*S} y={S} width={5*S} height={5*S} rx="1.5" fill="white"/>
      <rect x={16*S} y={2*S} width={3*S} height={3*S} rx="1" fill="#1a0a2e"/>

      {/* Finder BL */}
      <rect x="0" y={14*S} width={7*S} height={7*S} rx="2.5" fill="#1a0a2e"/>
      <rect x={S} y={15*S} width={5*S} height={5*S} rx="1.5" fill="white"/>
      <rect x={2*S} y={16*S} width={3*S} height={3*S} rx="1" fill="#1a0a2e"/>

      {/* Alignment pattern BR (col 16, row 16 center) */}
      <rect x={12*S} y={12*S} width={5*S} height={5*S} rx="1.5" fill="#1a0a2e"/>
      <rect x={13*S} y={13*S} width={3*S} height={3*S} rx="0.5" fill="white"/>
      <rect x={14*S} y={14*S} width={S} height={S} fill="#1a0a2e"/>

      {/* Data modules */}
      {modules.map(([r, c], i) => (
        <rect key={i} x={c*S} y={r*S} width={S} height={S} fill="#1a0a2e"/>
      ))}
    </svg>
  )
}

function StandeeMockup() {
  return (
    <div className="relative flex items-end justify-center select-none" style={{ width: 340, height: 380 }}>

      {/* ground shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-4 bg-black/20 rounded-full blur-2xl" />

      {/* tilt wrapper */}
      <motion.div
        animate={{ rotateY: [0, 3, 0], rotateX: [0, -1.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div style={{ transform: 'perspective(700px) rotateY(-12deg) rotateX(3deg)', transformOrigin: 'bottom center' }}>

          {/* ── ACRYLIC CARD BODY ── */}
          <div
            className="relative overflow-hidden flex flex-col items-center"
            style={{
              width: 190,
              height: 290,
              borderRadius: '22px 22px 4px 4px',
              background: 'linear-gradient(160deg, rgba(255,255,255,0.97) 0%, rgba(235,225,255,0.93) 45%, rgba(255,255,255,0.96) 100%)',
              boxShadow: '6px 10px 40px rgba(120,60,200,0.22), -2px 0 12px rgba(200,180,255,0.15), inset 0 1px 0 rgba(255,255,255,1)',
              border: '1.5px solid rgba(190,165,240,0.55)',
            }}
          >
            {/* glass sheen */}
            <div className="absolute top-0 left-0 right-0 h-2/5 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)', borderRadius: '22px 22px 0 0' }} />

            {/* subtle color tint bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(160,100,240,0.1) 0%, transparent 70%)' }} />

            {/* ── content ── */}
            <div className="relative flex flex-col items-center w-full px-5 pt-6 pb-5 h-full">

              {/* Tapzy logo — dark pill, same style as navbar */}
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  background: '#111111',
                  borderRadius: 14,
                  padding: '6px 14px',
                  lineHeight: 0,
                }}
              >
                <img
                  src={LOGO_URL}
                  onError={(e) => { e.currentTarget.src = logoLocal }}
                  alt="Tapzy"
                  width={88}
                  height={40}
                  style={{ display: 'block', width: 88, height: 40, objectFit: 'contain' }}
                  draggable={false}
                />
              </div>

              {/* QR code box */}
              <div
                className="rounded-2xl flex items-center justify-center mb-4"
                style={{
                  width: 130,
                  height: 130,
                  padding: 8,
                  background: 'white',
                  boxShadow: '0 2px 12px rgba(100,50,180,0.12)',
                  border: '1.5px solid rgba(140,80,200,0.18)',
                }}
              >
                <QRCodeSVG size={114} />
              </div>

              {/* Scan label */}
              <div className="flex flex-col items-center gap-1">
                <p className="text-[#4C1D95] font-bold text-[11px] tracking-widest uppercase">Tap or Scan</p>
                <p className="text-primary-500 font-extrabold text-[13px] tracking-wide">to Connect</p>
              </div>

              {/* bottom divider line */}
              <div className="absolute bottom-[44px] left-5 right-5 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(140,80,200,0.2), transparent)' }} />

              {/* tapzy.io url */}
              <p className="absolute bottom-3 text-[9px] font-semibold tracking-widest text-plum/35 uppercase">tapzy.in</p>
            </div>
          </div>

          {/* ── STANDEE NECK — narrow connector ── */}
          <div style={{
            width: 190,
            height: 6,
            background: 'linear-gradient(180deg, #c4b5e8 0%, #b8aad8 100%)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
          }} />

          {/* ── STANDEE BASE — wide foot ── */}
          <div
            className="flex items-center justify-center"
            style={{
              width: 190,
              height: 32,
              background: 'linear-gradient(180deg, #e0d7f5 0%, #c8bde0 60%, #b0a4cc 100%)',
              borderRadius: '0 0 14px 14px',
              boxShadow: '2px 8px 20px rgba(0,0,0,0.18)',
            }}
          >
            <p style={{ color: '#6e5f8a', fontSize: 7, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              POWERED BY TAPZY
            </p>
          </div>
        </div>
      </motion.div>

      {/* floating badge */}
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, type: 'spring', stiffness: 200 }}
        className="absolute top-6 -right-2 bg-white rounded-2xl shadow-card px-3 py-2 flex items-center gap-2 border border-teal-100 z-10"
      >
        <div className="w-7 h-7 rounded-xl bg-teal-100 flex items-center justify-center">
          <span className="icon text-teal-600" style={{ fontSize: '15px' }}>store</span>
        </div>
        <div>
          <p className="text-xs font-bold text-plum leading-tight">For Any Business</p>
          <p className="text-[10px] text-plum/40">Tap or Scan</p>
        </div>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   CARD VISUAL — switcher
───────────────────────────────────────── */
function CardVisual({ id }) {
  if (id === 'nfc')     return <PhoneMockup />
  if (id === 'social')  return <SocialCardsMockup />
  if (id === 'standee') return <StandeeMockup />
  return null
}

/* ─────────────────────────────────────────
   SLIDE VARIANTS
───────────────────────────────────────── */
const textVariants = {
  enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
}

const cardVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.94 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.94 }),
}

/* ─────────────────────────────────────────
   MAIN HERO EXPORT
───────────────────────────────────────── */
export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const currentRef = useRef(0)   // stable ref so timer never goes stale
  const timerRef = useRef(null)
  const pausedRef = useRef(false)
  const INTERVAL = 4500

  // keep ref in sync
  useEffect(() => { currentRef.current = current }, [current])

  const goTo = useCallback((idx, dir) => {
    setDirection(dir)
    setCurrent(idx)
    currentRef.current = idx
  }, [])

  const next = useCallback(() => {
    const idx = (currentRef.current + 1) % slides.length
    goTo(idx, 1)
  }, [goTo])

  const prev = useCallback(() => {
    const idx = (currentRef.current - 1 + slides.length) % slides.length
    goTo(idx, -1)
  }, [goTo])

  // single stable auto-advance — never re-created
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) next()
    }, INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [next])

  const pauseTimer  = useCallback(() => { pausedRef.current = true  }, [])
  const resumeTimer = useCallback(() => { pausedRef.current = false }, [])

  const slide = slides[current]

  return (
    <section
      className="relative overflow-hidden bg-offwhite min-h-[92vh] flex items-center"
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      {/* ── background blobs ── */}
      <motion.div className="absolute -top-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-primary-200/40 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute -bottom-16 -left-16 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-lavender-200/40 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,100vw)] h-[min(700px,100vw)] rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
        animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
      {/* dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-25"
        style={{ backgroundImage: 'radial-gradient(circle, #A64BDF22 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      {/* ── main content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: text ── */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id + '-text'}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="order-1"
            >
              {/* tag badge */}
              <div className="mb-6">
                <span className={`inline-flex items-center gap-2.5 border text-xs font-bold px-4 py-2 rounded-full tracking-wide ${slide.tagColor}`}>
                  <TapRipple />
                  {slide.tag} · Smart NFC · No app needed
                </span>
              </div>

              {/* headline */}
              <div className="mb-6">
                {slide.headline.map((word, i) => (
                  <span key={i}
                    className={`block text-5xl sm:text-6xl lg:text-[68px] font-extrabold leading-[1.05] tracking-tight ${
                      i === slide.gradientWord
                        ? 'bg-brand-gradient bg-clip-text text-transparent'
                        : 'text-plum'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>

              {/* sub */}
              <p className="text-base sm:text-lg text-plum/55 leading-relaxed mb-8 max-w-lg">
                {slide.sub}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to={slide.cta.to}
                  className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-brand-gradient shadow-glow hover:scale-[1.04] hover:shadow-glow transition-all duration-200"
                >
                  {slide.cta.label}
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
                    <span className="icon text-xl">arrow_forward</span>
                  </motion.span>
                </Link>
                <Link to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold border-2 border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-400 transition-all duration-200"
                >
                  How It Works
                </Link>
              </div>

              {/* social proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2.5">
                  {[['AM','bg-primary-500'],['SK','bg-lavender-400'],['RV','bg-primary-600'],['PD','bg-lavender-500'],['TN','bg-primary-400']].map(([l,c],i) => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 border-offwhite flex items-center justify-center text-xs font-bold text-white ${c}`}>
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_,i) => (
                      <span key={i} className="icon icon-fill text-yellow-400" style={{ fontSize: '14px' }}>star</span>
                    ))}
                  </div>
                  <p className="text-sm text-plum/60"><span className="font-bold text-plum">10,000+</span> professionals tapping daily</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── RIGHT: card visual ── */}
          <div className="order-2 relative flex justify-center lg:justify-end">
            {/* glow halo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div className={`w-64 h-64 rounded-full ${slide.glow} blur-3xl`}
                animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
            </div>

            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={slide.id + '-card'}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ position: 'relative' }}
              >
                {/* floating animation wrapper */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <CardVisual id={slide.id} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── SLIDER CONTROLS ── */}
        <div className="flex items-center justify-center lg:justify-start gap-6 mt-10 lg:mt-12">

          {/* prev */}
          <button onClick={prev} aria-label="Previous slide"
            className="w-10 h-10 rounded-full border-2 border-primary-200 text-primary-500 flex items-center justify-center hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-200"
          >
            <span className="icon text-xl">arrow_back</span>
          </button>

          {/* dots */}
          <div className="flex items-center gap-2.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-2.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
                style={{ width: i === current ? 32 : 10 }}
              >
                <span className={`absolute inset-0 rounded-full transition-colors duration-300 ${i === current ? 'bg-primary-500' : 'bg-primary-200'}`} />
                {i === current && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary-300 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                    key={current}
                  />
                )}
              </button>
            ))}
          </div>

          {/* next */}
          <button onClick={next} aria-label="Next slide"
            className="w-10 h-10 rounded-full border-2 border-primary-200 text-primary-500 flex items-center justify-center hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-200"
          >
            <span className="icon text-xl">arrow_forward</span>
          </button>

          {/* slide counter */}
          <span className="hidden sm:block text-xs font-bold text-plum/30 ml-1">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 52" fill="none" className="w-full">
          <path d="M0 52C360 12 720 0 1080 20C1260 30 1380 44 1440 52H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
