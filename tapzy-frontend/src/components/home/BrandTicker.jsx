import { motion } from 'framer-motion'
import logoSheraton from '../../assets/logo-sheraton.png'
import logoMonin from '../../assets/logo-monin.png'
import logoKotak from '../../assets/logo-kotak.png'
import logoAxis from '../../assets/logo-axis.png'
import logoSayaji from '../../assets/logo-sayaji.png'

const brandLogos = [
  { name: 'Sheraton Hotels & Resorts', src: logoSheraton },
  { name: 'MONIN', src: logoMonin },
  { name: 'Kotak Life', src: logoKotak },
  { name: 'Axis Bank', src: logoAxis },
  { name: 'Sayaji', src: logoSayaji },
]

export default function BrandTicker() {
  // Multiply array for seamless, smooth infinite marquee loop
  const tickerLogos = [...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos]

  return (
    <section className="py-6 sm:py-8 bg-white overflow-hidden border-y border-gray-200">
      <div className="w-full overflow-hidden flex select-none">
        <motion.div
          className="flex items-center gap-12 sm:gap-20 whitespace-nowrap shrink-0 min-w-full"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {tickerLogos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center h-12 sm:h-16 w-32 sm:w-44 shrink-0 px-2">
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
