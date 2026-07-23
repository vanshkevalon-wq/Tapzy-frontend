import { Link } from 'react-router-dom'
import TapzyLogo from '../common/TapzyLogo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const policies = [
  { to: '/policy/compatible-phone', label: 'Compatible Phone' },
  { to: '/policy/delivery', label: 'Delivery' },
  { to: '/policy/privacy', label: 'Privacy Policy' },
  { to: '/policy/refund', label: 'Refund Policy' },
  { to: '/policy/shipping', label: 'Shipping Policy' },
  { to: '/policy/subscription', label: 'Subscription Policy' },
  { to: '/policy/data-security', label: 'Data Security Policy' },
  { to: '/policy/terms-of-service', label: 'Terms of Service' },
  { to: '/policy/return', label: 'Return Policy' },
  { to: '/policy/international-shipping', label: 'International Shipping Policy' },
]

const socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#080808] text-[#FFFFFF] relative overflow-hidden">
      {/* Noise background */}
      <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-screen pointer-events-none grayscale z-0"></div>

      {/* Decorative T Shape */}
      <div 
        className="absolute bottom-0 right-0 pointer-events-none z-0 hidden lg:block translate-x-[10%] translate-y-[10%] w-[550px] h-[491px] bg-gradient-to-br from-[#A64CDF] to-[#D289D5] [mask-image:url(/t-shape.png)] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:bottom_right] [-webkit-mask-image:url(/t-shape.png)] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:bottom_right]"
      ></div>

      {/* Top gradient line */}
      <div className="h-1 bg-brand-gradient relative z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <TapzyLogo variant="dark" height={80} />
            <p className="mt-4 text-[14px] leading-[22px] max-w-[435px] text-[#FFFFFF] font-normal">
              Smarter networking starts with Tapzy. Share, connect, and grow with just one tap.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              {/* Google Play Button */}
              <a 
                href="https://play.google.com/store/apps/details?id=com.tapzy.android.abc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 border border-[#F9F9F9] rounded-[14px] hover:bg-white/10 transition-colors w-[180px] bg-black/20"
              >
                <img src="/google-play-store-icon.png" alt="Google Play" className="w-8 h-8 shrink-0 object-contain" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-white/80 leading-none mb-1">GET IT ON</span>
                  <span className="text-[15px] font-medium text-white leading-none">Google Play</span>
                </div>
              </a>

              {/* App Store Button */}
              <a 
                href="https://apps.apple.com/us/app/tapzy-digital-business-card/id6451362582" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 border border-[#F9F9F9] rounded-[14px] hover:bg-white/10 transition-colors w-[180px] bg-black/20"
              >
                <img src="/apple-icon.png" alt="Apple" className="w-8 h-8 shrink-0 object-contain" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-white/80 leading-none mb-1">Download on the</span>
                  <span className="text-[15px] font-medium text-white leading-none">App Store</span>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-3 mt-10">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#FFFFFF] hover:bg-primary-500 hover:text-white transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Policy
            </h3>
            <ul className="space-y-2.5">
              {policies.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="icon text-base text-primary-400 flex-shrink-0">mail</span>
                sales@tapzy.com
              </li>
              <li className="flex items-center gap-2">
                <span className="icon text-base text-primary-400 flex-shrink-0">call</span>
                9725247990
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#FFFFFF]">
          <span>© {new Date().getFullYear()} Tapzy. All rights reserved.</span>
          <span>Built with ❤️ for the connected era</span>
        </div>
      </div>
    </footer>
  )
}
