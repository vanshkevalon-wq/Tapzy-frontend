import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const sections = [
  {
    id: 'history',
    title: 'A Brief History of NFC on iPhones',
    content: null,
    bullets: [
      'iPhone XS and XR: Introduced background tag reading, allowing NFC interaction without needing an app.',
      'iPhone 6 and later: Support NFC for payments.',
      'iPhone 7 and newer: With iOS 15+, these models can read and write NFC tags.',
    ]
  },
  {
    id: 'using',
    title: 'Using NFC with Your iPhone',
    content: null,
    bullets: [
      'Reading NFC Tags: Simply tap your iPhone near an NFC tag, and it will automatically read the tag. This feature, known as "background tag scanning," is always on and cannot be turned off.',
      'Supported Tags: The latest iPhones can read all standard NFC chips, including popular NXP NTAG and ST ST25TN series tags. Avoid using larger memory NTAG216 chips for best performance.',
      'Optimal Tag Sizes: For reliable scanning, use standard 20–40mm NFC tags. Tags that are too small or too large may affect scan performance.',
    ]
  },
  {
    id: 'uses',
    title: 'Practical Uses of NFC',
    content: 'NFC technology on iPhones is not limited to payments. Here are some practical applications:',
    bullets: [
      'Connect to Wireless Networks: Tap an NFC tag to quickly connect to a Wi-Fi network or Bluetooth device.',
      'Access Product Information: In stores, use NFC tags to get detailed product information.',
      'Smart Home Automations: Trigger smart home actions, such as turning on lights or adjusting thermostats.',
      'Digital Business Cards: Share your contact information instantly with Tapzy NFC Business Cards.',
      'Peer-to-Peer Sharing: Although different from Android, iPhones can use NFC for sharing data between devices.',
    ]
  },
  {
    id: 'performance',
    title: 'Ensuring Optimal Performance',
    content: null,
    bullets: [
      'Tag Placement: Ensure the NFC tag is placed where it\'s easily accessible and clearly indicated. Avoid placing it behind thick materials.',
      'Card Reader Location: The NFC reader on iPhones is located near the top edge, so align your phone properly for the best scan results.',
    ]
  },
]

const iPhoneModels = [
  'iPhone 7', 'iPhone 7 Plus', 'iPhone 8', 'iPhone 8 Plus', 'iPhone X',
  'iPhone XS', 'iPhone XS Max', 'iPhone XR', 'iPhone SE (2020)',
  'iPhone 11', 'iPhone 11 Pro', 'iPhone 12', 'iPhone 12 Mini',
  'iPhone 12 Pro', 'iPhone 12 Pro Max', 'iPhone 13', 'iPhone 13 Mini',
  'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 14', 'iPhone 14 Plus',
  'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 15', 'iPhone 15 Plus',
  'iPhone 15 Pro', 'iPhone 15 Pro Max'
]

export default function IphoneNfcGuide() {
  return (
    <main className="bg-offwhite min-h-screen">
      {/* Hero Banner */}
      <section className="bg-plum text-white">
        <div className="max-w-4xl mx-auto px-4 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/policy/compatible-phone"
              className="inline-flex items-center gap-1 text-primary-300 hover:text-primary-200 text-sm mb-6"
            >
              <span className="icon text-base">arrow_back</span>
              Back to Compatible Phones
            </Link>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-primary-300 uppercase tracking-widest">Guide</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
              How Tapzy NFC Business Cards Work with Apple iPhones: A Complete Guide
            </h1>
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="icon text-base">calendar_today</span>
                August 02, 2024
              </span>
              <span className="flex items-center gap-1.5">
                <span className="icon text-base">person</span>
                Tapzy Team
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
                <h3 className="text-sm font-bold text-plum uppercase tracking-wider mb-4">
                  In This Guide
                </h3>
                <nav className="space-y-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-sm text-plum/60 hover:text-primary-500 hover:translate-x-1 transition-all"
                    >
                      {s.title}
                    </a>
                  ))}
                  <a
                    href="#models"
                    className="block text-sm text-plum/60 hover:text-primary-500 hover:translate-x-1 transition-all"
                  >
                    Compatible iPhone Models
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Article */}
            <article className="lg:col-span-3 order-1 lg:order-2 space-y-8">
              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-card p-8"
              >
                <h2 className="text-2xl font-bold text-plum mb-4">
                  Understanding NFC on Your iPhone with Tapzy NFC Business Cards
                </h2>
                <p className="text-plum/70 leading-relaxed">
                  With the rise of NFC (Near Field Communication) technology, Apple iPhones have evolved to support 
                  various NFC functions, making tasks more convenient and efficient. This guide will help you understand 
                  how your iPhone interacts with NFC tags, particularly when using Tapzy NFC Business Cards. Let's explore 
                  how you can make the most out of this technology.
                </p>
              </motion.div>

              {/* Sections */}
              {sections.map((section, idx) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl shadow-card p-8"
                >
                  <h2 className="text-2xl font-bold text-plum mb-4">{section.title}</h2>
                  {section.content && (
                    <p className="text-plum/70 leading-relaxed mb-4">{section.content}</p>
                  )}
                  <ul className="space-y-3">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-primary-400 flex-shrink-0" />
                        <p className="text-plum/70 leading-relaxed">
                          <strong className="text-plum">{bullet.split(':')[0]}:</strong>
                          {bullet.includes(':') ? bullet.substring(bullet.indexOf(':') + 1) : ''}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Compatible Models */}
              <motion.div
                id="models"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-card p-8"
              >
                <h2 className="text-2xl font-bold text-plum mb-2">Compatible iPhone Models</h2>
                <p className="text-plum/60 text-sm mb-6">
                  Here's a list of iPhone models that support NFC tag reading.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {iPhoneModels.map((model) => (
                    <div
                      key={model}
                      className="flex items-center gap-2 px-4 py-3 bg-offwhite rounded-lg text-sm text-plum/80 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <span className="icon text-base text-primary-400 flex-shrink-0">smartphone</span>
                      {model}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Closing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brand-gradient rounded-2xl p-8 text-white"
              >
                <h2 className="text-2xl font-bold mb-3">Ready to embrace NFC?</h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  NFC technology on iPhones unlocks a world of convenience, from quick payments to seamless interactions 
                  with smart devices. Tapzy NFC Business Cards take advantage of this technology, allowing you to share your 
                  business details effortlessly. Embrace the future with NFC and make your digital interactions smoother and smarter.
                </p>
                <p className="text-white/70 text-sm mb-6">
                  Feel free to contact us for any support or queries regarding your Tapzy NFC Business Card. We are here to help.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
                  >
                    <span className="icon text-base">shopping_bag</span>
                    Shop NFC Cards
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <span className="icon text-base">mail</span>
                    Contact Us
                  </Link>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-2">
                <Link
                  to="/policy/compatible-phone"
                  className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium group"
                >
                  <span className="icon text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  All Compatible Phones
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
