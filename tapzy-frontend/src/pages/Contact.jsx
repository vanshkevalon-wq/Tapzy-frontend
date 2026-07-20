import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api'

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' }

const contactInfo = [
  {
    icon: <span className="icon text-xl">mail</span>,
    label: 'Email',
    value: 'sales@tapzy.com',
  },
  {
    icon: <span className="icon text-xl">call</span>,
    label: 'Phone',
    value: '+91 9725247990',
  },
  {
    icon: <span className="icon text-xl">schedule</span>,
    label: 'Support Hours',
    value: 'Mon–Sat, 9AM–6PM IST',
  },
]

export default function Contact() {
  const [form, setForm]   = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await api.post('/contact', form)
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-offwhite min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-gradient py-14 px-4">
        <div className="absolute inset-0 bg-hero-mesh opacity-30" />
        <div className="relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-3">Get in Touch</h1>
            <p className="text-white/70 text-lg">Have a question or ready to order? We're here to help.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-plum mb-6">Contact Information</h2>
            {contactInfo.map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-primary-50 shadow-card">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-plum/40 font-medium mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-plum">{value}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden border border-primary-50 shadow-card h-48">
              <div className="w-full h-full bg-gradient-to-br from-primary-50 to-lavender-50 flex items-center justify-center">
                <div className="text-center text-plum/40">
                  <span className="icon text-5xl text-primary-200 block mb-2">location_on</span>
                  <p className="text-sm">Worldwide Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-primary-50 shadow-card p-8">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 rounded-2xl px-5 py-4 mb-6 flex items-center gap-3 text-sm"
                >
                  <span className="icon text-xl flex-shrink-0">check_circle</span>
                  Message sent! We'll get back to you within 24 hours.
                </motion.div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-5 py-4 mb-6 text-sm">
                  Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: 'name',  label: 'Full Name',    type: 'text',  placeholder: 'Jane Doe' },
                    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
                    { name: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+91 98765 43210' },
                    { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Product inquiry...' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label htmlFor={name} className="block text-xs font-semibold text-plum/60 mb-1.5 uppercase tracking-wide">{label}</label>
                      <input
                        id={name} name={name} type={type}
                        value={form[name]} onChange={handleChange}
                        placeholder={placeholder}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400
                          ${errors[name] ? 'border-red-300 bg-red-50' : 'border-primary-100 bg-offwhite focus:border-primary-300'}`}
                      />
                      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-plum/60 mb-1.5 uppercase tracking-wide">Message</label>
                  <textarea
                    id="message" name="message" rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="Tell us what you need..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none
                      ${errors.message ? 'border-red-300 bg-red-50' : 'border-primary-100 bg-offwhite focus:border-primary-300'}`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
