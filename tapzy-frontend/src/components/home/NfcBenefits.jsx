import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ─── benefit data ───────────────────────────────────────────────────────── */
const benefits = [
  {
    id: 'eco',
    title: 'Eco-Friendly',
    body: 'Every Tapzy card replaces hundreds of paper cards. Help cut the ~6.8 million trees lost to paper printing every year.',
  },
  {
    id: 'comprehensive',
    title: 'Comprehensive Info',
    body: 'Share name, phone, email, socials, portfolio, services and more — far beyond what any paper card can hold.',
  },
  {
    id: 'effortless',
    title: 'Effortless Exchange',
    body: 'Exchange contact info with a single tap or QR scan — instant, accurate, no typing needed.',
  },
  {
    id: 'convenience',
    title: 'Convenience',
    body: 'Keep your profile always current. Update your Tapzy dashboard anytime — your card stays accurate forever.',
  },
  {
    id: 'impression',
    title: 'High-Class Impression',
    body: 'Tapzy NFC cards signal a modern, professional image that stands out in every introduction.',
  },
  {
    id: 'longevity',
    title: 'Longevity',
    body: 'Unlike paper cards that get lost or damaged, Tapzy cards are durable and always accessible on any device.',
  },
]

/* ─── Centre Visual: NFC card resting on phone ───────────────────────────── */
function CentreVisual() {
  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: 220, height: 340 }}>

      {/* glow behind */}
      <div className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(166,75,223,0.22) 0%, transparent 70%)' }} />

      {/* ── PHONE ── */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="relative"
        style={{
          width: 140, height: 240,
          background: '#0a0a0a',
          borderRadius: 28,
          border: '3px solid #222',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* notch */}
        <div style={{ height: 20, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 50, height: 6, background: '#1a1a1a', borderRadius: 10 }} />
        </div>
        {/* screen — white clean background with Tapzy logo */}
        <div style={{ background: 'white', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {/* Tapzy logo block */}
          <div style={{ background: '#111', borderRadius: 10, padding: '5px 12px' }}>
            <p style={{ color: 'white', fontWeight: 900, fontSize: 14, letterSpacing: '0.2em' }}>TAPZY</p>
          </div>
          {/* tap indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <svg width="22" height="18" viewBox="0 0 28 22" fill="none">
              <path d="M2 11C5 5 9 2.5 14 2.5S23 5 26 11" stroke="#A64BDF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.3" />
              <path d="M5 11C7.5 6.5 10.5 4.5 14 4.5S20.5 6.5 23 11" stroke="#A64BDF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
              <path d="M9 11C10.5 8.5 12 7.5 14 7.5S17.5 8.5 19 11" stroke="#A64BDF" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" />
              <circle cx="14" cy="14" r="2" fill="#A64BDF" />
            </svg>
            <p style={{ fontSize: 7, color: '#A64BDF', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tap to Connect</p>
          </div>
        </div>
      </motion.div>

      {/* ── NFC CARD resting on top of phone ── */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 18,
          zIndex: 2,
          width: 150,
          height: 94,
          borderRadius: 16,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 40%, #111 100%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* card shine */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)' }} />
        {/* NFC icon top-right */}
        <div style={{ position: 'absolute', top: 8, right: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 8.5C7.5 7 9.7 6 12 6s4.5 1 6 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.5" />
            <path d="M8.5 11C9.6 9.8 10.7 9.2 12 9.2s2.4.6 3.5 1.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
            <circle cx="12" cy="14" r="1.5" fill="white" />
          </svg>
        </div>
        {/* chip */}
        <div style={{ position: 'absolute', top: 12, left: 12, width: 28, height: 20, borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1.5, width: 16, height: 12 }}>
            {[...Array(9)].map((_, i) => <div key={i} style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 1 }} />)}
          </div>
        </div>
        {/* Tapzy name bottom */}
        <div style={{ position: 'absolute', bottom: 8, left: 12, right: 12 }}>
          <div style={{ background: 'rgba(166,75,223,0.25)', borderRadius: 6, padding: '3px 8px', display: 'inline-block' }}>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 10, letterSpacing: '0.18em' }}>TAPZY</p>
          </div>
        </div>
      </motion.div>

    </div>
  )
}

/* ─── Radial spoke layout ────────────────────────────────────────────────── */
/*  6 benefits placed at these positions relative to centre (desktop):
    TL=eco  TC=comprehensive  TR=effortless
    BL=longevity  BC=(none)  BR=impression  ML=convenience
    We use a 3×3 CSS grid: cols [1fr auto 1fr], rows [auto auto auto]
    and put the benefit texts in each outer cell with dashed SVG lines
    connecting them toward centre in the SVG overlay.
*/

function BenefitText({ b, align = 'left', index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={`max-w-[210px] ${align === 'right' ? 'text-right ml-auto' : 'text-left'}`}
    >
      <p className="font-extrabold text-plum text-sm sm:text-base mb-1">{b.title}:</p>
      <p className="text-plum/55 text-xs sm:text-sm leading-relaxed">{b.body}</p>
    </motion.div>
  )
}

/* ─── MAIN EXPORT ────────────────────────────────────────────────────────── */
export default function NfcBenefits() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(166,75,223,0.05) 0%, transparent 65%)' }} />

      <div className="relative max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-full mb-4">
            Why Tapzy
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-plum leading-tight">
            Boost Your Networking
            <br className="hidden sm:block" />
            <span className="bg-brand-gradient bg-clip-text text-transparent"> with Tapzy NFC Card</span>
          </h2>
          <p className="text-plum/50 mt-3 text-sm max-w-md mx-auto">
            One card. Every detail. Shared in a tap — the smarter way to connect.
          </p>
        </motion.div>

        {/* ── DESKTOP radial layout ── */}
        <div className="hidden md:grid grid-cols-[1fr_220px_1fr] grid-rows-[1fr_1fr_1fr] gap-y-10 gap-x-6 items-center relative">

          {/* Row 1 */}
          <BenefitText b={benefits[0]} align="right" index={0} />
          {/* centre top — empty, centre card spans rows 1-3 */}
          <div />
          <BenefitText b={benefits[1]} align="left" index={1} />

          {/* Row 2 */}
          <BenefitText b={benefits[2]} align="right" index={2} />
          {/* centre card */}
          <div className="flex justify-center row-span-1">
            <CentreVisual />
          </div>
          <BenefitText b={benefits[3]} align="left" index={3} />

          {/* Row 3 */}
          <BenefitText b={benefits[4]} align="right" index={4} />
          <div />
          <BenefitText b={benefits[5]} align="left" index={5} />

          {/* Dashed lines SVG overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
            preserveAspectRatio="none"
          >
            <defs>
              <style>{`
                .spoke { stroke: #c4b5fd; stroke-width: 1.5; stroke-dasharray: 6 5; fill: none; }
              `}</style>
            </defs>
            {/* lines from centre (50%,50%) to each corner/mid */}
            <line className="spoke" x1="50%" y1="50%" x2="6%" y2="16%" />
            <line className="spoke" x1="50%" y1="50%" x2="94%" y2="16%" />
            <line className="spoke" x1="50%" y1="50%" x2="6%" y2="50%" />
            <line className="spoke" x1="50%" y1="50%" x2="94%" y2="50%" />
            <line className="spoke" x1="50%" y1="50%" x2="6%" y2="84%" />
            <line className="spoke" x1="50%" y1="50%" x2="94%" y2="84%" />
          </svg>
        </div>

        {/* ── MOBILE: centre card + stacked cards ── */}
        <div className="flex flex-col items-center gap-8 md:hidden">
          <CentreVisual />
          <div className="grid grid-cols-1 gap-5 w-full max-w-sm">
            {benefits.map((b, i) => (
              <motion.div key={b.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-primary-50 rounded-2xl border border-primary-100 p-4"
              >
                <p className="font-extrabold text-plum text-sm mb-1">{b.title}:</p>
                <p className="text-plum/55 text-xs leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link to="/products"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-brand-gradient shadow-glow hover:scale-[1.03] hover:shadow-glow transition-all"
          >
            Get Your Tapzy Card
            <span className="icon text-xl">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
