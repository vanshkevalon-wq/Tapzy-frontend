import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
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

// Admin pages
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import ManageProducts from './pages/admin/ManageProducts'
import ContactSubmissions from './pages/admin/ContactSubmissions'
import AdminProfile from './pages/admin/AdminProfile'

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
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

            {/* Public routes */}
            <Route path="/*" element={<PublicLayout />} />
          </Routes>

          {/* Floating scroll-to-top button */}
          <ScrollToTopButton />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
