import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('tapzy_token')
    const stored = localStorage.getItem('tapzy_admin')
    if (token && stored) {
      try {
        setAdmin(JSON.parse(stored))
      } catch {
        localStorage.removeItem('tapzy_admin')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('tapzy_token', data.token)
    localStorage.setItem('tapzy_admin', JSON.stringify(data.admin))
    setAdmin(data.admin)
    return data
  }

  const logout = () => {
    localStorage.removeItem('tapzy_token')
    localStorage.removeItem('tapzy_admin')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
