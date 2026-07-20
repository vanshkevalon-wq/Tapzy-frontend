import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/admin/Sidebar'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'
import api from '../../services/api'

export default function AdminProfile() {
  const { admin } = useAuth()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setStatus({ type: 'error', msg: 'All fields are required.' })
      return
    }
    if (form.newPassword.length < 6) {
      setStatus({ type: 'error', msg: 'New password must be at least 6 characters.' })
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      setStatus({ type: 'error', msg: 'Passwords do not match.' })
      return
    }

    setLoading(true)
    try {
      await api.put('/auth/password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      setStatus({ type: 'success', msg: 'Password updated successfully!' })
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.message || 'Failed to update password.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen max-w-full overflow-hidden bg-offwhite">
      <Sidebar />

      {/* Content column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top-bar spacer */}
        <div className="md:hidden h-14 flex-shrink-0" />

        <main className="flex-1 overflow-y-auto admin-scroll">
          <div className="p-4 md:p-8 lg:p-10 max-w-3xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>

              <h1 className="text-2xl sm:text-3xl font-bold text-plum mb-8">Profile</h1>

              {/* Info card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 mb-8"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-lavender-500 text-white flex items-center justify-center text-3xl font-bold shadow-glow-sm flex-shrink-0">
                    {admin?.email?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-plum">{admin?.name || 'Admin'}</h2>
                    <p className="text-plum/60 mt-1">{admin?.email}</p>
                  </div>
                </div>
              </motion.div>

              {/* Change password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8"
              >
                <h2 className="text-xl font-bold text-plum mb-6">Change Password</h2>

                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl px-5 py-4 text-sm mb-6 ${
                      status.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-600 border border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {status.type === 'success' ? (
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <p className="font-medium">{status.msg}</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {[
                    { name: 'currentPassword', label: 'Current Password' },
                    { name: 'newPassword', label: 'New Password' },
                    { name: 'confirmPassword', label: 'Confirm New Password' },
                  ].map(({ name, label }) => (
                    <div key={name}>
                      <label htmlFor={name} className="block text-sm font-semibold text-plum mb-2">
                        {label}
                      </label>
                      <input
                        id={name}
                        name={name}
                        type="password"
                        value={form[name]}
                        onChange={handleChange}
                        placeholder="••••••••"
                        autoComplete={name === 'currentPassword' ? 'current-password' : 'new-password'}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                      />
                    </div>
                  ))}
                  <div className="pt-2">
                    <Button type="submit" disabled={loading} variant="primary" size="lg" className="w-full">
                      {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </form>
              </motion.div>

            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
