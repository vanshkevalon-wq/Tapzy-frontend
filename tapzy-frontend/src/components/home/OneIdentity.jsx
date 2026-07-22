import { motion } from 'framer-motion'

export default function OneIdentity() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-4 overflow-hidden relative border-y border-white/5">
      {/* Background Pattern & Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mesh-pattern" width="120" height="240" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="240" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="0" y1="0" x2="120" y2="240" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
        </svg>
        <div className="w-[800px] h-[800px] rounded-full bg-brand-gradient opacity-[0.03] blur-[100px] relative z-0" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* LIVE DEMO Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full border border-blue-900/50 bg-blue-900/20 shadow-[0_0_15px_rgba(37,99,235,0.15)]"
        >
          <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">LIVE DEMO</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[40px] leading-[48px] font-bold text-white mb-6 tracking-[-0.01em]"
        >
          One Identity Isn't Enough.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#D2B9D5] text-[18px] leading-[30px] font-normal tracking-normal text-center max-w-[1260px] w-full mx-auto mb-20 px-4"
        >
          Manage every side of your digital presence from a single app. Stay organized, professional, and always ready to connect.
        </motion.p>

        {/* Mockup Area */}
        <div className="relative w-full flex items-center justify-center mt-12 md:mt-20">
          <img 
            src="/one-identity.png" 
            alt="One Identity Network" 
            className="w-full max-w-4xl mx-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500" 
          />
        </div>
      </div>
    </section>
  )
}
