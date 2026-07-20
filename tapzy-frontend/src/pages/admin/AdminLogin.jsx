import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import TapzyLogo from '../../components/common/TapzyLogo'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]   = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('All fields are required.'); return }
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-100/50 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-lavender-100/40 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        {/* Brand mark */}
        <div className="flex flex-col items-center mb-8">
          <TapzyLogo variant="dark" height={52} />
          <p className="text-plum/40 text-sm mt-3">Admin Dashboard</p>
        </div>

        <div className="bg-white rounded-3xl shadow-card border border-primary-50 px-8 py-10">
          <h1 className="text-xl font-bold text-plum text-center mb-6">Welcome back</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm text-center mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-plum/50 uppercase tracking-wide mb-1.5">Email</label>
              <input
                id="email" name="email" type="email"
                value={form.email} onChange={handleChange}
                placeholder="admin@tapzy.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-primary-100 bg-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 placeholder:text-plum/25"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-plum/50 uppercase tracking-wide mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="password" name="password"
                  type={showPw ? 'text' : 'password'}
                  value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl border border-primary-100 bg-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-plum/30 hover:text-plum/60"
                >
                  <span className="icon text-lg">{showPw ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.01] transition-all mt-2 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
