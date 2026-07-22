import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import profileImg from '../../assets/step3-profile.png'
import qrCodeImg from '../../assets/step2-qr.png'
import featureImg from '../../assets/step1-select.png'
import bgPattern from '../../assets/steps-bg-pattern.png'

/* ── Step data ───────────────────────────────────────────────────────────── */
const steps = [
  {
    num: '01',
    tag: 'For NFC compatible phones',
    title: 'Tap Tapzy NFC Card',
    boldWord: 'NFC Card',
    body: 'on the back side of the phone.',
    image: profileImg,
  },
  {
    num: '02',
    tag: 'For Non-NFC compatible phones',
    title: 'Scan the QR code',
    boldWord: 'QR code',
    body: 'on the card',
    image: qrCodeImg,
  },
  {
    num: '03',
    tag: null,
    title: 'Discover and access all the Features',
    boldWord: 'Features',
    body: 'like Add to contact, connect via social media & much more.',
    image: featureImg,
  },
]

/* ── Step Column (Horizontal Layout) ─────────────────────────────────────── */
function StepColumn({ step, index, activeStep, setActiveStep }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const isActive = activeStep === index

  const before = step.title.slice(0, step.title.indexOf(step.boldWord))
  const after = step.title.slice(step.title.indexOf(step.boldWord) + step.boldWord.length)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setActiveStep(index)}
      className="flex flex-col items-center w-full lg:w-1/3 cursor-pointer group"
    >
      {/* Text Area */}
      <div className={`text-center mb-6 px-2 max-w-[320px] lg:h-[120px] flex flex-col items-center justify-end transition-all duration-500 ${
        isActive ? 'scale-105' : 'scale-100 opacity-70'
      }`}>
        {step.tag && (
          <p className="text-xs text-white/50 italic mb-2">({step.tag})</p>
        )}
        <p className="text-xl sm:text-2xl text-white leading-snug mb-2 font-medium">
          {before}<strong className={`font-extrabold transition-colors duration-500 ${isActive ? 'text-[#A64BDF]' : 'text-white'}`}>{step.boldWord}</strong>{after}
        </p>
        <p className="text-white/60 text-sm leading-relaxed">{step.body}</p>
      </div>

      {/* Number Badge */}
      <div className={`w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mb-8 shrink-0 z-10 transition-all duration-500 ${
        isActive
          ? 'bg-[#A64BDF] text-white border-2 border-white scale-110 shadow-lg'
          : 'bg-[#130d1d] text-[#A64BDF] border border-[#2a203b] scale-100'
      }`}>
        <span className="text-3xl sm:text-4xl font-extrabold">{step.num}</span>
      </div>

      {/* Visual Image */}
      <div className="w-full flex justify-center mt-6">
        <div
          className={`relative max-w-[240px] sm:max-w-[280px] h-auto rounded-[32px] overflow-hidden transition-all duration-700 ease-out transform ${
            isActive
              ? '-translate-y-2 scale-105 opacity-100 border-2 border-[#A64BDF]/60 shadow-2xl'
              : 'translate-y-2 scale-95 opacity-60 border-2 border-transparent'
          }`}
        >
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-auto object-contain rounded-[32px]"
          />
        </div>
      </div>
    </motion.div>
  )
}

/* ── MAIN EXPORT ─────────────────────────────────────────────────────────── */
export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // Line progress width based on active step: 0% -> 50% -> 100%
  const lineProgressClass = activeStep === 0 ? 'w-0' : activeStep === 1 ? 'w-1/2' : 'w-full'

  return (
    <section className="pt-32 pb-24 px-4 bg-[#080808] overflow-hidden relative">
      {/* Background Wave Pattern */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: `url(${bgPattern})` }}
      />
      <div className="relative max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-primary-400 uppercase tracking-widest bg-[#A64BDF]/10 border border-[#A64BDF]/30 px-4 py-1.5 rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#ffffff] leading-tight">
            How to Use Tapzy{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">NFC Card</span>
          </h2>
          <p className="text-white/60 mt-3 text-sm max-w-sm mx-auto">
            Three steps. Zero friction. Maximum impression.
          </p>
        </motion.div>

        {/* Steps Container with Connecting Progress Line */}
        <div className="relative mt-12 w-full">
          {/* Animated Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[185px] left-[16%] right-[16%] h-1 bg-[#2a203b] rounded-full -z-0 overflow-hidden">
            <div className={`h-full bg-gradient-to-r from-[#A64BDF] to-[#7C3AED] transition-all duration-700 ease-in-out ${lineProgressClass}`} />
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-start gap-16 lg:gap-8 w-full">
            {steps.map((step, i) => (
              <StepColumn
                key={step.num}
                step={step}
                index={i}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            ))}
          </div>
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
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-brand-gradient hover:scale-[1.03] transition-all"
          >
            Get Your Tapzy Card
            <span className="icon text-xl">arrow_forward</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
