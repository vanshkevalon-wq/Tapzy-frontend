import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

/* ── SVG Icons ─────────────────────────────────────────────────────────── */
function IconCard() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="28" fill="#f9f0ff"/>
      <path d="M18 22h20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V24a2 2 0 0 1 2-2z" fill="#A64BDF" opacity=".15"/>
      <rect x="16" y="26" width="24" height="3" rx="1" fill="#A64BDF" opacity=".4"/>
      <rect x="16" y="22" width="24" height="4" rx="1" fill="#A64BDF"/>
      <rect x="16" y="31" width="8" height="2" rx="1" fill="#A64BDF" opacity=".5"/>
      <path d="M34 34c0-1.1.9-2 2-2s2 .9 2 2v4l1 .5c.6.3 1 .9 1 1.5v1H34v-1c0-.6.4-1.2 1-1.5l-.5-.25V34z" fill="#A64BDF"/>
      <path d="M30 32.5a1.5 1.5 0 0 1 3 0v4.5h-3v-4.5z" fill="#A64BDF" opacity=".7"/>
    </svg>
  )
}
function IconCart() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="28" fill="#f9f0ff"/>
      <path d="M16 18h2l3 12h12l2.5-8H21" stroke="#A64BDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="25" cy="33" r="1.5" fill="#A64BDF"/>
      <circle cx="33" cy="33" r="1.5" fill="#A64BDF"/>
      <path d="M21 22h14" stroke="#A64BDF" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function IconProfile() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="28" fill="#f9f0ff"/>
      <rect x="17" y="19" width="22" height="18" rx="2" fill="#A64BDF" opacity=".12"/>
      <rect x="17" y="19" width="22" height="18" rx="2" stroke="#A64BDF" strokeWidth="1.8"/>
      <circle cx="24" cy="26" r="3" fill="#A64BDF" opacity=".7"/>
      <rect x="29" y="24" width="7" height="1.5" rx="0.75" fill="#A64BDF" opacity=".5"/>
      <rect x="29" y="27" width="5" height="1.5" rx="0.75" fill="#A64BDF" opacity=".35"/>
      <rect x="20" y="31" width="14" height="1.5" rx="0.75" fill="#A64BDF" opacity=".3"/>
    </svg>
  )
}
function IconWifi() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="28" fill="#f9f0ff"/>
      <path d="M18 26c2.8-2.8 6.6-4.5 10.5-4.5S36.2 23.2 39 26" stroke="#A64BDF" strokeWidth="2" strokeLinecap="round" strokeOpacity=".35"/>
      <path d="M21 29c1.9-1.9 4.4-3 7-3s5.1 1.1 7 3" stroke="#A64BDF" strokeWidth="2" strokeLinecap="round" strokeOpacity=".6"/>
      <path d="M24 32c1-1 2.4-1.6 4-1.6s3 .6 4 1.6" stroke="#A64BDF" strokeWidth="2" strokeLinecap="round" strokeOpacity=".85"/>
      <circle cx="28" cy="35" r="1.8" fill="#A64BDF"/>
    </svg>
  )
}

/* ── Steps data ─────────────────────────────────────────────────────────── */
const steps = [
  {
    Icon: IconCard,
    title: 'Select Your Tapzy Card',
    body: (
      <>
        Browse our range of{' '}
        <Link to="/products" className="text-primary-600 font-semibold hover:underline">
          premium Tapzy NFC cards
        </Link>{' '}
        , PVC, Social, Metal, or Standee. Pick the one that fits your style, choose your preferences, and place your order in seconds.
      </>
    ),
  },
  {
    Icon: IconCart,
    title: 'Place Your Order',
    body: "Add your chosen Tapzy card to cart and proceed to checkout. Enter your delivery address and complete payment. Once your order is dispatched, we'll send your Tapzy dashboard login credentials directly via WhatsApp.",
  },
  {
    Icon: IconProfile,
    title: 'Set Up Your Profile',
    body: (
      <>
        Log in to your{' '}
        <strong className="text-plum font-semibold">Tapzy dashboard</strong>{' '}
        using the credentials sent via WhatsApp. Fill in your name, company, phone, email, social links, portfolio, and more. Everything is under your{' '}
        <Link to="/subscription-plans" className="text-primary-600 font-semibold hover:underline">
          subscription plan
        </Link>
        . Update it any time, no reprints needed.
      </>
    ),
  },
  {
    Icon: IconWifi,
    title: 'Start Tapping with Tapzy',
    body: "For NFC-enabled phones, hold your Tapzy card near the back of the phone. Your profile opens instantly, no app needed. For non-NFC phones, just scan the QR code printed on the card. One tap or scan, and you're connected forever.",
  },
]

/* ── Step card ──────────────────────────────────────────────────────────── */
function StepCard({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const { Icon } = step

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-4"
    >
      {/* icon */}
      <div className="mb-5">
        <Icon />
      </div>

      {/* step number dot + connector line */}
      <div className="flex items-center w-full mb-5 relative">
        <div className="flex-1 h-px bg-primary-100" />
        <div className="w-8 h-8 rounded-full bg-primary-500 text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0 shadow-glow-sm z-10">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="flex-1 h-px bg-primary-100" />
      </div>

      <h3 className="text-base font-extrabold text-plum mb-3">{step.title}</h3>
      <p className="text-sm text-plum/55 leading-relaxed">{step.body}</p>
    </motion.div>
  )
}

/* ── MAIN EXPORT ────────────────────────────────────────────────────────── */
export default function OrderGuide() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section className="py-20 px-4 bg-offwhite relative overflow-hidden">
      {/* subtle bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(166,75,223,0.05) 0%, transparent 60%)' }}
      />
      <div className="relative max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-full mb-4">
            How to Order
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-plum leading-tight">
            Step-by-Step Guide to<br className="hidden sm:block" />{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">Placing an Order!</span>
          </h2>
          <p className="text-plum/50 mt-3 text-sm max-w-md mx-auto">
            From picking your card to tapping it — we make the whole journey simple.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
