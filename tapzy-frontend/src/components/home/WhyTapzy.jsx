import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimationControls } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────
   NFC TAP ANIMATION
   Sequence (loops):
   1. Card floats above phone (idle bob)
   2. Card slides down & taps phone top
   3. Ripple flash at tap point
   4. Phone screen switches to profile
   5. Card slides back up
   6. Profile fades, lock screen returns
   7. Repeat
───────────────────────────────────────── */
function TapAnimation() {
  const cardCtrl    = useAnimationControls()
  const flashCtrl   = useAnimationControls()
  const screenCtrl  = useAnimationControls() // 0=locked, 1=profile
  const [screen, setScreen] = useState('locked') // 'locked' | 'profile'

  useEffect(() => {
    let cancelled = false

    async function loop() {
      while (!cancelled) {
        // 1. idle float up
        await cardCtrl.start({ y: -36, rotate: -5, transition: { duration: 0.8, ease: 'easeInOut' } })
        await new Promise(r => setTimeout(r, 400))

        // 2. card taps down
        await cardCtrl.start({ y: 20, rotate: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } })

        // 3. flash rings
        flashCtrl.start({
          scale: [0, 2.5],
          opacity: [0.8, 0],
          transition: { duration: 0.55, ease: 'easeOut' },
        })

        await new Promise(r => setTimeout(r, 120))

        // 4. switch to profile screen
        if (!cancelled) setScreen('profile')

        await new Promise(r => setTimeout(r, 200))

        // 5. card bounces back up
        await cardCtrl.start({ y: -28, rotate: -3, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } })

        // 6. hold profile visible
        await new Promise(r => setTimeout(r, 2200))

        // 7. fade back to lock
        if (!cancelled) setScreen('locked')

        await new Promise(r => setTimeout(r, 1000))
      }
    }

    loop()
    return () => { cancelled = true }
  }, [cardCtrl, flashCtrl])

  return (
    <div className="relative flex items-center justify-center select-none"
      style={{ width: 260, height: 440 }}>

      {/* background glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 240, height: 240,
          top: '45%', left: '50%',
          x: '-50%', y: '-50%',
          background: 'radial-gradient(ellipse, rgba(166,75,223,0.22) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── PHONE ── */}
      <div className="absolute z-10"
        style={{
          width: 180, height: 360,
          top: 60, left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div style={{
          width: '100%', height: '100%',
          background: '#0d0d0d',
          borderRadius: 36,
          border: '3px solid #222',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* dynamic island */}
          <div style={{
            height: 28, background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 56, height: 8, background: '#1a1a1a', borderRadius: 10 }} />
          </div>

          {/* ── LOCK SCREEN ── */}
          <motion.div
            style={{ position: 'absolute', top: 28, left: 0, right: 0, bottom: 0 }}
            animate={{ opacity: screen === 'locked' ? 1 : 0 }}
            transition={{ duration: 0.35 }}
          >
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(160deg,#1a0a2e 0%,#3b0764 45%,#1a0a2e 100%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <div style={{ marginTop: 32, textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, letterSpacing: '0.2em', fontWeight: 600, marginBottom: 4 }}>TAP TO UNLOCK</p>
                <p style={{ color: 'white', fontWeight: 800, fontSize: 38, letterSpacing: '-1px', lineHeight: 1 }}>9:41</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, marginTop: 2 }}>Mon, 20 July</p>
              </div>
              {/* NFC rings */}
              <div style={{ position: 'relative', marginTop: 32, width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {[48, 68, 88].map((s, i) => (
                  <motion.div key={s} style={{
                    position: 'absolute',
                    width: s, height: s, borderRadius: '50%',
                    border: '1.5px solid rgba(166,75,223,0.4)',
                  }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.1, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                  />
                ))}
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="white" strokeWidth="1.8"/>
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              {/* NFC wave at bottom */}
              <div style={{ position: 'absolute', bottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <svg width="24" height="18" viewBox="0 0 28 22" fill="none">
                  <path d="M2 11C5 5 9 2.5 14 2.5S23 5 26 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.25"/>
                  <path d="M5.5 11C8 6.5 11 4.5 14 4.5S20 6.5 22.5 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.55"/>
                  <path d="M9.5 11C11 8.5 12.5 7.5 14 7.5S17 8.5 18.5 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9"/>
                  <circle cx="14" cy="14.5" r="2" fill="white"/>
                </svg>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 7.5, letterSpacing: '0.18em', fontWeight: 600 }}>NFC READY</p>
              </div>
            </div>
          </motion.div>

          {/* ── PROFILE SCREEN ── */}
          <motion.div
            style={{ position: 'absolute', top: 28, left: 0, right: 0, bottom: 0, background: 'white' }}
            animate={{ opacity: screen === 'profile' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* header */}
            <div style={{
              width: '100%', height: 92,
              background: 'linear-gradient(135deg,#A64BDF,#7C3AED)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: 14 }}>T</span>
              </div>
              <p style={{ color: 'white', fontWeight: 700, fontSize: 10 }}>Tapzy User</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 8 }}>tapzy.in/profile</p>
            </div>
            {/* links */}
            <div style={{ padding: '10px 10px 0' }}>
              {[
                { label: 'Contact',   color: '#A64BDF', bg: 'rgba(166,75,223,0.1)'  },
                { label: 'Instagram', color: '#ec4899', bg: 'rgba(236,72,153,0.1)'  },
                { label: 'LinkedIn',  color: '#3b82f6', bg: 'rgba(59,130,246,0.1)'  },
                { label: 'Website',   color: '#22c55e', bg: 'rgba(34,197,94,0.1)'   },
                { label: 'Portfolio', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)'  },
              ].map((item, i) => (
                <motion.div key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: screen === 'profile' ? 1 : 0, x: screen === 'profile' ? 0 : -8 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.25 }}
                  style={{
                    background: item.bg, borderRadius: 8,
                    padding: '5px 8px', marginBottom: 5,
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 9, fontWeight: 600, color: '#1E1225' }}>{item.label}</span>
                </motion.div>
              ))}
            </div>
            {/* save button */}
            <div style={{ padding: '0 10px' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: screen === 'profile' ? 1 : 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  background: 'linear-gradient(135deg,#A64BDF,#B289D5)',
                  borderRadius: 8, padding: '6px 0', textAlign: 'center',
                }}
              >
                <span style={{ color: 'white', fontWeight: 700, fontSize: 9 }}>Save to Contacts</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* phone side buttons */}
        <div style={{ position: 'absolute', right: -4, top: 90, width: 3, height: 36, background: '#1a1a1a', borderRadius: 4 }} />
        <div style={{ position: 'absolute', left: -4, top: 76, width: 3, height: 28, background: '#1a1a1a', borderRadius: 4 }} />
        <div style={{ position: 'absolute', left: -4, top: 116, width: 3, height: 44, background: '#1a1a1a', borderRadius: 4 }} />
      </div>

      {/* ── TAPZY NFC CARD ── */}
      <motion.div
        animate={cardCtrl}
        initial={{ y: -36, rotate: -5 }}
        style={{ position: 'absolute', top: 20, zIndex: 20, left: '50%', x: '-50%' }}
      >
        <div style={{
          width: 162, height: 102,
          borderRadius: 18,
          background: 'linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 45%,#111 100%)',
          boxShadow: '0 14px 44px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* shine */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.13) 0%,transparent 55%)' }} />
          {/* NFC icon */}
          <div style={{ position: 'absolute', top: 9, right: 11 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M6 8.5C7.5 7 9.7 6 12 6s4.5 1 6 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
              <path d="M8.5 11C9.6 9.8 10.7 9.2 12 9.2s2.4.6 3.5 1.8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85"/>
              <circle cx="12" cy="14" r="1.5" fill="white"/>
            </svg>
          </div>
          {/* chip */}
          <div style={{
            position: 'absolute', top: 12, left: 12,
            width: 28, height: 20, borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.05)',
            display: 'grid', placeItems: 'center',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1.5, width: 16, height: 12 }}>
              {[...Array(9)].map((_, i) => <div key={i} style={{ background: 'rgba(255,255,255,0.22)', borderRadius: 1 }} />)}
            </div>
          </div>
          {/* TAPZY label */}
          <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
            <div style={{ background: 'rgba(166,75,223,0.35)', borderRadius: 7, padding: '3px 10px', display: 'inline-block' }}>
              <p style={{ color: 'white', fontWeight: 900, fontSize: 11, letterSpacing: '0.2em' }}>TAPZY</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── TAP RIPPLE RINGS ── */}
      <motion.div
        animate={flashCtrl}
        initial={{ scale: 0, opacity: 0 }}
        style={{
          position: 'absolute', zIndex: 30,
          top: 148, left: '50%', x: '-50%', y: '-50%',
          width: 50, height: 50, borderRadius: '50%',
          border: '2.5px solid #A64BDF',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={flashCtrl}
        initial={{ scale: 0, opacity: 0 }}
        style={{
          position: 'absolute', zIndex: 30,
          top: 148, left: '50%', x: '-50%', y: '-50%',
          width: 30, height: 30, borderRadius: '50%',
          border: '2px solid #B289D5',
          pointerEvents: 'none',
        }}
        transition={{ delay: 0.06 }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────
   WHY CHOOSE TAPZY — bullet points
───────────────────────────────────────── */
const points = [
  { icon: 'workspace_premium', title: 'Two Print Finishes',        text: 'Choose from Standard or Premium Embossed — both crafted for professionals who want to stand out.' },
  { icon: 'do_not_touch',      title: 'No More Paper Cards',        text: 'We solved a common problem — paper cards get lost, outdated, and wasted. Tapzy eliminates all three.' },
  { icon: 'bolt',              title: 'Cutting-Edge Technology',    text: 'NFC chip technology enhances every connection — instant, accurate, and effortlessly modern.' },
  { icon: 'currency_rupee',    title: 'Premium, Honest Pricing',    text: 'High-quality NFC business cards at very reasonable prices. No hidden fees, no surprises.' },
  { icon: 'palette',           title: 'Custom Design Support',      text: 'Our designers craft a card that perfectly matches your brand.', cta: true },
  { icon: 'devices',           title: 'Works on Every Device',      text: 'Tap on any modern iPhone or Android — seamless connections every single time.' },
]

export default function WhyTapzy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-4 bg-offwhite relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary-100/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-lavender-100/25 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT — animated phone */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <TapAnimation />
          </motion.div>

          {/* RIGHT — why choose */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-full mb-4">
              Why Tapzy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-plum leading-tight mb-3">
              Why Choose{' '}
              <span className="bg-brand-gradient bg-clip-text text-transparent">Tapzy Cards?</span>
            </h2>
            <p className="text-plum/50 text-sm leading-relaxed mb-8 max-w-md">
              One tap shares your entire professional world. Here's why thousands of professionals across India trust Tapzy.
            </p>

            <ul className="space-y-5">
              {points.map((p, i) => (
                <motion.li key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.22 + i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="icon text-primary-600 text-lg">{p.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-plum text-sm mb-0.5">{p.title}</p>
                    <p className="text-plum/55 text-sm leading-relaxed">
                      {p.text}
                      {p.cta && (
                        <> <Link to="/contact" className="text-primary-600 font-semibold hover:underline">Contact our design team →</Link></>
                      )}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link to="/products"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.03] transition-all text-sm"
              >
                Shop Tapzy Cards
                <span className="icon text-base">arrow_forward</span>
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold border-2 border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-400 transition-all text-sm"
              >
                Talk to Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
