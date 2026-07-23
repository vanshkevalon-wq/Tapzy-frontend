import React, { useState } from 'react'
import api from '../../services/api'

export default function CustomCardForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    designation: ''
  })
  const [images, setImages] = useState([null, null, null, null])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (index, e) => {
    const file = e.target.files[0]
    if (file) {
      const newImages = [...images]
      newImages[index] = file
      setImages(newImages)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('mobile', formData.mobile)
      data.append('email', formData.email)
      data.append('designation', formData.designation)
      
      images.forEach(img => {
        if (img) data.append('images', img)
      })

      const response = await api.post('/custom-cards', data)

      setSuccess(true)
      setFormData({ name: '', mobile: '', email: '', designation: '' })
      setImages([null, null, null, null])
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  const fileLabels = [
    'Upload your logo * (PNG, JPEG, SVG, or PDF)',
    'Upload your Image (PNG, JPEG, SVG)',
    'Upload your logo * (PNG, JPEG, SVG, or PDF)',
    'Upload your logo * (PNG, JPEG, SVG, or PDF)'
  ]

  return (
    <div className="max-w-[1151px] mx-auto mt-12 bg-[#1A1A1A] rounded-[24px] p-6 md:p-12 mb-20 font-['Poppins',_sans-serif]">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
        Create your own card
      </h2>

      <p className="text-[#A64BDF] text-lg font-medium mb-8">
        Fill the details to be printed on the card
      </p>

      {error && <div className="text-red-500 mb-6 bg-red-500/10 p-4 rounded-lg">{error}</div>}
      {success && <div className="text-green-500 mb-6 bg-green-500/10 p-4 rounded-lg">Your design request has been submitted successfully! Our team will contact you soon.</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Your Name *</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A64BDF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Mobile No. *</label>
            <input 
              type="tel" 
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A64BDF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Id *</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A64BDF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Designation *</label>
            <input 
              type="text" 
              name="designation"
              required
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A64BDF] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {images.map((img, index) => (
            <div key={index}>
              <label className="block text-white text-sm font-medium mb-2">{fileLabels[index]}</label>
              <div className="relative border border-white/20 rounded-xl h-[160px] flex flex-col items-center justify-center bg-[#0A0A0A]/50 hover:bg-[#0A0A0A] transition-colors group">
                <input 
                  type="file" 
                  accept=".png,.jpeg,.jpg,.svg,.pdf"
                  onChange={(e) => handleFileChange(index, e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-3 group-hover:border-[#A64BDF] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L12 16M12 4L8 8M12 4L16 8M4 17L4 19C4 20.1046 4.89543 21 6 21L18 21C19.1046 21 20 20.1046 20 19L20 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="bg-[#A64BDF] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                  {img ? img.name : 'Upload'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#A64BDF] hover:bg-[#923bc6] text-white font-semibold py-3 px-12 rounded-full transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
