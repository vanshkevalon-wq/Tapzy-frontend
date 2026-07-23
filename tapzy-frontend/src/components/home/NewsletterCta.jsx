import React from 'react'
import ctaCardsImg from '../../assets/cta-cards.png'
import ctaBgImg from '../../assets/cta-bg.png'

export default function NewsletterCta() {
  return (
    <section className="relative w-full h-[400px] bg-[#0A0A0A] overflow-hidden flex items-center justify-center border-t border-white/5">
      {/* Background Pattern */}
      {/* The user will add cta-bg.png to the public folder */}
      <div 
        className="absolute inset-0 z-0 opacity-100 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${ctaBgImg})` }}
      />

      {/* Left Cards Image - Absolutely positioned to float on the extreme left edge of the screen */}
      <div className="absolute left-0 -bottom-8 lg:-bottom-12 hidden md:block z-10 pointer-events-none">
        <img 
          src={ctaCardsImg} 
          alt="Tapzy Cards" 
          className="w-80 lg:w-[450px] object-contain object-left-bottom"
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 h-full flex items-center justify-center">


        {/* Center Content */}
        <div className="w-full max-w-4xl text-center flex flex-col items-center justify-center z-20">
          <h2 className="text-3xl md:text-[56px] md:leading-[64px] tracking-[-0.015em] font-bold text-white mb-6 font-['Poppins',_sans-serif]">
            Join the Tapzy Tribe and get<br />latest updates
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-8 max-w-2xl mx-auto">
            Discover how Tapzy is transforming the way professionals connect, network, and grow.
          </p>

          <form className="relative w-full max-w-md mx-auto flex items-center" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-black/40 border border-white/20 text-white placeholder-white/40 text-sm rounded-full py-4 pl-6 pr-36 focus:outline-none focus:border-white/50 transition-colors"
              required
            />
            <button 
              type="submit" 
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-full px-6 flex items-center gap-2 transition-colors"
            >
              Submit <span>&rarr;</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
