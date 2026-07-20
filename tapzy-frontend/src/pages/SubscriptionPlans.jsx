import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Check icon ─────────────────────────────────────────────────────────── */
function Check({ color = '#A64BDF' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="9" cy="9" r="9" fill={color} opacity=".15"/>
      <path d="M5.5 9l2.5 2.5 4.5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function Cross() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="9" cy="9" r="9" fill="#e5e7eb" opacity=".5"/>
      <path d="M6 6l6 6M12 6l-6 6" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Plan data ──────────────────────────────────────────────────────────── */
const plans = [
  {
    id: 'free',
    name: 'Starter',
    tagline: 'Get started for free',
    price: null,
    priceLabel: 'Free Forever',
    badge: null,
    dark: true,
    bg: 'bg-[#0f172a]',
    textMain: 'text-white',
    textSub: 'text-white/60',
    checkColor: '#a78bfa',
    ctaClass: 'bg-primary-500 text-white hover:bg-primary-600',
    features: [
      { label: 'Basic Profile Page', available: true },
      { label: 'Social Media Links (up to 3)', available: true },
      { label: 'Website Link', available: true },
      { label: 'Enquiry / Contact Form', available: true },
      { label: 'Add to Contact Button', available: true },
      { label: 'Business Hours', available: true },
      { label: 'Terms & Condition Page', available: true },
      { label: 'Privacy Policy Page', available: true },
      { label: 'Tapzy Branding on Profile', available: true },
      { label: 'Premium Templates', available: false },
      { label: 'Photo & Video Gallery', available: false },
      { label: 'Detailed Analytics', available: false },
      { label: 'Custom Domain', available: false },
      { label: 'Priority Support', available: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Most popular for professionals',
    price: '₹499',
    priceLabel: 'per year',
    badge: 'Most Popular',
    dark: true,
    bg: 'bg-[#1a0a2e]',
    textMain: 'text-white',
    textSub: 'text-white/60',
    checkColor: '#fbbf24',
    ctaClass: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a0a2e] font-extrabold hover:from-yellow-300',
    features: [
      { label: 'All Starter features', available: true },
      { label: 'Unlimited Social Media Links', available: true },
      { label: 'Premium Profile Templates', available: true },
      { label: 'Photo & Video Gallery', available: true },
      { label: 'Detailed Tap Analytics', available: true },
      { label: 'Remove Tapzy Branding', available: true },
      { label: 'Custom Profile URL', available: true },
      { label: 'Product / Services Showcase', available: true },
      { label: 'Testimonials Section', available: true },
      { label: 'Priority WhatsApp Support', available: true },
      { label: 'Multiple Profiles (up to 3)', available: true },
      { label: 'Custom Domain', available: false },
      { label: 'Dedicated Account Manager', available: false },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For teams & enterprises',
    price: '₹1,999',
    priceLabel: 'per year',
    badge: 'Best Value',
    dark: false,
    bg: 'bg-white',
    textMain: 'text-plum',
    textSub: 'text-plum/55',
    checkColor: '#A64BDF',
    ctaClass: 'bg-brand-gradient text-white hover:shadow-glow',
    features: [
      { label: 'All Pro features', available: true },
      { label: 'Unlimited Profiles', available: true },
      { label: 'Custom Domain', available: true },
      { label: 'Team Management Dashboard', available: true },
      { label: 'Bulk Card Ordering', available: true },
      { label: 'Dedicated Account Manager', available: true },
      { label: 'White-label Option', available: true },
      { label: 'API Access', available: true },
      { label: 'Advanced Analytics & Reports', available: true },
      { label: 'SLA-backed Support', available: true },
    ],
  },
]

/* ── Why we charge FAQ ──────────────────────────────────────────────────── */
const whyItems = [
  {
    q: 'Why do we charge a subscription?',
    a: 'Running real-time profile servers, Cloudinary storage, NFC infrastructure, and WhatsApp support costs money. A small annual fee lets us keep the platform fast, secure, and constantly improving, without ads or selling your data.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'You can upgrade at any time and the new features activate immediately. Downgrading takes effect at the end of your current billing cycle. Note: downgrading mid-cycle isn\'t available.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI, all major credit/debit cards, net banking, and wallets via Razorpay. All transactions are secure and encrypted.',
  },
  {
    q: 'Is there a free trial for paid plans?',
    a: 'Our Starter plan is free forever and gives you a solid feel of the platform. Paid plans don\'t have a separate trial, but you can start with Starter and upgrade whenever you\'re ready.',
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-primary-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-semibold text-plum text-sm sm:text-base group-hover:text-primary-600 transition-colors">{item.q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${open ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-500'}`}
        >
          <span className="icon text-base">expand_more</span>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-plum/60 text-sm leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Plan card ──────────────────────────────────────────────────────────── */
function PlanCard({ plan, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-3xl overflow-hidden border-2 ${
        plan.id === 'pro'
          ? 'border-yellow-400 shadow-[0_0_40px_rgba(251,191,36,0.25)]'
          : plan.id === 'business'
          ? 'border-primary-200 shadow-card-hover'
          : 'border-white/10 shadow-lg'
      } ${plan.bg}`}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div className={`absolute top-0 left-0 right-0 flex justify-center`}>
          <span className={`text-[10px] font-extrabold px-5 py-1 tracking-widest uppercase rounded-b-xl ${
            plan.id === 'pro' ? 'bg-yellow-400 text-[#1a0a2e]' : 'bg-primary-500 text-white'
          }`}>
            {plan.badge}
          </span>
        </div>
      )}

      <div className={`flex flex-col flex-1 p-7 ${plan.badge ? 'pt-9' : ''}`}>
        {/* Plan name */}
        <div className="mb-5">
          <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${
            plan.id === 'pro' ? 'text-yellow-400' : plan.textSub
          }`}>{plan.tagline}</p>
          <h3 className={`text-2xl font-extrabold ${plan.textMain}`}>{plan.name.toUpperCase()}</h3>
        </div>

        {/* Price */}
        <div className="mb-6">
          {plan.price ? (
            <div className="flex items-baseline gap-1">
              <span className={`text-5xl font-extrabold ${plan.id === 'pro' ? 'text-yellow-400' : plan.textMain}`}>
                {plan.price}
              </span>
              <span className={`text-sm font-medium ${plan.textSub}`}>/ {plan.priceLabel}</span>
            </div>
          ) : (
            <p className={`text-3xl font-extrabold ${plan.textMain}`}>{plan.priceLabel}</p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-7">
          {plan.features.map((f) => (
            <li key={f.label} className="flex items-start gap-2.5">
              {f.available ? <Check color={plan.checkColor} /> : <Cross />}
              <span className={`text-sm leading-snug ${f.available ? plan.textMain : 'text-gray-400 line-through'}`}>
                {f.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className={`w-full text-center py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] ${plan.ctaClass}`}
        >
          {plan.price ? 'Get Started' : 'Start Free'}
        </Link>
      </div>
    </motion.div>
  )
}

/* ── MAIN PAGE EXPORT ───────────────────────────────────────────────────── */
export default function SubscriptionPlans() {
  return (
    <main className="bg-offwhite min-h-screen">
      {/* ── Hero band ── */}
      <div className="relative overflow-hidden bg-[#0f172a] py-20 px-4">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(166,75,223,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(99,102,241,0.12) 0%, transparent 50%)' }}
        />
        {/* animated rings */}
        <motion.div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-white/5 pointer-events-none"
          animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border border-white/5 pointer-events-none"
          animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400"
                animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.2, repeat: Infinity }}/>
              No hidden fees. Cancel anytime.
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Choose Your Perfect<br />
              <span className="bg-gradient-to-r from-primary-400 to-yellow-400 bg-clip-text text-transparent">
                Pricing Plan
              </span>
            </h1>
            <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed">
              Remember, you can upgrade your plan at any time to access more features and benefits. However, downgrading to a lower tier during the subscription period isn't possible. So choose wisely.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Plans ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">

        {/* "Why we charge" — always visible */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 mt-4"
        >
          <div className="bg-white rounded-3xl border border-primary-100 shadow-card p-6 sm:p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="icon text-primary-600 text-xl">help_outline</span>
              </div>
              <h3 className="font-extrabold text-plum text-base sm:text-lg">Why we charge for subscription</h3>
            </div>
            <p className="text-sm text-plum/60 leading-relaxed">
              Running real-time profile servers, cloud storage, NFC infrastructure, and WhatsApp support has real costs.
              A small annual fee lets us keep the platform fast, reliable, and ad-free,
              <strong className="text-plum/80"> without ever selling your data.</strong> We believe in honest pricing over hidden monetisation.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: 'cloud', label: 'Cloud Infrastructure', desc: 'Fast, secure servers 24/7' },
                { icon: 'support_agent', label: 'WhatsApp Support', desc: 'Real humans, real help' },
                { icon: 'lock', label: 'Your Data is Safe', desc: 'Never sold, never shared' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-2.5 bg-primary-50 rounded-2xl p-3 border border-primary-100">
                  <span className="icon text-primary-500 text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-plum">{item.label}</p>
                    <p className="text-[11px] text-plum/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => <PlanCard key={plan.id} plan={plan} index={i} />)}
        </div>

        {/* Compare note */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-xs text-plum/35 mt-8 font-medium"
        >
          All plans include a dedicated Tapzy NFC card, QR code, and a shareable profile link.
          Prices shown are exclusive of GST.
        </motion.p>
      </div>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 bg-white border-t border-primary-50">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl font-extrabold text-plum mt-2">Questions about plans?</h2>
          </motion.div>
          <div className="bg-offwhite rounded-3xl border border-primary-100 shadow-card px-7">
            {whyItems.map((item, i) => <FAQItem key={i} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 px-4 bg-brand-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh opacity-25 pointer-events-none"/>
        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-extrabold text-white mb-3">Still not sure which plan?</h2>
            <p className="text-white/70 text-sm mb-7 max-w-md mx-auto">
              Start with Starter. It's free forever. Upgrade when you need more power.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-primary-700 bg-white shadow-card hover:scale-[1.03] transition-all"
              >
                Talk to Us
                <span className="icon text-base">chat_bubble</span>
              </Link>
              <Link to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-all"
              >
                Browse Cards
                <span className="icon text-base">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
