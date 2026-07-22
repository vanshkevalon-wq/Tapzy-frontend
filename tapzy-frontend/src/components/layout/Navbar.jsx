import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useUserAuth } from '../../context/UserAuthContext'
import AuthDrawer from '../auth/AuthDrawer'
import SearchBar from './SearchBar'
import tapzyLogo from '../../assets/tapzy-logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/about', label: 'How It Works' },
  { to: '/faq', label: 'FAQs' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { totalItems } = useCart()
  const { user } = useUserAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <div className="fixed top-0 z-50 w-full transition-all duration-300">
        {/* ── Announcement Ticker ── */}
        <div className="w-full bg-[#0a0510] text-white text-[11px] sm:text-[12px] font-semibold py-2 overflow-hidden flex flex-nowrap items-center border-b border-white/10">
          <div className="flex animate-marquee shrink-0 min-w-max">
            {[...Array(5)].map((_, i) => (
              <span key={`a-${i}`} className="mx-3 sm:mx-6 shrink-0 uppercase tracking-widest text-white/90">
                Free Delivery Across India | GET 10% OFF ON FIRST PURCHASE USE CODE FIRST10 |
              </span>
            ))}
          </div>
          <div className="flex animate-marquee shrink-0 min-w-max" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <span key={`b-${i}`} className="mx-3 sm:mx-6 shrink-0 uppercase tracking-widest text-white/90">
                Free Delivery Across India | GET 10% OFF ON FIRST PURCHASE USE CODE FIRST10 |
              </span>
            ))}
          </div>
        </div>

        <header
          className={`w-full transition-all duration-500 py-3 ${scrolled
            ? 'bg-[#0a0510]/90 backdrop-blur-xl shadow-lg border-b border-white/5'
            : 'bg-transparent'
            }`}
        >
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[87.41px] min-h-[87.41px] gap-4">

              {/* ── Logo ── */}
              <Link
                to="/"
                className="flex items-center shrink-0"
                aria-label="Tapzy home"
              >
                <img
                  src={tapzyLogo}
                  alt="Tapzy Logo"
                  className="w-[219px] h-[77.18px] object-contain opacity-100 select-none"
                />
              </Link>

              {/* ── Center Nav Pill (Figma Specs: 849px x 50px, radius 15px, color #A64BDF 10%, stroke #A64BDF) ── */}
              <nav className="hidden md:flex items-center justify-around w-[849px] h-[50px] bg-[#A64BDF]/10 border border-[#A64BDF] rounded-[15px] px-6 backdrop-blur-md" aria-label="Main navigation">
                {links.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `text-[18px] font-normal leading-[18px] tracking-normal transition-colors duration-300
                    ${isActive
                        ? 'text-[#D289D5]'
                        : 'text-white hover:text-[#D289D5]'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>

              {/* ── Right-side actions ── */}
              <div className="flex items-center gap-[49.5px] shrink-0">

                {/* Cart icon (Figma: 60px x 60px) */}
                <Link
                  to="/cart"
                  aria-label={`Cart — ${totalItems} items`}
                  className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full bg-primary-600 text-white hover:bg-primary-500 hover:scale-105 transition-all duration-300"
                >
                  <span className="icon text-[24px] leading-none">shopping_cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-white text-primary-600 text-[11px] font-bold leading-none">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* Search button (Figma: 60px x 60px) */}
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full bg-primary-600 text-white hover:bg-primary-500 hover:scale-105 transition-all duration-300"
                >
                  <span className="icon text-[24px] leading-none">search</span>
                </button>

                {/* Hamburger */}
                <button
                  className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 ml-1"
                  onClick={() => setOpen(!open)}
                  aria-label="Toggle menu"
                  aria-expanded={open}
                >
                  <span className="icon text-xl leading-none">{open ? 'close' : 'menu'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Search bar (slides in below header bar) ── */}
          <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />

          {/* ── Mobile menu ── */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="bg-[#0a0510]/95 backdrop-blur-xl px-4 pt-3 pb-4 mt-2 mx-4 rounded-2xl border border-white/10 shadow-2xl space-y-1">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-normal transition-all duration-200 ${isActive
                      ? 'text-[#D289D5] bg-[#A64BDF]/15'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </header>

      </div>{/* end sticky wrapper */}

      {/* ── Auth Drawer ── */}
      <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
