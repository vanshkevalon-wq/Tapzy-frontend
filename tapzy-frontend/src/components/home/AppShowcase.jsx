import React from 'react';
import { motion } from 'framer-motion';

export default function AppShowcase() {
  return (
    <section className="bg-black py-20 px-4 text-center">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-light text-white mb-2 tracking-wide">
            <span className="text-white/80">Smarter.</span> Faster. <span className="text-white/80">Better.</span>
          </h2>
          <h3 className="text-2xl md:text-4xl font-semibold text-white mb-6">
            Way to Connect With Tapzy App
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base font-normal leading-relaxed mb-16">
            Create, customize, and share multiple digital profiles with ease. Connect smarter, network faster, and make every interaction memorable.
          </p>

          <div className="relative w-full max-w-4xl mx-auto mb-16">
            {/* The user needs to save their provided image as 'phones-mockup.png' in the public folder */}
            <img 
              src="/phones-mockup.png?v=1" 
              alt="Tapzy App Profiles" 
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
            <div className="relative inline-block text-center">
              {/* Left Decorative Arrow (Points exactly to the 'D') */}
              <img 
                src="/arrow-left.png" 
                alt="" 
                className="absolute right-[calc(100%+10px)] md:right-[calc(100%+20px)] top-0 md:top-1 w-48 md:w-[350px] max-w-none opacity-80 pointer-events-none hidden md:block object-contain origin-top-right"
              />
              <p className="text-white font-medium text-sm md:text-base mb-8 relative z-10">
                Download the Tapzy App and manage your digital profile effortlessly.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              {/* Google Play Button */}
              <a 
                href="https://play.google.com/store/apps/details?id=com.tapzy.android.abc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black border border-white/30 rounded-xl px-5 py-2.5 hover:bg-white/10 transition-colors"
              >
                <img src="/google-play-store-icon.png" alt="Google Play" className="w-6 h-6 object-contain" />
                <div className="text-left flex flex-col justify-center">
                  <span className="text-[10px] leading-none text-white/70">GET IT ON</span>
                  <span className="text-sm font-semibold leading-tight text-white">Google Play</span>
                </div>
              </a>
              
              {/* App Store Button Container */}
              <div className="relative inline-block">
                {/* Right Decorative Arrow (Points beside the App Store button) */}
                <img 
                  src="/arrow-right.png" 
                  alt="" 
                  className="absolute left-[calc(100%+20px)] md:left-[calc(100%+30px)] bottom-[10px] md:bottom-[20px] w-48 md:w-[350px] max-w-none opacity-80 pointer-events-none hidden md:block object-contain origin-bottom-left"
                />
                <a 
                  href="https://apps.apple.com/us/app/tapzy-digital-business-card/id6451362582"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black border border-white/30 rounded-xl px-5 py-2.5 hover:bg-white/10 transition-colors"
                >
                  <svg viewBox="0 0 384 512" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  <div className="text-left flex flex-col justify-center">
                    <span className="text-[10px] leading-none text-white/70">Download on the</span>
                    <span className="text-sm font-semibold leading-tight text-white">App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
