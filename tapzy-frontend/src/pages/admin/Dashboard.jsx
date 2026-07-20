import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import DashboardStats from '../../components/admin/DashboardStats'
import api from '../../services/api'
import { PageLoader } from '../../components/common/Loader'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const { admin }             = useAuth()
  const [stats, setStats]     = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/stats')
      .then(({ data }) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const quickLinks = [
    {
      to: '/admin/products',
      label: 'Manage Products',
      desc: 'Add, edit or remove product listings',
      icon: <span className="icon text-2xl">inventory_2</span>,
      color: 'bg-primary-50 text-primary-600',
    },
    {
      to: '/admin/contacts',
      label: 'Contact Submissions',
      desc: 'View and respond to enquiries',
      icon: <span className="icon text-2xl">mail</span>,
      color: 'bg-lavender-50 text-lavender-600',
    },
    {
      to: '/admin/profile',
      label: 'Admin Profile',
      desc: 'Update your account settings',
      icon: <span className="icon text-2xl">manage_accounts</span>,
      color: 'bg-primary-50 text-primary-500',
    },
  ]

  return (
    <div className="flex h-screen w-screen max-w-full overflow-hidden bg-offwhite">
      <Sidebar />
      {/* Content column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top-bar spacer */}
        <div className="md:hidden h-14 flex-shrink-0" />
        <main className="flex-1 overflow-y-auto admin-scroll">
          <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-plum">Good day, {admin?.name || 'Admin'} 👋</h1>
                <p className="text-plum/50 text-sm mt-1">Here's what's happening with Tapzy today.</p>
              </div>
              {loading ? (
                <PageLoader />
              ) : (
                <>
                  <DashboardStats stats={stats} />
                  <div className="mt-10">
                    <h2 className="text-lg font-bold text-plum mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {quickLinks.map(({ to, label, desc, icon, color }) => (
                        <Link key={to} to={to}
                          className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-card-hover hover:border-primary-100 transition-all duration-200"
                        >
                          <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            {icon}
                          </div>
                          <h3 className="font-bold text-plum text-sm mb-1">{label}</h3>
                          <p className="text-xs text-plum/50">{desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
