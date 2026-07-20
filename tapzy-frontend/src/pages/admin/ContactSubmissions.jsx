import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/admin/Sidebar'
import ContactTable from '../../components/admin/ContactTable'
import api from '../../services/api'
import { PageLoader } from '../../components/common/Loader'

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSubmissions = () => {
    setLoading(true)
    api
      .get('/contact')
      .then(({ data }) => setSubmissions(data))
      .catch((err) => {
        console.error('Failed to fetch submissions:', err)
        alert('Failed to load contact submissions')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchSubmissions() }, [])

  const handleMarkRead = async (id) => {
    try {
      await api.patch(`/contact/${id}/read`)
      setSubmissions((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: 'read' } : s))
      )
    } catch (err) {
      console.error('Failed to mark as read:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this submission?')) return
    try {
      await api.delete(`/contact/${id}`)
      setSubmissions((prev) => prev.filter((s) => s._id !== id))
    } catch (err) {
      console.error('Failed to delete submission:', err)
      alert('Failed to delete submission')
    }
  }

  const unreadCount = submissions.filter((s) => s.status === 'unread').length

  return (
    <div className="flex h-screen w-screen max-w-full overflow-hidden bg-offwhite">
      <Sidebar />
      {/* Content column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top-bar spacer */}
        <div className="md:hidden h-14 flex-shrink-0" />
        <main className="flex-1 overflow-y-auto admin-scroll">
          <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-plum">Contact Submissions</h1>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-plum/60 text-sm">
                    {submissions.length} total submission{submissions.length !== 1 ? 's' : ''}
                  </p>
                  {unreadCount > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
              </div>
              {loading ? (
                <PageLoader />
              ) : submissions.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-lavender-100 text-lavender-600 mb-4">
                    <span className="icon text-5xl">mail</span>
                  </div>
                  <h3 className="text-xl font-semibold text-plum mb-2">No submissions yet</h3>
                  <p className="text-plum/60">Contact form submissions will appear here</p>
                </motion.div>
              ) : (
                <ContactTable submissions={submissions} onMarkRead={handleMarkRead} onDelete={handleDelete} />
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
