import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── SVG Icons (no emoji dependency) ─────────────────────────────────────── */
function IconPhone({ color = 'white', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill={color}/>
    </svg>
  )
}
function IconMail({ color = 'white', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill={color}/>
    </svg>
  )
}
function IconLink({ color = 'white', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3.9 12c0-1.7 1.4-3.1 3.1-3.1h4V7H7C4.2 7 2 9.2 2 12s2.2 5 5 5h4v-1.9H7c-1.7 0-3.1-1.4-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.7 0 3.1 1.4 3.1 3.1s-1.4 3.1-3.1 3.1h-4V17h4c2.8 0 5-2.2 5-5s-2.2-5-5-5z" fill={color}/>
    </svg>
  )
}
function IconCamera({ color = 'white', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4z" fill={color}/>
      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" fill={color}/>
    </svg>
  )
}
function IconFinger({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z" fill="#A64BDF"/>
    </svg>
  )
}
function IconNFC({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 8.5C7.5 7 9.7 6 12 6s4.5 1 6 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M8.5 11C9.6 9.8 10.7 9.2 12 9.2s2.4.6 3.5 1.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.85"/>
      <circle cx="12" cy="14" r="1.5" fill="white"/>
    </svg>
  )
}

/* ── Isometric 3-D Platform ──────────────────────────────────────────────── */
function IsoPlatform({ children, topColor = '#3b82f6', midColor = '#1d4ed8', darkColor = '#1e3a8a' }) {
  const W = 200, H = 90
  return (
    <div className="relative flex items-end justify-center select-none" style={{ width: W, height: H + 100 }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', bottom: 0 }}>
        {/* top face */}
        <polygon points={`${W/2},6 ${W-8},${H/2-4} ${W/2},${H-6} 8,${H/2-4}`} fill={topColor} opacity="0.9"/>
        {/* left dark face */}
        <polygon points={`8,${H/2-4} ${W/2},${H-6} ${W/2},${H} 8,${H/2+6}`} fill={darkColor} opacity="0.95"/>
        {/* right mid face */}
        <polygon points={`${W-8},${H/2-4} ${W/2},${H-6} ${W/2},${H} ${W-8},${H/2+6}`} fill={midColor} opacity="0.95"/>
        {/* shine */}
        <line x1="8" y1={H/2-4} x2={W/2} y2="6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        <line x1={W/2} y1="6" x2={W-8} y2={H/2-4} stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      </svg>
      {/* content above platform */}
      <div style={{ position: 'absolute', bottom: H - 18, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  )
}

/* ── Phone Screen: NFC tap ───────────────────────────────────────────────── */
function PhoneNFC() {
  return (
    <IsoPlatform topColor="#3b82f6" midColor="#1d4ed8" darkColor="#1e3a8a">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{ width: 72, height: 118, background: '#0f0f0f', borderRadius: 14, border: '2px solid #2a2a2a', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          {/* notch */}
          <div style={{ height: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 24, height: 4, background: '#222', borderRadius: 4 }} />
          </div>
          {/* screen */}
          <div style={{ background: 'linear-gradient(180deg,#1a0a2e 0%,#2d1854 100%)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 6px 8px' }}>
            {/* NFC pulse */}
            <div style={{ position: 'relative', marginBottom: 4 }}>
              <motion.div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '1.5px solid rgba(166,75,223,0.4)' }}
                animate={{ scale: [1, 1.7], opacity: [0.6, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#A64BDF,#B289D5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconNFC size={13} />
              </div>
            </div>
            {/* avatar */}
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#A64BDF,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 3 }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: 9 }}>T</span>
            </div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 7, marginBottom: 1 }}>Tapzy User</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 5.5, marginBottom: 5 }}>tapzy.in/u</span>
            {/* links */}
            {[
              { label: 'Contact', icon: <IconPhone size={7}/>, bg: 'rgba(166,75,223,0.3)' },
              { label: 'Instagram', icon: <IconCamera size={7}/>, bg: 'rgba(236,72,153,0.3)' },
              { label: 'LinkedIn', icon: <IconLink size={7}/>, bg: 'rgba(59,130,246,0.3)' },
              { label: 'Website', icon: <IconLink size={7}/>, bg: 'rgba(34,197,94,0.3)' },
            ].map(l => (
              <div key={l.label} style={{ width: '100%', background: l.bg, borderRadius: 4, padding: '2px 4px', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                {l.icon}
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 5.5, fontWeight: 600 }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </IsoPlatform>
  )
}

/* ── Phone Screen: QR scan ───────────────────────────────────────────────── */
function QRScan() {
  return (
    <IsoPlatform topColor="#6366f1" midColor="#4338ca" darkColor="#312e81">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
      >
        {/* QR card */}
        <div style={{ width: 64, height: 64, background: 'white', borderRadius: 10, padding: 5, boxShadow: '0 6px 20px rgba(0,0,0,0.25)', position: 'relative', overflow: 'hidden' }}>
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
            <rect width="54" height="54" fill="white"/>
            {/* finder TL */}
            <rect x="0" y="0" width="20" height="20" rx="2.5" fill="#1a0a2e"/>
            <rect x="2.5" y="2.5" width="15" height="15" rx="1.5" fill="white"/>
            <rect x="5" y="5" width="10" height="10" rx="1" fill="#1a0a2e"/>
            {/* finder TR */}
            <rect x="34" y="0" width="20" height="20" rx="2.5" fill="#1a0a2e"/>
            <rect x="36.5" y="2.5" width="15" height="15" rx="1.5" fill="white"/>
            <rect x="39" y="5" width="10" height="10" rx="1" fill="#1a0a2e"/>
            {/* finder BL */}
            <rect x="0" y="34" width="20" height="20" rx="2.5" fill="#1a0a2e"/>
            <rect x="2.5" y="36.5" width="15" height="15" rx="1.5" fill="white"/>
            <rect x="5" y="39" width="10" height="10" rx="1" fill="#1a0a2e"/>
            {/* data modules */}
            <rect x="22" y="22" width="4" height="4" fill="#1a0a2e"/>
            <rect x="26" y="26" width="4" height="4" fill="#1a0a2e"/>
            <rect x="30" y="22" width="4" height="4" fill="#1a0a2e"/>
            <rect x="22" y="30" width="4" height="4" fill="#1a0a2e"/>
            <rect x="34" y="24" width="4" height="4" fill="#1a0a2e"/>
            <rect x="38" y="34" width="12" height="12" rx="1.5" fill="#1a0a2e"/>
            <rect x="40.5" y="36.5" width="7" height="7" rx="0.5" fill="white"/>
            <rect x="42" y="38" width="4" height="4" fill="#1a0a2e"/>
            <rect x="24" y="38" width="4" height="4" fill="#1a0a2e"/>
            <rect x="28" y="34" width="4" height="4" fill="#1a0a2e"/>
          </svg>
          {/* animated scan line */}
          <motion.div
            style={{ position: 'absolute', left: 4, right: 4, height: 2, background: 'linear-gradient(90deg, transparent, #22c55e, transparent)', borderRadius: 2 }}
            animate={{ top: ['12%', '85%', '12%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        {/* finger pointer — SVG not emoji */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IconFinger size={30} />
        </div>
      </motion.div>
    </IsoPlatform>
  )
}

/* ── Phone Screen: profile/contacts ─────────────────────────────────────── */
function PhoneProfile() {
  return (
    <IsoPlatform topColor="#8b5cf6" midColor="#6d28d9" darkColor="#4c1d95">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div style={{ width: 72, height: 114, background: '#0f0f0f', borderRadius: 14, border: '2px solid #2a2a2a', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          <div style={{ height: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 24, height: 4, background: '#222', borderRadius: 4 }} />
          </div>
          <div style={{ background: 'white', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0 8px' }}>
            {/* header banner */}
            <div style={{ width: '100%', height: 32, background: 'linear-gradient(135deg,#A64BDF,#B289D5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: 7 }}>T</span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 5, fontWeight: 600 }}>tapzy.in/profile</span>
            </div>
            {/* contact rows */}
            {[
              { label: 'Call',      icon: <IconPhone  color="#A64BDF" size={8}/>, bg: '#f9f0ff' },
              { label: 'Email',     icon: <IconMail   color="#A64BDF" size={8}/>, bg: '#f9f0ff' },
              { label: 'LinkedIn',  icon: <IconLink   color="#3b82f6" size={8}/>, bg: '#eff6ff' },
              { label: 'Instagram', icon: <IconCamera color="#ec4899" size={8}/>, bg: '#fdf2f8' },
            ].map(r => (
              <div key={r.label} style={{ width: 'calc(100% - 12px)', background: r.bg, borderRadius: 5, padding: '3px 5px', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4, border: '1px solid rgba(0,0,0,0.06)' }}>
                {r.icon}
                <span style={{ fontSize: 6, color: '#374151', fontWeight: 600 }}>{r.label}</span>
              </div>
            ))}
            {/* save contact */}
            <div style={{ width: 'calc(100% - 12px)', marginTop: 3, background: 'linear-gradient(135deg,#A64BDF,#B289D5)', borderRadius: 5, padding: '3px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: 6, fontWeight: 700 }}>Save Contact</span>
            </div>
          </div>
        </div>
      </motion.div>
    </IsoPlatform>
  )
}

/* ── Step data ───────────────────────────────────────────────────────────── */
const steps = [
  {
    num: '01',
    visualSide: 'right',
    tag: 'For NFC compatible phones',
    title: 'Tap Tapzy NFC Card',
    boldWord: 'NFC Card',
    body: 'on the back side of the phone.',
    Visual: PhoneNFC,
  },
  {
    num: '02',
    visualSide: 'left',
    tag: 'For Non-NFC compatible phones',
    title: 'Scan the QR code',
    boldWord: 'QR code',
    body: 'on the card',
    Visual: QRScan,
  },
  {
    num: '03',
    visualSide: 'right',
    tag: null,
    title: 'Discover and access all the Features',
    boldWord: 'Features',
    body: 'like Add to contact, connect via social media & much more.',
    Visual: PhoneProfile,
  },
]

/* ── Text block ──────────────────────────────────────────────────────────── */
function TextBlock({ step, alignRight }) {
  const before = step.title.slice(0, step.title.indexOf(step.boldWord))
  const after  = step.title.slice(step.title.indexOf(step.boldWord) + step.boldWord.length)
  return (
    <div style={{ maxWidth: 260, textAlign: alignRight ? 'right' : 'left' }}>
      {step.tag && (
        <p className="text-xs text-plum/45 italic mb-1.5">({step.tag})</p>
      )}
      <p className="text-xl sm:text-2xl text-plum leading-snug mb-1 font-medium">
        {before}<strong className="font-extrabold text-primary-600">{step.boldWord}</strong>{after}
      </p>
      <p className="text-plum/55 text-sm leading-relaxed">{step.body}</p>
    </div>
  )
}

/* ── Dotted connector ────────────────────────────────────────────────────── */
function DottedLine() {
  return (
    <div className="flex justify-center my-1" style={{ height: 48 }}>
      <svg width="2" height="48">
        <line x1="1" y1="0" x2="1" y2="48" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

/* ── Step row ────────────────────────────────────────────────────────────── */
function StepRow({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const { Visual } = step
  const visualRight = step.visualSide === 'right'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 md:grid-cols-[1fr_96px_1fr] items-center gap-6"
    >
      {/* col 1 */}
      <div className={`flex justify-center ${visualRight ? 'md:justify-end' : 'md:justify-end'}`}>
        {visualRight
          ? <TextBlock step={step} alignRight={true} />
          : <div className="flex justify-center"><Visual /></div>
        }
      </div>

      {/* col 2 — big number */}
      <div className="hidden md:flex flex-col items-center">
        <motion.p
          className="text-7xl font-extrabold text-primary-500 leading-none select-none"
          style={{ textShadow: '0 4px 24px rgba(166,75,223,0.18)' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
        >
          {step.num}
        </motion.p>
      </div>

      {/* col 3 */}
      <div className={`flex justify-center ${visualRight ? 'md:justify-start' : 'md:justify-start'}`}>
        {visualRight
          ? <div className="flex justify-center"><Visual /></div>
          : <TextBlock step={step} alignRight={false} />
        }
      </div>

      {/* mobile number */}
      <p className="md:hidden text-center text-5xl font-extrabold text-primary-500">{step.num}</p>
    </motion.div>
  )
}

/* ── MAIN EXPORT ─────────────────────────────────────────────────────────── */
export default function HowItWorks() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section className="py-24 px-4 bg-white overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(166,75,223,0.05) 0%, transparent 55%)' }}
      />
      <div className="relative max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-plum leading-tight">
            How to Use Tapzy{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">NFC Card</span>
          </h2>
          <p className="text-plum/50 mt-3 text-sm max-w-sm mx-auto">
            Three steps. Zero friction. Maximum impression.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div key={step.num}>
              <StepRow step={step} index={i} />
              {i < steps.length - 1 && <DottedLine />}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <a href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-brand-gradient shadow-glow hover:scale-[1.03] hover:shadow-glow transition-all"
          >
            Get Your Tapzy Card
            <span className="icon text-xl">arrow_forward</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
