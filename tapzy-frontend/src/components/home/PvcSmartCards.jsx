import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function PvcSmartCards() {
  const scrollRef = useRef(null)

  const cards = [
    '/pvc-cards/card-1.png',
    '/pvc-cards/card-2.png',
    '/pvc-cards/card-3.png',
    '/pvc-cards/card-4.png',
  ]

  return (
    <section className="bg-[#0a0a0a] py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-[40px] font-bold text-white tracking-tight">Tapzy PVC Smart Business Cards</h2>
        </motion.div>

        <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
          {/* Fading Edges for the Ticker */}
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

          {/* Infinite Scrolling Container */}
          <motion.div
            className="flex gap-4 md:gap-6 w-max pt-4 pb-10 px-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            {[...cards, ...cards].map((imgSrc, index) => (
              <div
                key={index}
                className="w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] aspect-[808/500] shrink-0 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all duration-300"
              >
                <img 
                  src={imgSrc} 
                  alt={`Tapzy PVC Smart Card ${index + 1}`} 
                  className={`w-full h-full object-cover block ${imgSrc.includes('card-2') ? 'scale-[1.62] translate-x-[4%]' : ''}`} 
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
