import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { motion, AnimatePresence } from 'framer-motion'
import BrandGlyph from './BrandGlyph'

export default function Navbar() {
  const { content } = useData()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuButton = useRef(null)
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  const navbar = content?.navbar || {
    brandName: 'Global Cosmetics Lines',
    brandInitial: 'G',
    logo: '/brand/gcl-main-logo.png',
    links: [
      { text: 'Collection', href: '/collection' },
      { text: 'Our brands', href: '/brands' },
      { text: 'Philosophy', href: '/philosophy' },
      { text: 'Our Story', href: '/story' },
    ],
    ctaBtn: 'Explore Beauty',
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [mobileOpen])

  const resolveNavHref = (link) => {
    const text = link.text?.toLowerCase() || ''
    if (text.includes('collection')) return '/collection'
    if (text.includes('brand')) return '/brands'
    if (text.includes('story')) return '/story'
    if (text.includes('philosophy') || text.includes('value')) return '/philosophy'
    if (text.includes('contact') || text.includes('support')) return '/contact'
    return link.href || '/'
  }

  const centerLinks = [
    { text: 'Collection', href: '/collection' },
    { text: 'Our brands', href: '/brands' },
    { text: 'Philosophy', href: '/philosophy' },
    { text: 'Our story', href: '/story' },
  ].map((required) => navbar.links?.find((link) => resolveNavHref(link) === required.href) || required)

  const dockLinks = [
    { text: 'Home', href: '/', mark: 'HO' },
    { text: 'Shop', href: '/collection', mark: 'SH' },
    { text: 'Story', href: '/story', mark: 'ST' },
    { text: 'Contact', href: '/contact', mark: 'CO' },
  ]

  return (
    <>
      <a className="skip-link" href="#top">Skip to content</a>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-[18px] border-b border-[var(--color-line)] shadow-[0_10px_30px_rgba(31,43,91,0.06)]'
            : 'bg-white border-b border-[var(--color-line)]'
        }`}
      >
        <div className="brand-shell grid grid-cols-[1fr_auto_1fr] items-center h-[80px] max-lg:flex max-lg:justify-between max-md:h-[66px]">
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label={navbar.brandName || 'Global Cosmetics Lines'}>
            <img
              src={navbar.logo || '/brand/gcl-main-logo.png'}
              alt={navbar.brandName || 'Global Cosmetics Lines'}
              className="h-[46px] w-auto max-w-none object-contain max-md:h-[42px]"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
            {centerLinks.map((link, i) => {
              const href = resolveNavHref(link)
              const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`)
              return (
                <Link
                  key={i}
                  to={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`nav-link text-[0.82rem] font-medium transition-colors duration-200 ${
                    isActive ? 'active text-[var(--color-primary)]' : 'text-[var(--color-ink)]'
                  }`}
                >
                  {link.text}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center justify-end gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-[12px] px-5 py-3 border border-[var(--color-line)] bg-white text-[var(--color-ink)] text-[0.84rem] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-rose)]"
            >
              Contact
            </Link>
            <Link
              to="/collection"
              className="inline-flex items-center gap-1.5 rounded-[12px] px-5 py-3 gcl-button text-white text-[0.84rem] font-bold transition-all duration-300 hover:-translate-y-0.5"
            >
              {navbar.ctaBtn}
              <BrandGlyph label="arrow" tone="button" />
            </Link>
          </div>

          <button
            ref={menuButton}
            type="button"
            className="lg:hidden w-[44px] h-[44px] rounded-[8px] bg-white flex items-center justify-center border border-[var(--color-line)] text-[var(--color-primary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <span className={`menu-mark ${mobileOpen ? 'open' : ''}`} aria-hidden="true" />
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
            className="fixed inset-0 z-[999] bg-white pt-[96px] max-md:pt-[84px] px-6 pb-[100px] overflow-y-auto lg:hidden"
          >
            <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col gap-2 max-w-[560px] mx-auto">
            {[...centerLinks, { text: 'Contact', href: '/contact' }].map((link, i) => {
                const href = resolveNavHref(link)
                const isActive = location.pathname === href
                return (
                  <Link
                    key={i}
                    to={href}
                    aria-current={isActive ? 'page' : undefined}
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
                className="inline-flex items-center justify-center gap-2 rounded-[8px] px-6 py-4 gcl-button text-white font-semibold text-[0.95rem] mt-4"
                onClick={() => setMobileOpen(false)}
              >
                {navbar.ctaBtn}
                <BrandGlyph label="arrow" tone="button" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAdmin && (
        <nav className="mobile-dock md:hidden" aria-label="Quick navigation">
          {dockLinks.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
            return (
              <Link key={item.href} to={item.href} aria-current={isActive ? 'page' : undefined} className={isActive ? 'active' : ''}>
                <BrandGlyph label={item.mark} tone={isActive ? 'dockActive' : 'dock'} />
                <span>{item.text}</span>
              </Link>
            )
          })}
        </nav>
      )}
    </>
  )
}
