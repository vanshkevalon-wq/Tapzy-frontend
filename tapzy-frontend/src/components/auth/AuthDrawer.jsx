import { useState, useEffect, useRef } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'

/* ── tiny toast helper ───────────────────────────────────────── */
function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  const base = 'fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold shadow-2xl animate-fade-in-down'
  const color = type === 'success'
    ? 'bg-green-500 text-white'
    : 'bg-red-500 text-white'

  return (
    <div className={`${base} ${color}`}>
      <span className="icon text-lg leading-none">
        {type === 'success' ? 'check_circle' : 'error'}
      </span>
      {message}
    </div>
  )
}

/* ── input helper ───────────────────────────────────────────── */
function Field({ label, type = 'text', value, onChange, placeholder, required, autoFocus }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-10"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="icon text-[18px] leading-none">
              {show ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

/* ── main drawer ────────────────────────────────────────────── */
export default function AuthDrawer({ open, onClose }) {
  const { user, login, register, logout } = useUserAuth()
  const [view, setView]       = useState('login')   // 'login' | 'register'
  const [toast, setToast]     = useState(null)
  const [busy, setBusy]       = useState(false)
  const drawerRef             = useRef(null)

  // Form state
  const [loginForm, setLoginForm]       = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ firstName: '', lastName: '', email: '', password: '' })

  // Reset to login view whenever drawer opens
  useEffect(() => {
    if (open) setView(user ? 'profile' : 'login')
  }, [open, user])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const showToast = (message, type = 'success') => setToast({ message, type })

  /* ── handlers ── */
  const handleLogin = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await login(loginForm.email, loginForm.password)
      showToast('Logged in successfully!', 'success')
      setTimeout(onClose, 1500)
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed. Please try again.', 'error')
    } finally {
      setBusy(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (registerForm.password.length < 6) {
      return showToast('Password must be at least 6 characters.', 'error')
    }
    setBusy(true)
    try {
      await register(registerForm.firstName, registerForm.lastName, registerForm.email, registerForm.password)
      showToast('Account created successfully! Please log in.', 'success')
      setRegisterForm({ firstName: '', lastName: '', email: '', password: '' })
      setTimeout(() => setView('login'), 1800)
    } catch (err) {
      showToast(err.response?.data?.message || 'Registration failed. Please try again.', 'error')
    } finally {
      setBusy(false)
    }
  }

  const handleLogout = () => {
    logout()
    showToast('Logged out successfully.', 'success')
    setTimeout(onClose, 1200)
  }

  /* ── overlay + drawer ── */
  return (
    <>
      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />
      )}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 right-0 z-[100] h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-modal="true"
        role="dialog"
        aria-label="Account panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            {view === 'login' && 'Login'}
            {view === 'register' && 'Register'}
            {view === 'profile' && 'My Account'}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
            aria-label="Close"
          >
            <span className="icon text-xl leading-none">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* ── LOGIN VIEW ── */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <Field
                label="Email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="you@example.com"
                required
                autoFocus
              />
              <Field
                label="Password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter your password"
                required
              />

              <button
                type="submit"
                disabled={busy}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-lg hover:shadow-purple-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {busy ? (
                  <span className="icon animate-spin text-lg leading-none">progress_activity</span>
                ) : 'Sign In'}
              </button>

              <p className="text-center text-sm text-gray-500">
                New customer?{' '}
                <button
                  type="button"
                  onClick={() => setView('register')}
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Create your account
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER VIEW ── */}
          {view === 'register' && (
            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="First Name"
                  value={registerForm.firstName}
                  onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                  placeholder="John"
                  required
                  autoFocus
                />
                <Field
                  label="Last Name"
                  value={registerForm.lastName}
                  onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                  placeholder="Doe"
                />
              </div>
              <Field
                label="Email"
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                placeholder="you@example.com"
                required
              />
              <Field
                label="Password"
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                placeholder="At least 6 characters"
                required
              />

              <p className="text-xs text-gray-400 leading-relaxed">
                Your personal data will be used to support your experience throughout this website,
                to manage access to your account, and for other purposes described in our privacy policy.
              </p>

              <button
                type="submit"
                disabled={busy}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-lg hover:shadow-purple-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {busy ? (
                  <span className="icon animate-spin text-lg leading-none">progress_activity</span>
                ) : 'Register'}
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Login here
                </button>
              </p>
            </form>
          )}

          {/* ── PROFILE VIEW (logged in) ── */}
          {view === 'profile' && user && (
            <div className="flex flex-col gap-6">
              {/* Avatar + name */}
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white select-none">
                    {user.firstName?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>

              {/* Info rows */}
              <div className="bg-gray-50 rounded-2xl divide-y divide-gray-100">
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="icon text-purple-500 text-xl leading-none">person</span>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Full Name</p>
                    <p className="text-sm font-semibold text-gray-700">{user.firstName} {user.lastName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="icon text-purple-500 text-xl leading-none">mail</span>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-700">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="icon text-purple-500 text-xl leading-none">calendar_month</span>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Member since</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl font-bold text-red-600 border-2 border-red-100 hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="icon text-xl leading-none">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
