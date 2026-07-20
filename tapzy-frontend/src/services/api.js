import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 60000, // 60s — enough for Cloudinary uploads
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach auth token + handle FormData content-type
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tapzy_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // If body is FormData, let the browser/axios set Content-Type with the correct boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }
  return config
})

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tapzy_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default api
