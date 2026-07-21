import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { UserAuthProvider } from './context/UserAuthContext'
import { ScrollToTopOnNav } from './components/common/ScrollToTop'
import ScrollToTopButton from './components/common/ScrollToTop'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Public pages
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import SubscriptionPlans from './pages/SubscriptionPlans'
import Cart from './pages/Cart'
import CompatiblePhone from './pages/CompatiblePhone'
import IphoneNfcGuide from './pages/guides/IphoneNfcGuide'
import GenericNfcGuide from './pages/guides/GenericNfcGuide'

// Policy pages
import Delivery from './pages/policy/Delivery'
import PrivacyPolicy from './pages/policy/PrivacyPolicy'
import RefundPolicy from './pages/policy/RefundPolicy'
import ShippingPolicy from './pages/policy/ShippingPolicy'
import SubscriptionPolicy from './pages/policy/SubscriptionPolicy'
import DataSecurityPolicy from './pages/policy/DataSecurityPolicy'
import TermsOfService from './pages/policy/TermsOfService'
import ReturnPolicy from './pages/policy/ReturnPolicy'
import InternationalShipping from './pages/policy/InternationalShipping'

// Admin pages
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import ManageProducts from './pages/admin/ManageProducts'
import ContactSubmissions from './pages/admin/ContactSubmissions'
import AdminProfile from './pages/admin/AdminProfile'
import Users from './pages/admin/Users'

// Protected route wrapper
function RequireAuth({ children }) {
  const { admin, loading } = useAuth()
  if (loading) return null
  return admin ? children : <Navigate to="/admin/login" replace />
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/policy/compatible-phone" element={<CompatiblePhone />} />
          <Route path="/guide/iphone-nfc-guide" element={<IphoneNfcGuide />} />
          <Route path="/guide/:guideId" element={<GenericNfcGuide />} />
          {/* Policy pages */}
          <Route path="/policy/delivery" element={<Delivery />} />
          <Route path="/policy/privacy" element={<PrivacyPolicy />} />
          <Route path="/policy/refund" element={<RefundPolicy />} />
          <Route path="/policy/shipping" element={<ShippingPolicy />} />
          <Route path="/policy/subscription" element={<SubscriptionPolicy />} />
          <Route path="/policy/data-security" element={<DataSecurityPolicy />} />
          <Route path="/policy/terms-of-service" element={<TermsOfService />} />
          <Route path="/policy/return" element={<ReturnPolicy />} />
          <Route path="/policy/international-shipping" element={<InternationalShipping />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserAuthProvider>
        <CartProvider>
          <ScrollToTopOnNav />
          <div className="w-full max-w-full overflow-x-clip">
            <Routes>
              {/* Admin routes (no Navbar/Footer) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={<RequireAuth><Dashboard /></RequireAuth>}
              />
              <Route
                path="/admin/products"
                element={<RequireAuth><ManageProducts /></RequireAuth>}
              />
              <Route
                path="/admin/contacts"
                element={<RequireAuth><ContactSubmissions /></RequireAuth>}
              />
              <Route
                path="/admin/profile"
                element={<RequireAuth><AdminProfile /></RequireAuth>}
              />
              <Route
                path="/admin/users"
                element={<RequireAuth><Users /></RequireAuth>}
              />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

              {/* Public routes */}
              <Route path="/*" element={<PublicLayout />} />
            </Routes>

            {/* Floating scroll-to-top button */}
            <ScrollToTopButton />
          </div>
        </CartProvider>
        </UserAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
