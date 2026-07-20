import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const differentiators = [
  {
    icon: '⚡',
    title: 'Instant Sharing',
    desc: 'No scanning, no typing — just tap and your info transfers in under a second.',
  },
  {
    icon: '🎨',
    title: 'Premium Designs',
    desc: 'Sleek, professional card designs that make a lasting first impression.',
  },
  {
    icon: '🔄',
    title: 'Always Up-to-Date',
    desc: 'Edit your digital profile anytime. Your card never goes out of date.',
  },
  {
    icon: '🌱',
    title: 'Eco Conscious',
    desc: 'One card replaces hundreds of paper cards. Better for you and the planet.',
  },
]

function Stat({ value, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl p-8 text-center shadow-card border border-primary-50"
    >
      <p className="text-4xl font-extrabold bg-brand-gradient bg-clip-text text-transparent mb-2">{value}</p>
      <p className="text-plum/60 text-sm font-medium">{label}</p>
    </motion.div>
  )
}

export default function About() {
  return (
    <main className="bg-offwhite">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-semibold text-primary-500 uppercase tracking-widest">Our Story</span>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-plum mt-3 mb-6 leading-tight">
              Reimagining how the world{' '}
              <span className="bg-brand-gradient bg-clip-text text-transparent">connects</span>
            </h1>
            <p className="text-lg text-plum/60 max-w-2xl mx-auto leading-relaxed">
              Tapzy was born from a simple frustration: paper business cards get lost, go out of date, and hurt the environment. We built the smarter alternative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold text-primary-500 uppercase tracking-widest">Mission</span>
            <h2 className="text-3xl font-extrabold text-plum mt-2 mb-4">
              Make every connection effortless
            </h2>
            <p className="text-plum/60 leading-relaxed mb-4">
              We believe your business card should work as hard as you do. Tapzy NFC cards carry everything you need to share — contact info, portfolio, social media, website — all in a single tap.
            </p>
            <p className="text-plum/60 leading-relaxed">
              Whether you're at a conference, a coffee meeting, or a chance encounter, Tapzy ensures you're always ready to make a memorable impression.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-brand-gradient rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/80 leading-relaxed">
                A world where every professional carries one card that does everything — beautifully, sustainably, and instantly.
              </p>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-white/60 text-sm">Founded with the belief that networking should be effortless for everyone.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-offwhite">
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat value="10,000+" label="Cards Tapped" delay={0} />
          <Stat value="500+" label="Businesses Served" delay={0.1} />
          <Stat value="50+" label="Countries" delay={0.2} />
          <Stat value="4.9★" label="Customer Rating" delay={0.3} />
        </div>
      </section>

      {/* Why Tapzy */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-primary-500 uppercase tracking-widest">Differentiators</span>
            <h2 className="text-3xl font-extrabold text-plum mt-2">Why choose Tapzy?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-offwhite rounded-2xl p-5 border border-primary-50 hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl flex-shrink-0">
                  {d.icon}
                </div>
                <div>
                  <h3 className="font-bold text-plum mb-1">{d.title}</h3>
                  <p className="text-plum/60 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-brand-gradient">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to get started?</h2>
          <p className="text-white/70 mb-8">Explore our range of NFC cards and find the perfect one for you.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-primary-600 bg-white shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </main>
  )
}
