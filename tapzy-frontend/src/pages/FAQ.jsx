import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const categories = [
  {
    name: 'About the Card',
    faqs: [
      { q: 'What is an NFC business card?', a: 'An NFC business card has a built-in chip that transmits your digital profile to any nearby smartphone when tapped — no app, no QR code, just touch.' },
      { q: 'How durable is the card?', a: 'Tapzy cards are made from premium PVC — the same material as credit cards. They\'re waterproof and scratch-resistant, built to last years of daily use.' },
      { q: 'Does it work with iPhone?', a: 'Yes! Tapzy works with iPhone XS and newer on iOS 14+, and all modern Android devices. No special settings needed.' },
    ],
  },
  {
    name: 'Ordering',
    faqs: [
      { q: 'How long does delivery take?', a: 'Standard delivery takes 5–7 business days. Express options are available at checkout for 2–3 day delivery.' },
      { q: 'Can I order for my whole team?', a: 'Absolutely! We offer bulk orders at discounted rates. Contact us with the quantity you need and we\'ll create a custom quote.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, net banking, and popular digital wallets.' },
    ],
  },
  {
    name: 'Support',
    faqs: [
      { q: 'How do I set up my digital profile?', a: 'After your order, you\'ll receive setup instructions via email. The process takes under 5 minutes — just fill in your details and your card is live.' },
      { q: 'Can I update my info later?', a: 'Yes! Log into your dashboard anytime to update your contact info, links, photos, and more. Your card always shows the latest version.' },
      { q: 'What if my card stops working?', a: "We offer a lifetime replacement guarantee on all NFC functionality. If your card's chip ever fails, we'll replace it free of charge." },
    ],
  },
]

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="border-b border-primary-50 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left font-semibold text-plum hover:text-primary-600 transition-colors"
        aria-expanded={open}
      >
        <span className="pr-4 text-sm">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-primary-400"
        >
          <span className="icon text-xl">expand_more</span>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-plum/60 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <main className="bg-offwhite min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-gradient py-14 px-4">
        <div className="absolute inset-0 bg-hero-mesh opacity-30" />
        <div className="relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-3">Frequently Asked Questions</h1>
            <p className="text-white/70 text-lg">Everything you need to know about Tapzy.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        {/* Category tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                activeCategory === i
                  ? 'bg-primary-500 text-white shadow-glow-sm'
                  : 'bg-white text-plum/60 border border-primary-100 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="bg-white rounded-3xl border border-primary-50 shadow-card px-6 py-2">
          {categories[activeCategory].faqs.map(({ q, a }, i) => (
            <FAQItem key={q} q={q} a={a} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-10 bg-brand-gradient rounded-3xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-white/70 text-sm mb-5">Can't find the answer you're looking for? Our team is happy to help.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-primary-600 bg-white hover:scale-[1.02] transition-all shadow-card"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  )
}
