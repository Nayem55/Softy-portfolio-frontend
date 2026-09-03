import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'

export default function Navbar() {
  const { content } = useData()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navbar = content?.navbar || {
    brandName: 'SOFTYY',
    brandInitial: 'S',
    links: [
      { text: 'Collection', href: '/collection' },
      { text: 'Our Story', href: '/story' },
      { text: 'Philosophy', href: '/philosophy' },
      { text: 'Contact', href: '/contact' },
    ],
    ctaBtn: 'Explore Beauty',
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const resolveNavHref = (link) => {
    const text = link.text?.toLowerCase() || ''
    if (text.includes('collection')) return '/collection'
    if (text.includes('story')) return '/story'
    if (text.includes('philosophy') || text.includes('value')) return '/philosophy'
    if (text.includes('contact') || text.includes('support')) return '/contact'
    return link.href || '/'
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(251,248,242,0.92)] backdrop-blur-[16px] border-b border-[var(--color-line)]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-[min(1200px,calc(100%-48px))] mx-auto flex items-center justify-between h-[72px] max-md:h-[64px]">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/brand/softyy-logo.png" alt="Softyy" className="h-[42px] w-auto max-w-none max-md:h-[36px]" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navbar.links.map((link, i) => {
              const href = resolveNavHref(link)
              const isActive = location.pathname === href
              return (
                <Link
                  key={i}
                  to={href}
                  className={`nav-link text-[0.88rem] font-medium transition-colors duration-200 ${
                    isActive ? 'active text-[var(--color-primary)]' : 'text-[var(--color-ink)]'
                  }`}
                >
                  {link.text}
                </Link>
              )
            })}
            <Link
              to="/collection"
              className="inline-flex items-center gap-1.5 rounded-[8px] px-5 py-2.5 bg-[var(--color-ink)] text-white text-[0.82rem] font-semibold transition-all duration-300 hover:bg-[var(--color-primary)] hover:shadow-[0_8px_24px_rgba(22,24,33,0.18)]"
            >
              {navbar.ctaBtn}
              <ChevronRight size={14} />
            </Link>
          </nav>

          <button
            className="md:hidden w-[44px] h-[44px] rounded-[8px] bg-[var(--color-rose)] flex items-center justify-center border border-[var(--color-line)] text-[var(--color-ink)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-[var(--color-bg)] pt-[80px] px-6"
          >
            <nav className="flex flex-col gap-2">
            {navbar.links.map((link, i) => {
                const href = resolveNavHref(link)
                const isActive = location.pathname === href
                return (
                  <Link
                    key={i}
                    to={href}
                    className={`px-4 py-4 rounded-[8px] text-[1.1rem] font-medium transition-all border-b border-[var(--color-line)] ${
                      isActive
                        ? 'text-[var(--color-primary)] bg-[rgba(26,58,143,0.05)]'
                        : 'text-[var(--color-ink)]'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.text}
                  </Link>
                )
              })}
              <Link
                to="/collection"
                className="inline-flex items-center justify-center gap-2 rounded-[8px] px-6 py-4 bg-[var(--color-ink)] text-white font-semibold text-[0.95rem] mt-4"
                onClick={() => setMobileOpen(false)}
              >
                {navbar.ctaBtn}
                <ChevronRight size={16} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
