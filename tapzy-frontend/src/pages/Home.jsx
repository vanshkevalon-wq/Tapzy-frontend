import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import Hero from '../components/home/Hero'
import FeatureCards from '../components/home/FeatureCards'
import HowItWorks from '../components/home/HowItWorks'
import OrderGuide from '../components/home/OrderGuide'
import NfcBenefits from '../components/home/NfcBenefits'
import WhyTapzy from '../components/home/WhyTapzy'
import TopPicks from '../components/home/TopPicks'
import BrandTicker from '../components/home/BrandTicker'
import OneIdentity from '../components/home/OneIdentity'
import PvcSmartCards from '../components/home/PvcSmartCards'
import Testimonials from '../components/home/Testimonials'
import AppShowcase from '../components/home/AppShowcase'
import NewsletterCta from '../components/home/NewsletterCta'

/* ─────────────────────────────────────────
   MARQUEE  – infinite scrolling ticker
───────────────────────────────────────── */
const tickerItems = [
  '⚡ Instant Sharing', '📱 No App Needed', '🌍 Works Worldwide',
  '♻️ Eco-Friendly', '🔒 Privacy First', '🎨 Premium Designs',
  '📊 Tap Analytics', '🤝 10,000+ Pros', '⚡ Instant Sharing',
  '📱 No App Needed', '🌍 Works Worldwide', '♻️ Eco-Friendly',
]

function Marquee() {
  return (
    <div className="py-4 bg-primary-50 border-y border-primary-100 overflow-hidden w-full">
      <motion.div
        className="flex gap-10 whitespace-nowrap min-w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-bold text-primary-600 uppercase tracking-widest flex-shrink-0">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-primary-300 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function CountUp({ target, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const num = parseInt(target.replace(/\D/g, ''), 10)
    motionVal.set(0)
    const controls = animate(motionVal, num, { duration: 2, ease: 'easeOut' })
    const unsub = spring.on('change', v => setDisplay(Math.round(v).toLocaleString()))
    return () => { controls.stop(); unsub() }
  }, [inView])

  return <span ref={ref}>{display}{suffix}</span>
}

const stats = [
  { value: '10K', suffix: '+', label: 'Cards Delivered', icon: '📦' },
  { value: '500', suffix: '+', label: 'Happy Businesses', icon: '🏢' },
  { value: '50', suffix: '+', label: 'Countries Shipped', icon: '🌍' },
  { value: '99', suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
]

/* ─────────────────────────────────────────
   ALTERNATING FEATURE ROW
───────────────────────────────────────── */
const altFeatures = [
  {
    tag: 'Share Anything',
    title: 'Your Entire World, One Tap Away',
    body: 'Share contact details, social links, portfolios, meeting links, PDFs, and more. All from a single Tapzy NFC tap. Always up to date, never outdated.',
    bullets: ['Contact details', 'Social media profiles', 'Portfolio & brochures', 'Meeting & booking links'],
    visual: (
      <div className="relative w-full max-w-xs mx-auto px-6 pt-6 pb-4">
        {/* phone mockup */}
        <div className="relative w-48 h-80 mx-auto rounded-[2rem] bg-plum border-4 border-plum shadow-2xl overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-primary-900 to-plum flex flex-col items-center pt-8 gap-3 px-4">
            <div className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center text-white font-extrabold text-xl shadow-glow">T</div>
            <p className="text-white font-bold text-sm">Alex Johnson</p>
            <p className="text-white/50 text-xs">Product Designer · Tapzy</p>
            <div className="w-full mt-2 space-y-2">
              {['🔗 tapzy.io/alex', '💼 LinkedIn', '📸 Instagram', '📧 alex@tapzy.io'].map(l => (
                <div key={l} className="bg-white/10 rounded-xl px-3 py-1.5 text-xs text-white/80 font-medium">{l}</div>
              ))}
            </div>
          </div>
        </div>
        {/* floating "tapped" bubble — inside padding so it won't overflow */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-2 right-2 bg-white rounded-2xl shadow-card px-3 py-2 border border-primary-100 text-xs font-bold text-plum"
        >
          ✅ Profile Opened!
        </motion.div>
      </div>
    ),
  },
  {
    tag: 'Easy Networking',
    title: '3 Ways to Connect. You Choose',
    body: 'Tapzy meets people where they are. Whether they prefer a tap, a QR scan, or a quick link, you are always one moment away from a great first impression.',
    bullets: ['NFC Tap: no app, instant', 'QR Code: scan from any camera', 'Link share: email, WhatsApp, DM'],
    visual: (
      <div className="relative w-full max-w-sm mx-auto flex flex-col gap-4 py-4 overflow-hidden">
        {[
          { icon: '📱', method: 'NFC Tap', sub: 'Hold near phone', color: 'bg-primary-500' },
          { icon: '🔲', method: 'QR Code', sub: 'Scan anytime', color: 'bg-lavender-400' },
          { icon: '🔗', method: 'Share Link', sub: 'Via message or email', color: 'bg-primary-600' },
        ].map((m, i) => (
          <motion.div
            key={m.method}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-primary-100 shadow-card"
          >
            <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center text-2xl shadow-glow-sm`}>{m.icon}</div>
            <div>
              <p className="font-bold text-plum text-sm">{m.method}</p>
              <p className="text-plum/50 text-xs">{m.sub}</p>
            </div>
            <div className="ml-auto w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <span className="icon text-sm text-green-500" style={{ fontSize: '14px' }}>check</span>
            </div>
          </motion.div>
        ))}
      </div>
    ),
  },
]

function AltFeatureRow({ feat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const even = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
    >
      <div className={even ? 'order-1' : 'order-1 lg:order-2'}>
        <span className="inline-block text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-50 border border-primary-100 px-3 py-1 rounded-full mb-4">{feat.tag}</span>
        <h3 className="text-3xl font-extrabold text-plum mb-4 leading-tight">{feat.title}</h3>
        <p className="text-plum/55 text-sm leading-relaxed mb-6">{feat.body}</p>
        <ul className="space-y-2.5">
          {feat.bullets.map(b => (
            <li key={b} className="flex items-center gap-3 text-sm text-plum/70 font-medium">
              <span className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="icon text-primary-500" style={{ fontSize: '14px' }}>check</span>
              </span>
              {b}
            </li>
          ))}
        </ul>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-bold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.03] transition-all text-sm"
        >
          Get Your Card
          <span className="icon text-base">arrow_forward</span>
        </Link>
      </div>
      <div className={even ? 'order-2' : 'order-2 lg:order-1'}>
        {feat.visual}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   TESTIMONIALS & FAQ DATA
───────────────────────────────────────── */
const testimonials = [
  { name: 'Arjun Mehta', role: 'Startup Founder', company: 'TechVerse', text: "Tapzy changed how I network. One tap and they have my LinkedIn, website, and portfolio instantly.", avatar: 'AM', color: 'bg-primary-500' },
  { name: 'Priya Sharma', role: 'Marketing Director', company: 'BrandLabs', text: "Got 50 cards for our team. The design is premium and setup took 5 minutes. Everyone asks where we got them.", avatar: 'PS', color: 'bg-lavender-400' },
  { name: 'Rahul Verma', role: 'Freelance Designer', company: 'Self-employed', text: "I update my portfolio monthly. With Tapzy, my card always shows my latest work without reprinting anything.", avatar: 'RV', color: 'bg-primary-600' },
]

const faqs = [
  { q: 'What is an NFC business card?', a: 'An NFC business card contains a tiny chip that wirelessly shares your profile when tapped to a smartphone. No app required.' },
  { q: 'Does it work with iPhones?', a: 'Yes! Tapzy works with iPhone XS and newer (iOS 14+) and all modern Android devices.' },
  { q: 'Can I update my information later?', a: 'Absolutely. Update your digital profile anytime from your dashboard. Your physical card always shows the latest.' },
]

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08 }} className="border-b border-primary-100 last:border-0"
    >
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left font-semibold text-plum text-sm sm:text-base hover:text-primary-600 transition-colors gap-4"
      >
        <span>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${open ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-500'}`}
        >
          <span className="icon text-base">expand_more</span>
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28 }} className="overflow-hidden"
      >
        <p className="pb-5 text-plum/60 text-sm leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   STAT CARD  (hooks must be inside component)
───────────────────────────────────────── */
function StatCard({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm"
    >
      <span className="text-3xl mb-2">{stat.icon}</span>
      <p className="text-4xl lg:text-5xl font-extrabold text-white mb-1">
        <CountUp target={stat.value} suffix={stat.suffix} />
      </p>
      <p className="text-white/70 text-sm font-medium">{stat.label}</p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Marquee ticker */}
      <Marquee />

      {/* 3. How It Works (Simple Process) */}
      <HowItWorks />

      {/* 3.5 Top Picks from Tapzy (Bestsellers Section) */}
      <TopPicks />

      {/* Brand Logos Infinite Announcement Ticker (White Background) */}
      <BrandTicker />

      {/* One Identity Isn't Enough Section */}
      <OneIdentity />

      {/* 7. Why Tapzy — animated phone tap + bullets */}
      <WhyTapzy />

      {/* Tapzy PVC Smart Business Cards */}
      <PvcSmartCards />

      {/* Eco-Friendly Banner */}
      <section className="w-full bg-black py-8 md:py-16">
        <img 
          src="/eco-banner.png" 
          alt="Small Choices Big Impact - Every order funds the planting of one tree" 
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* App Showcase */}
      <AppShowcase />

      {/* Newsletter CTA */}
      <NewsletterCta />
    </main>
  )
}
