import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const features = [
  'Premium PVC NFC Business Card',
  'Personalized Digital Profile',
  'Tap & QR Code Sharing',
  'Save Contact in One Click',
  'Unlimited Contact Sharing',
  'Website Link',
  'WhatsApp Integration',
  'Email & Phone',
  'Social Media Links',
  'Google Maps',
  'Payment Links',
  'Products & Services Showcase',
  'Photo Gallery',
  'Video Gallery',
  'Testimonials',
  'Contact Form',
  'Business Hours',
  'Custom Profile URL',
  'QR Code Included',
  'Works Without NFC',
  'Android & iPhone Compatible',
  'Card Design Customization',
  'Secure Cloud Hosting',
  'Future Profile Updates',
]

const perfectFor = [
  { icon: 'store',            label: 'Business Owners' },
  { icon: 'rocket_launch',    label: 'Entrepreneurs' },
  { icon: 'trending_up',      label: 'Sales Pros' },
  { icon: 'medical_services', label: 'Doctors' },
  { icon: 'psychology',       label: 'Consultants' },
  { icon: 'brush',            label: 'Freelancers' },
  { icon: 'groups',           label: 'Agencies' },
  { icon: 'school',           label: 'Students' },
]

const trust = [
  'One-Time Payment',
  'No Hidden Charges',
  'Lifetime Digital Profile',
  'Eco-Friendly',
  'Secure Platform',
]

function CheckIcon() {
  return (
    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-brand-gradient">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5l2 2.5 4-4.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

export default function SubscriptionPlans() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0D0718]">

      {/* ── Ambient background blobs ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] opacity-30 bg-[radial-gradient(circle_at_top_right,#A64BDF_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-20 bg-[radial-gradient(circle_at_bottom_left,#7a22a8_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-20">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 border border-purple-500/40 text-purple-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase bg-purple-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Simple Pricing
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-purple-300 to-primary-500 bg-clip-text text-transparent">
              Tapzy Card
            </span>
          </h1>

          <p className="text-white/50 text-base max-w-lg mx-auto">
            Everything you need to build a professional digital identity —
            with a single one-time payment.
          </p>
        </motion.div>

        {/* ── Pricing card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="relative rounded-3xl bg-gradient-to-br from-[#1a0a2e] via-[#160820] to-[#0f051a] border border-purple-500/50 shadow-[0_0_0_1px_rgba(166,75,223,0.15),0_32px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(166,75,223,0.15)]"
        >
          {/* Top gradient strip */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-primary-500 via-purple-300 to-primary-500" />

          {/* Badge */}
          <div className="flex justify-center pt-6">
            <span className="text-xs font-extrabold tracking-widest uppercase text-white px-5 py-1.5 rounded-full bg-brand-gradient">
              🔥 BEST VALUE
            </span>
          </div>

          <div className="px-8 sm:px-12 pt-7 pb-10">

            {/* Plan name */}
            <div className="text-center mb-8">
              <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">
                One-Time Payment
              </p>
              <h2 className="text-white text-2xl sm:text-3xl font-extrabold mb-7 leading-snug">
                Tapzy NFC Digital Business Card
              </h2>

              {/* Price */}
              <div className="flex items-end justify-center gap-1 mb-4">
                <span className="text-white/60 text-2xl font-bold self-start mt-3">₹</span>
                <span className="font-extrabold text-white leading-none text-7xl tracking-tighter">
                  1,250
                </span>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap justify-center gap-2">
                {['One-Time Payment', 'No Monthly Fees', 'Lifetime Digital Profile'].map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px my-8 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            {/* What's Included */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-xs font-extrabold tracking-widest uppercase px-2 text-purple-300">
                  ✦ What's Included
                </span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-3 group">
                    <CheckIcon />
                    <span className="text-sm font-medium text-white/85">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px my-8 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            {/* Perfect For */}
            <div className="mb-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-xs font-extrabold tracking-widest uppercase px-2 text-purple-300">
                  ✦ Perfect For
                </span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {perfectFor.map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 group cursor-default">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 bg-purple-500/15 border border-purple-500/30">
                      <span className="icon text-purple-300 text-xl">{icon}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-white/55 text-center leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/products"
              className="group w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-base font-extrabold text-white bg-brand-gradient shadow-glow hover:scale-[1.02] transition-all duration-200"
            >
              Get Your Card
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="icon text-xl">arrow_forward</span>
              </motion.span>
            </Link>

            <p className="text-center text-white/30 text-xs mt-3">
              Need Bulk Orders?{' '}
              <Link to="/contact" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
                Contact Sales
              </Link>
            </p>
          </div>
        </motion.div>

        {/* ── Trust strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-5"
        >
          {trust.map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="rgba(166,75,223,0.25)"/>
                <path d="M3.5 7l2.5 2.5 4.5-5" stroke="#c084fc" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-semibold text-white/40">{t}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </main>
  )
}
