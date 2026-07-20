import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: <span className="icon text-2xl">smartphone</span>,
    title: 'Works on All Phones',
    description: 'Compatible with every modern iPhone and Android. No app ever.',
    color: 'bg-primary-500',
    glow: 'shadow-[0_0_20px_rgba(166,75,223,0.3)]',
  },
  {
    icon: <span className="icon text-2xl">sync</span>,
    title: 'Instant Updates',
    description: 'Edit your profile anytime. Your card always shows the latest.',
    color: 'bg-lavender-400',
    glow: 'shadow-[0_0_20px_rgba(178,137,213,0.3)]',
  },
  {
    icon: <span className="icon text-2xl">palette</span>,
    title: 'Custom Design',
    description: 'Premium finishes crafted to match your personal brand.',
    color: 'bg-primary-600',
    glow: 'shadow-[0_0_20px_rgba(147,51,200,0.3)]',
  },
  {
    icon: <span className="icon text-2xl">bar_chart</span>,
    title: 'Tap Analytics',
    description: 'See exactly how many taps your card gets and what links they clicked.',
    color: 'bg-lavender-500',
    glow: 'shadow-[0_0_20px_rgba(158,110,192,0.3)]',
  },
  {
    icon: <span className="icon text-2xl">eco</span>,
    title: 'Eco-Friendly',
    description: 'One Tapzy card replaces hundreds of paper cards — forever.',
    color: 'bg-primary-400',
    glow: 'shadow-[0_0_20px_rgba(185,102,245,0.3)]',
  },
  {
    icon: <span className="icon text-2xl">shield_person</span>,
    title: 'Privacy First',
    description: 'Control exactly what you share. Hide or update anything anytime.',
    color: 'bg-lavender-400',
    glow: 'shadow-[0_0_20px_rgba(178,137,213,0.3)]',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative bg-white rounded-3xl p-6 border border-primary-100 hover:border-primary-200 hover:shadow-card-hover transition-all duration-300 cursor-default overflow-hidden"
    >
      {/* corner glow on hover */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary-100/0 group-hover:bg-primary-100/60 blur-2xl transition-all duration-500 pointer-events-none" />

      <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-5 ${feature.glow} group-hover:scale-110 transition-transform duration-300`}>
        {feature.icon}
      </div>
      <h3 className="text-base font-extrabold text-plum mb-2">{feature.title}</h3>
      <p className="text-sm text-plum/55 leading-relaxed">{feature.description}</p>

      {/* bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-brand-gradient"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  )
}

export default function FeatureCards() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="py-24 px-4 bg-offwhite overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">Why Tapzy</span>
          <h2 className="text-4xl font-extrabold text-plum mt-2 mb-3">
            Everything you need to{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">impress</span>
          </h2>
          <p className="text-plum/55 mt-2 max-w-md mx-auto text-sm leading-relaxed">
            Built for professionals who make every connection count.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
        </div>
      </div>
    </section>
  )
}
