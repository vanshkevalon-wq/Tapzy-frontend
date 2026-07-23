import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonialsData = [
  {
    id: 1,
    name: 'Hannah Schmitt',
    role: 'Lead designer',
    quote: 'The setup took only a few minutes, and updating my information is incredibly easy. A must-have for professionals.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Hannah Schmitt',
    role: 'Lead designer',
    quote: 'Tapzy has completely transformed how I network. Sharing my contact details is now effortless, and my clients are always impressed.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Hannah Schmitt',
    role: 'Lead designer',
    quote: 'The setup took only a few minutes, and updating my information is incredibly easy. A must-have for professionals.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Hannah Schmitt',
    role: 'Lead designer',
    quote: 'Tapzy has completely transformed how I network. Sharing my contact details is now effortless, and my clients are always impressed.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Hannah Schmitt',
    role: 'Lead designer',
    quote: 'The setup took only a few minutes, and updating my information is incredibly easy. A must-have for professionals.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Continuous auto-sliding timer (3.5s interval)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  // Compute the relative offset for a smooth infinite carousel
  const getCardPosition = (index) => {
    const total = testimonialsData.length;
    let offset = index - activeIndex;
    
    // Normalize offset to find shortest path in the circle
    if (offset > Math.floor(total / 2)) {
      offset -= total;
    } else if (offset < -Math.floor(total / 2)) {
      offset += total;
    }
    return offset;
  };

  return (
    <section className="bg-black py-20 relative overflow-hidden text-white">
      {/* Hexagon Shapes Background */}
      <div className="absolute left-0 top-16 w-40 md:w-72 pointer-events-none opacity-80 z-0">
        <img src="/hex-shape.png" alt="" className="w-full h-auto" />
      </div>
      <div className="absolute right-0 bottom-12 w-40 md:w-72 pointer-events-none opacity-80 rotate-180 scale-x-[-1] z-0">
        <img src="/hex-shape.png" alt="" className="w-full h-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Hear From <span className="text-[#C026D3] drop-shadow-[0_0_20px_rgba(192,38,211,0.4)]">Happy Customers.</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base font-normal leading-relaxed">
            Satisfied customers are the cornerstone of a strong and prominent brand in the market. Tapzy is fortunate to have delighted clients, and we pride ourselves on relying on genuine testimonials.
          </p>
        </div>

        {/* Testimonials Carousel Container */}
        <div
          className="relative w-full min-h-[460px] px-2 py-4 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonialsData.map((testimonial, idx) => {
            const offset = getCardPosition(idx);
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = Math.abs(offset) <= 1;

            return (
              <motion.div
                key={testimonial.id}
                initial={false}
                animate={{
                  x: `calc(-50% + ${offset * 115}%)`,
                  y: isCenter ? `calc(-50% - 15px)` : `calc(-50% + 15px)`,
                  scale: isCenter ? 1.05 : 0.85,
                  opacity: isVisible ? (isCenter ? 1 : 0.5) : 0,
                  zIndex: isCenter ? 30 : isVisible ? 10 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                  mass: 1,
                  duration: 0.5,
                }}
                style={{
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
                className={`absolute top-1/2 left-1/2 w-[280px] sm:w-[300px] md:w-[320px] h-[340px] sm:h-[360px] flex items-center justify-center cursor-pointer`}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                }}
              >
                {/* 1. PURPLE CARD BEHIND (Offset for stacked effect) */}
                <img
                  src="/card-bg-white.png"
                  alt="Purple background shape"
                  className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none select-none drop-shadow-2xl translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 opacity-80"
                />

                {/* 2. WHITE CARD IN FRONT */}
                <img
                  src="/card-bg-purple.png"
                  alt="White card front"
                  className="absolute inset-0 w-full h-full object-fill z-10 pointer-events-none select-none drop-shadow-md"
                />

                {/* 3. CONTENT ON TOP OF WHITE CARD (z-20) */}
                <div className="relative z-20 w-full h-full flex flex-col items-center justify-between p-5 sm:p-6 pt-10 pb-6 text-center">
                  {/* Floating Avatar */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-md z-30">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Role */}
                  <div className="mt-2">
                    <h4 className="text-[#1E1B2E] font-bold text-base sm:text-lg md:text-xl tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-[#6B7280] text-xs sm:text-sm font-medium mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>

                  {/* Quote Icon */}
                  <div className="my-1.5 text-[#C026D3]">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 mx-auto fill-current" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Quote Text */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed px-2 max-w-[300px] text-[#4B5563]`}
                  >
                    "{testimonial.quote}"
                  </p>
                </div>
                  </motion.div>
              );
            })}
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex justify-center items-center gap-3 mt-10 z-20 relative">
          <button
            onClick={handlePrev}
            className="p-2 text-white/60 hover:text-white transition-colors focus:outline-none"
            aria-label="Previous Testimonial"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full ${idx === activeIndex
                  ? 'w-3 h-3 bg-[#C026D3] shadow-[0_0_12px_rgba(192,38,211,0.8)]'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 text-white/60 hover:text-white transition-colors focus:outline-none"
            aria-label="Next Testimonial"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}






