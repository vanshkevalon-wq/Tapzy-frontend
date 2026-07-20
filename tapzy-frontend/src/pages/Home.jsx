import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import Hero from '../components/home/Hero'
import FeatureCards from '../components/home/FeatureCards'
import HowItWorks from '../components/home/HowItWorks'
import OrderGuide from '../components/home/OrderGuide'
import NfcBenefits from '../components/home/NfcBenefits'
import WhyTapzy from '../components/home/WhyTapzy'
import FeaturedCategories from '../components/home/FeaturedCategories'

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
  { value: '50',  suffix: '+', label: 'Countries Shipped', icon: '🌍' },
  { value: '99',  suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
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

      {/* 3. Featured Categories — Buy Premium NFC Cards */}
      <FeaturedCategories />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Order Guide — Step-by-Step */}
      <OrderGuide />

      {/* 6. NFC Benefits — Boost Your Networking */}
      <NfcBenefits />

      {/* 7. Why Tapzy — animated phone tap + bullets */}
      <WhyTapzy />

      {/* 4. Animated Stats */}
      <section className="py-16 px-4 bg-brand-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1,1.3,1] }} transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1.2,1,1.2] }} transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>
      </section>

      {/* 5. Feature Cards Grid */}
      <FeatureCards />

      {/* 6. Alternating Feature Rows */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-28">
          {altFeatures.map((feat, i) => <AltFeatureRow key={feat.tag} feat={feat} index={i} />)}
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-50 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-lavender-50 rounded-full blur-3xl opacity-50 pointer-events-none"/>
        <div className="relative max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">Testimonials</span>
            <h2 className="text-4xl font-extrabold text-plum mt-2">Loved by professionals</h2>
            <p className="text-plum/50 mt-2 text-sm">Real stories from real tappers.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative bg-offwhite rounded-3xl p-7 border border-primary-100 hover:border-primary-200 hover:shadow-card-hover transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary-100/0 group-hover:bg-primary-100/40 blur-xl transition-all duration-500 pointer-events-none"/>
                <div className="absolute top-5 right-6 text-6xl text-primary-100 font-serif leading-none select-none">"</div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_,j) => (
                    <span key={j} className="icon icon-fill text-base text-yellow-400" style={{ fontSize: '16px' }}>star</span>
                  ))}
                </div>
                <p className="text-plum/65 text-sm leading-relaxed mb-6 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} text-white text-sm font-bold flex items-center justify-center shadow-glow-sm`}>{t.avatar}</div>
                  <div>
                    <p className="font-bold text-plum text-sm">{t.name}</p>
                    <p className="text-plum/40 text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-20 px-4 bg-offwhite">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">FAQ</span>
            <h2 className="text-4xl font-extrabold text-plum mt-2">Got questions?</h2>
            <p className="text-plum/50 mt-2 text-sm">Here are the ones we hear most.</p>
          </motion.div>
          <div className="bg-white rounded-3xl border border-primary-100 shadow-card px-7">
            {faqs.map(({ q, a }, i) => <FAQItem key={q} q={q} a={a} index={i} />)}
          </div>
          <div className="text-center mt-7">
            <Link to="/faq" className="inline-flex items-center gap-1.5 text-primary-500 font-bold text-sm hover:text-primary-700 transition-colors">
              See all FAQs
            <span className="icon text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-24 px-4 bg-brand-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh opacity-25 pointer-events-none"/>
        {/* decorative rings — kept well inside overflow:hidden parent */}
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full border border-white/10 pointer-events-none"/>
        <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full border border-white/10 pointer-events-none"/>
        <div className="absolute top-8 right-1/3 w-2.5 h-2.5 rounded-full bg-white/30 pointer-events-none"/>
        <div className="absolute bottom-10 left-1/4 w-2 h-2 rounded-full bg-white/20 pointer-events-none"/>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400" animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.2, repeat: Infinity }}/>
              Join 10,000+ professionals
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to tap into<br />the future?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Ditch the paper. Get a Tapzy NFC card and make every introduction unforgettable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/products"
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl font-bold text-primary-700 bg-white shadow-card hover:scale-[1.04] hover:shadow-card-hover transition-all"
              >
                Order Now
                <span className="icon text-xl">arrow_forward</span>
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-bold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all"
              >
                Talk to Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
