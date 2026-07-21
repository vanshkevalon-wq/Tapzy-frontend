import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import TapzyLogo from '../common/TapzyLogo'
import { useCart } from '../../context/CartContext'
import { useUserAuth } from '../../context/UserAuthContext'
import AuthDrawer from '../auth/AuthDrawer'

const links = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/faq',      label: 'FAQ' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]           = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [authOpen, setAuthOpen]   = useState(false)
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-plum/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-b border-white/10'
          : 'bg-plum border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px] gap-4">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center shrink-0 group"
            aria-label="Tapzy home"
          >
            <TapzyLogo variant="dark" height={52} />
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold tracking-wide rounded-lg transition-all duration-200 group
                  ${isActive
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {/* Animated underline indicator */}
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-brand-gradient transition-all duration-300
                        ${isActive ? 'w-5' : 'w-0 group-hover:w-4'}`}
                    />
                    {/* Active pill background */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-lg bg-white/10 -z-10" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Right-side actions ── */}
          <div className="flex items-center gap-1 shrink-0">

            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="icon text-[22px] leading-none">search</span>
            </button>

            {/* Wishlist icon */}
            <button
              aria-label="Wishlist"
              className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="icon text-[22px] leading-none">favorite_border</span>
            </button>

            {/* Profile icon */}
            <button
              onClick={() => setAuthOpen(true)}
              aria-label="Profile"
              className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="icon text-[22px] leading-none">
                {user ? 'account_circle' : 'person_outline'}
              </span>
              {user && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-plum" />
              )}
            </button>

            {/* Cart icon */}
            <Link
              to="/cart"
              aria-label={`Cart — ${totalItems} items`}
              className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="icon text-[22px] leading-none">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-brand-gradient text-white text-[10px] font-bold leading-none shadow-glow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile: cart icon */}
            <Link
              to="/cart"
              aria-label={`Cart — ${totalItems} items`}
              className="md:hidden relative flex items-center justify-center w-9 h-9 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="icon text-xl leading-none">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-[16px] px-0.5 rounded-full bg-brand-gradient text-white text-[9px] font-bold leading-none">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="icon text-xl leading-none">{open ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/10 bg-plum/98 backdrop-blur-xl px-4 pt-3 pb-4 space-y-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="w-1 h-4 rounded-full bg-brand-gradient shrink-0" />
                  )}
                  {label}
                </>
              )}
            </NavLink>
          ))}

          {/* Mobile CTA — icon row */}
          <div className="pt-2 flex items-center justify-around border-t border-white/10">
            <button
              onClick={() => { setSearchOpen(!searchOpen); setOpen(false) }}
              aria-label="Search"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="icon text-xl leading-none">search</span>
              <span className="text-[10px] font-medium">Search</span>
            </button>
            <button
              aria-label="Wishlist"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="icon text-xl leading-none">favorite_border</span>
              <span className="text-[10px] font-medium">Wishlist</span>
            </button>
            <button
              onClick={() => { setAuthOpen(true); setOpen(false) }}
              aria-label="Profile"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="relative">
                <span className="icon text-xl leading-none">
                  {user ? 'account_circle' : 'person_outline'}
                </span>
                {user && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400" />
                )}
              </span>
              <span className="text-[10px] font-medium">Profile</span>
            </button>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              aria-label={`Cart — ${totalItems} items`}
              className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="relative">
                <span className="icon text-xl leading-none">shopping_cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-[16px] px-0.5 rounded-full bg-brand-gradient text-white text-[9px] font-bold leading-none">
                    {totalItems}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>

    {/* ── Auth Drawer ── */}
    <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
  </>
  )
}
