import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to top on every route change.
 * Drop inside <BrowserRouter> — no render output.
 */
export function ScrollToTopOnNav() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Try window first, fall back to document element
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])
  return null
}

/**
 * Floating "Back to top" button — appears after scrolling 300px.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top-btn"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl bg-brand-gradient text-white shadow-glow-sm hover:shadow-glow hover:scale-110 flex items-center justify-center transition-transform duration-200"
        >
          <span className="icon text-xl">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
