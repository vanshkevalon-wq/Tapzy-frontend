import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../../services/api'
import Sidebar from '../../components/admin/Sidebar'
import { PageLoader } from '../../components/common/Loader'

export default function CustomCards() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/custom-cards')
      setRequests(data)
    } catch (err) {
      alert('Failed to load custom card requests')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/custom-cards/${id}/status`, { status: newStatus })
      alert('Status updated')
      setRequests(requests.map(r => r._id === id ? { ...r, status: newStatus } : r))
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const filteredRequests = requests.filter(req => 
    req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.mobile.includes(searchTerm)
  )

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-500/10 text-yellow-600'
      case 'Reviewed': return 'bg-blue-500/10 text-blue-600'
      case 'Approved': return 'bg-green-500/10 text-green-600'
      case 'Rejected': return 'bg-red-500/10 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
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
          <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-plum">Custom Card Requests</h1>
                  <p className="text-plum/60 text-sm mt-1">
                    {requests.length} total request{requests.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-plum/10 rounded-lg pl-10 pr-4 py-2 text-plum focus:border-primary-500 focus:outline-none transition-colors shadow-sm"
                  />
                  <span className="icon w-4 h-4 text-plum/40 absolute left-3 top-2.5">search</span>
                </div>
              </div>

              {loading ? (
                <PageLoader />
              ) : filteredRequests.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-lavender-100 text-lavender-600 mb-4">
                    <span className="icon text-5xl">badge</span>
                  </div>
                  <h3 className="text-xl font-semibold text-plum mb-2">No custom card requests found</h3>
                  <p className="text-plum/60">New requests will appear here when clients submit the form.</p>
                </motion.div>
              ) : (
                <div className="grid gap-6">
                  {filteredRequests.map(req => (
                    <motion.div 
                      key={req._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-plum/10 shadow-sm rounded-xl p-6"
                    >
                      <div className="flex flex-col lg:flex-row gap-8">
                        {/* Client Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold text-plum flex items-center gap-2">
                              <span className="icon text-xl text-primary-500">person</span> {req.name}
                            </h3>
                            <select
                              value={req.status}
                              onChange={(e) => updateStatus(req._id, e.target.value)}
                              className={`text-xs px-3 py-1.5 font-medium rounded-full border border-plum/10 focus:outline-none ${getStatusColor(req.status)} cursor-pointer`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Reviewed">Reviewed</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-plum/80">
                            <p className="flex items-center gap-2">
                              <span className="icon text-sm text-plum/50">mail</span> {req.email}
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="icon text-sm text-plum/50">phone</span> {req.mobile}
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="icon text-sm text-plum/50">work</span> {req.designation}
                            </p>
                          </div>
                          <p className="text-xs text-plum/40">Submitted: {new Date(req.createdAt).toLocaleString()}</p>
                        </div>

                        {/* Uploaded Images */}
                        <div className="flex-1">
                          <h4 className="text-plum text-sm font-medium mb-3 flex items-center gap-2">
                            <span className="icon text-sm text-plum/50">image</span> Uploaded Assets ({req.images?.length || 0})
                          </h4>
                          {req.images?.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              {req.images.map((img, idx) => (
                                <a 
                                  key={idx} 
                                  href={img.url} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="group relative aspect-square rounded-lg overflow-hidden border border-plum/10 bg-offwhite flex items-center justify-center hover:border-primary-500 transition-colors"
                                >
                                  <img 
                                    src={img.url} 
                                    alt="Asset" 
                                    className="w-full h-full object-cover group-hover:opacity-50 transition-opacity"
                                  />
                                  <span className="icon absolute opacity-0 group-hover:opacity-100 text-xl text-primary-500 transition-opacity drop-shadow-md">open_in_new</span>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <div className="text-sm text-plum/40 italic">No images uploaded.</div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
