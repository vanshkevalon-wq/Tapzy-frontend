import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const UserAuthContext = createContext(null)

export function UserAuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session on mount
  useEffect(() => {
    const token  = localStorage.getItem('tapzy_user_token')
    const stored = localStorage.getItem('tapzy_user')
    if (token && stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem('tapzy_user') }
    }
    setLoading(false)
  }, [])

  const register = async (firstName, lastName, email, password) => {
    const { data } = await api.post('/users/register', { firstName, lastName, email, password })
    return data
  }

  const login = async (email, password) => {
    const { data } = await api.post('/users/login', { email, password })
    localStorage.setItem('tapzy_user_token', data.token)
    localStorage.setItem('tapzy_user', JSON.stringify(data.user))
    setUser(data.user)
    return data
  }

  const logout = () => {
    localStorage.removeItem('tapzy_user_token')
    localStorage.removeItem('tapzy_user')
    setUser(null)
  }

  return (
    <UserAuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext)
  if (!ctx) throw new Error('useUserAuth must be used within <UserAuthProvider>')
  return ctx
}
