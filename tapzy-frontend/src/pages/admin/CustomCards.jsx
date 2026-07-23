import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../../services/api'

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
      case 'Pending': return 'bg-yellow-500/10 text-yellow-500'
      case 'Reviewed': return 'bg-blue-500/10 text-blue-500'
      case 'Approved': return 'bg-green-500/10 text-green-500'
      case 'Rejected': return 'bg-red-500/10 text-red-500'
      default: return 'bg-white/10 text-white'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Custom Card Requests</h1>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-[#A64BDF] focus:outline-none transition-colors"
          />
          <span className="icon w-4 h-4 text-white/40 absolute left-3 top-3">search</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <span className="icon text-3xl animate-spin text-[#A64BDF]">refresh</span>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-[#111] rounded-xl border border-white/5">
          <p className="text-white/40">No custom card requests found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredRequests.map(req => (
            <motion.div 
              key={req._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] border border-white/5 rounded-xl p-6"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Client Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <span className="icon text-xl text-[#A64BDF]">person</span> {req.name}
                    </h3>
                    <select
                      value={req.status}
                      onChange={(e) => updateStatus(req._id, e.target.value)}
                      className={`text-xs px-3 py-1.5 rounded-full border border-white/10 focus:outline-none ${getStatusColor(req.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/60">
                    <p className="flex items-center gap-2">
                      <span className="icon text-sm">mail</span> {req.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="icon text-sm">phone</span> {req.mobile}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="icon text-sm">work</span> {req.designation}
                    </p>
                  </div>
                  <p className="text-xs text-white/40">Submitted: {new Date(req.createdAt).toLocaleString()}</p>
                </div>

                {/* Uploaded Images */}
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                    <span className="icon text-sm">image</span> Uploaded Assets ({req.images?.length || 0})
                  </h4>
                  {req.images?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {req.images.map((img, idx) => (
                        <a 
                          key={idx} 
                          href={img.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="group relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-[#0A0A0A] flex items-center justify-center hover:border-[#A64BDF] transition-colors"
                        >
                          <img 
                            src={img.url} 
                            alt="Asset" 
                            className="w-full h-full object-cover group-hover:opacity-50 transition-opacity"
                          />
                          <span className="icon absolute opacity-0 group-hover:opacity-100 text-xl text-white transition-opacity">open_in_new</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-white/40 italic">No images uploaded.</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
