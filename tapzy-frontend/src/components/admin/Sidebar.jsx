import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import TapzyLogo from '../common/TapzyLogo'

const navItems = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    icon: <span className="icon text-xl flex-shrink-0">grid_view</span>,
  },
  {
    to: '/admin/products',
    label: 'Products',
    icon: <span className="icon text-xl flex-shrink-0">inventory_2</span>,
  },
  {
    to: '/admin/contacts',
    label: 'Contacts',
    icon: <span className="icon text-xl flex-shrink-0">mail</span>,
  },
  {
    to: '/admin/users',
    label: 'Users',
    icon: <span className="icon text-xl flex-shrink-0">group</span>,
  },
  {
    to: '/admin/profile',
    label: 'Profile',
    icon: <span className="icon text-xl flex-shrink-0">manage_accounts</span>,
  },
]

function NavContent({ onClose }) {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
    onClose?.()
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="h-1 bg-brand-gradient flex-shrink-0" />

      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between flex-shrink-0">
        <div>
          <TapzyLogo variant="dark" height={34} />
          <p className="text-xs text-white/30 mt-1 pl-0.5">Admin Panel</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <span className="icon text-xl">close</span>
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-primary-500/20 text-primary-300 border border-primary-500/20'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div className="px-4 py-5 border-t border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            {admin?.name?.[0]?.toUpperCase() || admin?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="min-w-0 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{admin?.name || 'Admin'}</p>
            <p className="text-xs text-white/30 truncate">{admin?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <span className="icon text-lg flex-shrink-0">logout</span>
          Logout
        </button>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ── Mobile top bar (always visible on small screens) ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-plum border-b border-white/10 flex items-center justify-between px-4">
        <TapzyLogo variant="dark" height={30} />
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <span className="icon text-xl">menu</span>
        </button>
      </div>

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-64 h-screen bg-plum text-white/70 flex-col flex-shrink-0 overflow-hidden">
        <NavContent />
      </aside>

      {/* ── Mobile drawer overlay + slide-in panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer — fixed so it never affects document width */}
            <motion.div
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-plum text-white/70 flex flex-col shadow-2xl overflow-hidden md:hidden"
            >
              <NavContent onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
