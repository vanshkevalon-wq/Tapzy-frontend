import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import cardsFanImg from '../../assets/cards-fan.png'
import bgWaveImg from '../../assets/hero-bg-wave.png'
import avatar1 from '../../assets/avatar1.png'
import avatar2 from '../../assets/avatar2.png'
import avatar3 from '../../assets/avatar3.png'
import avatar4 from '../../assets/avatar4.png'

export default function Hero() {
  const avatars = [avatar1, avatar2, avatar3, avatar4]

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(19,8,13,0.98)_0%,rgba(19,8,13,0.98)_42%,#2F2331_62%,#422A4E_82%,#532F66_100%)] min-h-[90vh] lg:min-h-screen flex flex-col justify-between items-center pt-36 sm:pt-40 md:pt-44 pb-2 md:pb-6">

      {/* ── Background Wave Overlay & Purple Glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Top ambient purple glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary-900/25 blur-[140px] rounded-full" />

        {/* Bottom rich purple radial glow behind cards */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[650px] bg-gradient-to-t from-[#43145e] via-[#240a36]/70 to-transparent blur-3xl pointer-events-none z-0" />

        {/* Abstract wave background image (Shifted down slightly to align behind cards properly) */}
        <img
          src={bgWaveImg}
          alt=""
          className="absolute -bottom-10 sm:-bottom-14 md:-bottom-16 left-0 w-full h-[450px] sm:h-[520px] md:h-[580px] object-cover opacity-90 mix-blend-screen pointer-events-none z-10"
        />
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-20 w-full max-w-[1530px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col items-center text-center">

        {/* ── Headline (Matching Figma Specs 1:1) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-3 sm:space-y-4"
        >
          <h1 className="font-['Poppins'] font-bold text-4xl sm:text-5xl md:text-[64px] leading-tight md:leading-[72px] tracking-[-0.02em]">
            <span className="bg-gradient-to-r from-[#A64BDF] to-[#D289D5] bg-clip-text text-transparent">
              One Tap.
            </span>
            <br />
            <span className="text-white">
              Endless Connection.
            </span>
          </h1>

          {/* Subtitle ("Body large" in Figma: Macaria/Poppins, 400 Regular, 18px, leading 30px, tracking 0%, color #D289D5, max-w 755px) */}
          <p className="font-['Macaria','Poppins',sans-serif] font-normal text-sm sm:text-base md:text-[18px] leading-normal md:leading-[30px] tracking-normal text-[#D289D5] max-w-[755px] mx-auto pt-2">
            The smart, sustainable way to share your details and grow your network.
          </p>
        </motion.div>

        {/* ── CTA Buttons & Reviews Row (Group 59 touching right side border) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full mt-6 sm:mt-8 flex flex-col lg:flex-row items-center justify-center"
        >
          {/* Centered Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {/* Get Started Button */}
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-[8px] px-[20px] py-[8px] h-[46px] rounded-[45.5px] text-sm font-bold text-white bg-gradient-to-r from-[#A64BDF] to-[#D289D5] hover:opacity-95 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Get Started</span>
              <span className="icon text-base leading-none">arrow_forward</span>
            </Link>

            {/* Shop Now Button */}
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-[8px] px-[20px] py-[8px] h-[46px] rounded-[45.5px] text-sm font-bold text-white border border-[#F9F9F9] hover:bg-white/10 transition-all hover:scale-[1.03] active:scale-[0.98] backdrop-blur-sm"
            >
              <span>Shop Now</span>
              <span className="icon text-base leading-none">shopping_cart</span>
            </Link>
          </div>

          {/* ── Social Proof / Reviews Block (Group 59 in Figma: 194px x 119px, Avatars 50px x 50px, Radius 25px) ── */}
          <div className="w-[194px] h-[119px] flex flex-col items-start justify-between text-left mt-6 lg:mt-0 lg:absolute lg:right-2 xl:right-4 lg:top-1/2 lg:-translate-y-1/2">
            {/* 4 Circular Avatars (50px x 50px each, 100% circle mask, face-centered) */}
            <div className="flex -space-x-[2px]">
              {avatars.map((url, i) => (
                <div
                  key={i}
                  className="w-[50px] h-[50px] rounded-full overflow-hidden border border-[#000000] shrink-0 shadow-sm"
                >
                  <img
                    src={url}
                    alt="user avatar"
                    className="w-full h-full object-cover object-top select-none"
                  />
                </div>
              ))}
            </div>

            {/* 5 Stars Rating (Group 84 in Figma: 111px x 20px, 4 full stars + 1 half star = 4.5) & (4.5) */}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-[111px] h-[20px] flex items-center justify-between text-amber-400">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="icon icon-fill text-[20px] leading-none">star</span>
                ))}
                <span className="icon icon-fill text-[20px] leading-none">star_half</span>
              </div>
              <span className="text-white text-xs font-bold font-['Poppins'] leading-none">(4.5)</span>
            </div>

            {/* Review Count Subtitle */}
            <span className="text-white/60 text-[11px] font-medium font-['Poppins'] tracking-normal leading-none">
              from 3,200+ reviews
            </span>
          </div>
        </motion.div>

      </div>

      {/* ── HIGH-DEFINITION ANIMATED 3D CARDS SHOWCASE (Larger & Shifted Up Close To Buttons) ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1600px] mx-auto -mt-6 sm:-mt-8 md:-mt-12 lg:-mt-16 z-30 flex justify-center px-0 overflow-visible"
      >
        <Link to="/products" className="w-full flex justify-center" aria-label="Shop Tapzy NFC Business Cards">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
            className="relative w-full cursor-pointer flex justify-center"
          >
            <img
              src={cardsFanImg}
              alt="Tapzy NFC Business Cards Showcase"
              className="w-full h-auto max-w-[1550px] object-contain filter drop-shadow-[0_30px_70px_rgba(0,0,0,0.85)] select-none transform scale-105 sm:scale-110 md:scale-105 lg:scale-100"
            />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}
