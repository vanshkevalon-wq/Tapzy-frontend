import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import TapzyLogo from '../common/TapzyLogo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-card border-b border-primary-50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <TapzyLogo variant="navbar" height={42} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-plum/70 hover:text-primary-600 hover:bg-primary-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.02] transition-all duration-200"
            >
              Get Your Card
              <span className="icon text-base">arrow_forward</span>
            </Link>

            <button
              className="md:hidden p-2 rounded-xl text-plum/70 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="icon text-xl">{open ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-primary-50 px-4 pt-2 pb-4 space-y-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-plum/70 hover:text-primary-600 hover:bg-primary-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="block mt-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white text-center bg-brand-gradient"
          >
            Get Your Card
          </Link>
        </div>
      )}
    </header>
  )
}
