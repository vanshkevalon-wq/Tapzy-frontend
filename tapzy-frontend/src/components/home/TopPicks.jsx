import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import pvcCardsImg from '../../assets/pvc-cards-mockup.png'
import googleCardsImg from '../../assets/google-review-cards-mockup.png'
import metalCardsImg from '../../assets/metal-cards-mockup.png'

export default function TopPicks() {
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -420, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 420, behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-[#080808]">
      {/* ── Outer Container Box (Rectangle 27 in Figma: bg-[#140F18], radius 40px) ── */}
      <div className="max-w-[1720px] mx-auto bg-[#140F18] rounded-[24px] md:rounded-[36px] py-5 sm:py-8 px-4 sm:px-6 lg:px-8 shadow-2xl relative overflow-hidden">

        {/* Ambient Background Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-[#A64BDF]/15 blur-[120px] rounded-full pointer-events-none" />

        {/* ── Header Section ── */}
        <div className="text-center mb-4 sm:mb-6 max-w-3xl mx-auto space-y-1">
          <span className="text-[#D289D5] text-xs sm:text-sm font-bold tracking-wide block">
            Bestsellers
          </span>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">
            Top Picks from Tapzy
          </h2>
          <p className="text-[#D289D5] text-[11px] sm:text-xs font-normal leading-relaxed">
            Smart, Custom-Designed NFC Products for Instant Sharing
          </p>
        </div>

        {/* ── Cards Slider / Grid (Centered & Balanced Layout) ── */}
        <div
          ref={scrollRef}
          className="flex items-center justify-center lg:justify-center gap-6 lg:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-4 sm:px-8 [scrollbar-width:none] [-ms-overflow-style:none]"
        >

          {/* ──────── CARD 1: PVC NFC CARDS ──────── */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] h-[380px] sm:h-[580px] lg:h-[550px] rounded-[20px] border border-white/10 p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden snap-center shadow-xl select-none bg-[#9C9533BA]"
          >
            {/* Top Right Star Rating (Figma: noto:star 30px x 30px + Montserrat 500 20px) */}
            <div className="absolute top-[20px] sm:top-[25px] right-[20px] sm:right-[30px] flex items-center gap-[6px] text-white font-medium text-base sm:text-[20px] tracking-[-0.015em] font-['Montserrat',sans-serif] z-30">
              <span className="icon icon-fill text-[#FFC107] text-[24px] sm:text-[30px] leading-none select-none">star</span>
              <span>(4.5)</span>
            </div>

            {/* Visual Representation (Shifted to Left Side with Left Edge Overflow) */}
            <div className="relative w-full pt-1 flex justify-start items-start overflow-visible select-none z-20">
              <img
                src={pvcCardsImg}
                alt="Tapzy PVC NFC Business Cards"
                className="w-[420px] sm:w-[540px] max-w-none h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.75)] select-none transform hover:scale-[1.03] transition-transform duration-300 -ml-30 sm:-ml-40 -mt-2 sm:-mt-6"
              />
            </div>

            {/* Bottom Content Area (Figma DevMode: Poppins 700 40px 48px -1%) */}
            <div className="space-y-4 sm:space-y-5 z-10 mt-auto pb-1 sm:pb-2 text-center">
              <h3 className="text-white font-bold text-2xl sm:text-3xl lg:text-[40px] leading-tight sm:leading-[48px] tracking-[-0.01em] font-['Poppins',sans-serif] uppercase text-center w-full max-w-[340px] mx-auto">
                PVC NFC CARDS
              </h3>

              <div className="flex items-center justify-between gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-[8px] px-[18px] py-[9px] h-[46px] rounded-[45.5px] border border-[#F9F9F9] text-white font-medium text-xs sm:text-sm hover:bg-white/15 transition-all active:scale-95 shrink-0"
                >
                  <span>Shop Now</span>
                  <span className="icon text-sm leading-none">shopping_cart</span>
                </Link>

                <div className="flex items-baseline gap-1.5 font-['Montserrat',sans-serif]">
                  <span className="line-through text-white/50 text-xs sm:text-sm">
                    ₹1,999.00
                  </span>
                  <span className="text-white text-base sm:text-xl font-extrabold">
                    ₹999.00
                  </span>
                </div>
              </div>
            </div>
          </motion.div>


          {/* ──────── CARD 2: GOOGLE REVIEW CARDS ──────── */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] h-[380px] sm:h-[580px] lg:h-[550px] rounded-[20px] border border-white/10 p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden snap-center shadow-xl select-none bg-[linear-gradient(165deg,#4F5EE6_0%,#3542BA_45%,#18195E_100%)]"
          >
            {/* Top Right Star Rating (Figma: noto:star 30px x 30px + Montserrat 500 20px) */}
            <div className="absolute top-[20px] sm:top-[25px] right-[20px] sm:right-[30px] flex items-center gap-[6px] text-white font-medium text-base sm:text-[20px] tracking-[-0.015em] font-['Montserrat',sans-serif] z-30">
              <span className="icon icon-fill text-[#FFC107] text-[24px] sm:text-[30px] leading-none select-none">star</span>
              <span>(4.5)</span>
            </div>

            {/* Top Title & Shop Now Row (Pushed Down) */}
            <div className="space-y-4 sm:space-y-5 z-10 pt-10 sm:pt-14 lg:pt-16">
              <h3 className="text-white font-bold text-2xl sm:text-3xl lg:text-[32px] leading-tight sm:leading-[38px] tracking-[-0.01em] max-w-[280px] sm:max-w-[320px] uppercase">
                GOOGLE REVIEW<br />CARDS
              </h3>

              <div className="flex items-center justify-between gap-3 pt-1">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-[8px] px-[18px] py-[9px] h-[46px] rounded-[45.5px] border border-[#F9F9F9] text-white font-medium text-xs sm:text-sm hover:bg-white/15 transition-all active:scale-95 shrink-0"
                >
                  <span>Shop Now</span>
                  <span className="icon text-sm leading-none">shopping_cart</span>
                </Link>

                <div className="flex items-baseline gap-1.5 font-['Montserrat',sans-serif]">
                  <span className="line-through text-white/50 text-xs sm:text-sm">
                    ₹1,999.00
                  </span>
                  <span className="text-white text-base sm:text-xl font-extrabold">
                    ₹999.00
                  </span>
                </div>
              </div>
            </div>

            {/* Center/Bottom Visual (Rotated Right & Shifted Upwards) */}
            <div className="relative w-full flex-1 flex items-end justify-center overflow-visible select-none z-10 pt-1 -mb-2 sm:mb-0">
              <img
                src={googleCardsImg}
                alt="Tapzy Google Review Cards"
                className="w-full max-w-[370px] sm:max-w-[450px] h-auto max-h-[350px] sm:max-h-[420px] object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)] select-none transform rotate-6 -mt-14 sm:-mt-20 hover:scale-[1.03] transition-transform duration-300"
              />
            </div>
          </motion.div>


          {/* ──────── CARD 3: METAL NFC CARD ──────── */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] h-[380px] sm:h-[580px] lg:h-[550px] rounded-[20px] border border-white/10 p-5 sm:p-7 flex flex-col justify-between relative overflow-visible snap-center shadow-xl select-none bg-[linear-gradient(165deg,#E65555_0%,#BD3E3E_45%,#4F1616_100%)]"
          >
            {/* Top Right Star Rating (Figma: noto:star 30px x 30px + Montserrat 500 20px) */}
            <div className="absolute top-[20px] sm:top-[25px] right-[20px] sm:right-[30px] flex items-center gap-[6px] text-white font-medium text-base sm:text-[20px] tracking-[-0.015em] font-['Montserrat',sans-serif] z-30">
              <span className="icon icon-fill text-[#FFC107] text-[24px] sm:text-[30px] leading-none select-none">star</span>
              <span>(4.5)</span>
            </div>

            {/* Top Visual (Absolute Positioned - Completely Independent of Text Changes) */}
            <div className="absolute top-0 left-0 w-full h-[280px] sm:h-[360px] flex items-start justify-start pointer-events-none select-none z-20">
              <img
                src={metalCardsImg}
                alt="Tapzy Metal NFC Cards"
                className="w-[290px] sm:w-[360px] max-w-none h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.75)] select-none transform rotate-[14deg] -mt-20 sm:-mt-28 lg:-mt-32 -ml-2 sm:-ml-6"
              />
            </div>

            {/* Bottom Content Area */}
            <div className="space-y-4 sm:space-y-5 z-10 mt-auto pb-1 sm:pb-2 text-center">
              <h3 className="text-white font-bold text-2xl sm:text-3xl lg:text-[40px] leading-tight sm:leading-[48px] tracking-[-0.01em] font-['Poppins',sans-serif] uppercase text-center w-full max-w-[340px] mx-auto">
                METAL NFC CARD
              </h3>

              <div className="flex items-center justify-between gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-[8px] px-[18px] py-[9px] h-[46px] rounded-[45.5px] border border-[#F9F9F9] text-white font-medium text-xs sm:text-sm hover:bg-white/15 transition-all active:scale-95 shrink-0"
                >
                  <span>Shop Now</span>
                  <span className="icon text-sm leading-none">shopping_cart</span>
                </Link>

                <div className="flex items-baseline gap-1.5 font-['Montserrat',sans-serif]">
                  <span className="line-through text-white/50 text-xs sm:text-sm">
                    ₹1,999.00
                  </span>
                  <span className="text-white text-base sm:text-xl font-extrabold">
                    ₹999.00
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Carousel Slider Navigation Controls ── */}
        <div className="flex items-center justify-center gap-6 mt-4 sm:mt-8">
          <button
            onClick={scrollLeft}
            aria-label="Previous card"
            className="w-[70px] h-[70px] rounded-full bg-[#A64CDF] text-white flex items-center justify-center hover:bg-[#943FCA] transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <svg width="15.33" height="29.18" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 2.5L2.5 15L13.5 27.5" stroke="#FFF8F8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={scrollRight}
            aria-label="Next card"
            className="w-[70px] h-[70px] rounded-full bg-[#A64CDF] text-white flex items-center justify-center hover:bg-[#943FCA] transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <svg width="15.33" height="29.18" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 2.5L13.5 15L2.5 27.5" stroke="#FFF8F8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
