import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext({
  admin: null,
  loading: true,
  login: async () => {
    throw new Error('Auth provider is not ready')
  },
  register: async () => {
    throw new Error('Auth provider is not ready')
  },
  logout: () => {},
})

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/auth/me')
        .then(res => setAdmin(res.data.admin))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password })
    localStorage.setItem('token', res.data.token)
    setAdmin(res.data.admin)
    return res.data
  }

  const register = async (username, password) => {
    const res = await api.post('/auth/register', { username, password })
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
