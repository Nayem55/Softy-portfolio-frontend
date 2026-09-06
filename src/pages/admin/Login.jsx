import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'
import { LogIn } from 'lucide-react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      await login(username, password)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-[132px] h-[52px] rounded-full grid place-items-center bg-white border border-[var(--color-line)] px-3 shadow-[0_12px_40px_rgba(20,32,66,0.12)]">
              <img src="/brand/gcl-main-logo.png" alt="Global Cosmetics Lines" className="softyy-media-contain" />
            </span>
          </div>
          <h1
            className="text-3xl text-[var(--color-ink)] mb-2"
            style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400 }}
          >
            Global Cosmetics Lines Admin
          </h1>
          <p className="text-[var(--color-muted)] text-sm">Sign in to manage the company portfolio</p>
        </div>

        <div className="bg-[var(--color-paper)] rounded-[28px] p-8 shadow-[0_24px_80px_rgba(66,27,38,0.14)] border border-[var(--color-line)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wider">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-white text-[var(--color-ink)] outline-none focus:border-[var(--color-wine)] transition-colors"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-white text-[var(--color-ink)] outline-none focus:border-[var(--color-wine)] transition-colors"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[var(--color-ink)] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-250 hover:-translate-y-0.5 hover:bg-[var(--color-wine)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn size={18} />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-[var(--color-muted)] text-xs">
          Default: admin / admin123
        </p>
      </div>
    </div>
  )
}
