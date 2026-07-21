import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const guideData = {
  'samsung-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Samsung Devices (Android)',
    brand: 'Samsung',
    intro: 'Samsung devices have had excellent NFC support for years, making them perfect for Tapzy NFC Business Cards. This guide will help you understand how your Samsung device works with NFC technology.'
  },
  'oneplus-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on OnePlus Devices',
    brand: 'OnePlus',
    intro: 'OnePlus devices come with built-in NFC capabilities that work seamlessly with Tapzy NFC Business Cards. Learn how to make the most of this technology.'
  },
  'nokia-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Nokia Devices',
    brand: 'Nokia',
    intro: 'Nokia smartphones support NFC technology that enables quick and easy sharing with Tapzy NFC Business Cards.'
  },
  'nothing-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Nothing Devices',
    brand: 'Nothing',
    intro: 'Nothing phones are equipped with advanced NFC technology perfect for Tapzy NFC Business Cards.'
  },
  'motorola-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Motorola Devices',
    brand: 'Motorola',
    intro: 'Motorola devices support NFC technology for seamless interactions with Tapzy NFC Business Cards.'
  },
  'lg-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on LG Devices',
    brand: 'LG',
    intro: 'LG smartphones come with NFC support that works great with Tapzy NFC Business Cards.'
  },
  'xiaomi-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Xiaomi Devices',
    brand: 'Xiaomi',
    intro: 'Xiaomi devices feature robust NFC capabilities ideal for Tapzy NFC Business Cards.'
  },
  'google-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Google Pixel Devices',
    brand: 'Google Pixel',
    intro: 'Google Pixel phones have excellent NFC support built into Android, perfect for Tapzy NFC Business Cards.'
  },
  'realme-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Realme Devices',
    brand: 'Realme',
    intro: 'Realme smartphones support NFC technology for quick sharing with Tapzy NFC Business Cards.'
  },
  'sony-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Sony Devices',
    brand: 'Sony',
    intro: 'Sony Xperia phones feature NFC technology that works seamlessly with Tapzy NFC Business Cards.'
  },
  'vivo-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Vivo Devices',
    brand: 'Vivo',
    intro: 'Vivo smartphones are equipped with NFC support for easy sharing with Tapzy NFC Business Cards.'
  },
  'honor-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Honor Devices',
    brand: 'Honor',
    intro: 'Honor devices support NFC technology for seamless interactions with Tapzy NFC Business Cards.'
  },
  'htc-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on HTC Devices',
    brand: 'HTC',
    intro: 'HTC smartphones feature NFC capabilities perfect for Tapzy NFC Business Cards.'
  },
  'poco-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Poco Devices',
    brand: 'Poco',
    intro: 'Poco phones come with NFC support that works great with Tapzy NFC Business Cards.'
  },
  'oppo-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on OPPO Devices',
    brand: 'OPPO',
    intro: 'OPPO devices feature NFC technology for quick and easy sharing with Tapzy NFC Business Cards.'
  },
  'asus-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Asus Devices',
    brand: 'Asus',
    intro: 'Asus smartphones, especially ROG Phone series, have excellent NFC support for Tapzy NFC Business Cards.'
  },
  'essential-nfc-guide': {
    title: 'How to Use Tapzy NFC Business Card on Essential Devices',
    brand: 'Essential',
    intro: 'Essential phones are equipped with NFC technology for seamless Tapzy NFC Business Card interactions.'
  }
}

const sections = [
  {
    id: 'enable',
    title: 'How to Enable NFC',
    bullets: [
      'Go to Settings on your device',
      'Navigate to "Connected devices" or "Connections"',
      'Find and enable the NFC toggle',
      'Some devices may also have "Android Beam" – enable this for sharing'
    ]
  },
  {
    id: 'using',
    title: 'Using Tapzy with Your Device',
    bullets: [
      'Reading NFC Tags: Simply tap your phone near the Tapzy NFC card. No app required!',
      'Optimal Position: Hold the back of your phone (where the NFC antenna is located) close to the card',
      'Quick Response: Your device will automatically read the card and open the profile',
      'First Time: You may be prompted to open with a browser – select your preferred browser'
    ]
  },
  {
    id: 'tips',
    title: 'Tips for Best Performance',
    bullets: [
      'Remove thick phone cases that may interfere with NFC signal',
      'Hold the phone steady for 1-2 seconds when tapping',
      'Ensure NFC is enabled in your device settings',
      'Keep the card flat and tap the center-back of your phone to it'
    ]
  }
]

export default function GenericNfcGuide() {
  const { guideId } = useParams()
  const guide = guideData[guideId] || guideData['samsung-nfc-guide']

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
              {guide.title}
            </h1>
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="icon text-base">calendar_today</span>
                Updated: 2024
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
                  Understanding NFC on {guide.brand}
                </h2>
                <p className="text-plum/70 leading-relaxed">
                  {guide.intro}
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
                  <ul className="space-y-3">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-primary-400 flex-shrink-0" />
                        <p className="text-plum/70 leading-relaxed">{bullet}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Closing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brand-gradient rounded-2xl p-8 text-white"
              >
                <h2 className="text-2xl font-bold mb-3">Start Sharing with Tapzy</h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  Now that you understand how NFC works on your {guide.brand} device, you're ready to make the most 
                  of your Tapzy NFC Business Card. Share your contact info, portfolio, and social profiles with a single tap!
                </p>
                <p className="text-white/70 text-sm mb-6">
                  Need help? Our support team is always here to assist you.
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
