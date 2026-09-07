import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function Footer() {
  const { content } = useData()

  const footer = content?.footer || {
    description: 'The beauty house behind Softyy skincare and Fresh Daily essentials. Feel The Pure Softness.',
    columns: [
      { title: 'Discover', links: [{ text: 'Collection', href: '/collection' }, { text: 'Brand Story', href: '/story' }, { text: 'Philosophy', href: '/philosophy' }] },
      { title: 'Business', links: [{ text: 'Distribution', href: '/contact' }, { text: 'Retail', href: '/contact' }, { text: 'Support', href: '/contact' }] },
      { title: 'Social', links: [{ text: 'Facebook', href: 'https://www.facebook.com/softyybd' }, { text: 'WhatsApp', href: 'https://wa.me/8801911238421' }, { text: 'Email', href: 'mailto:globalcosmeticslines@gmail.com' }] },
    ],
    copyright: '2026 Global Cosmetics Lines. All rights reserved.',
    tagline: 'Feel The Pure Softness.',
  }

  return (
    <footer className="site-footer text-white pt-[52px] pb-[28px]">
      <div className="brand-shell">
        <div className="footer-links">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/brand/gcl-main-logo.png" alt="Global Cosmetics Lines" className="h-[48px] w-auto max-w-none bg-white rounded-[8px] px-3 py-1.5" />
            </Link>
            <p className="max-w-[300px] text-[0.86rem] text-white/55 leading-[1.7] mt-5">
              {footer.description}
            </p>
          </div>

          {footer.columns.map((col, i) => (
            <div key={i}>
              <strong className="text-[0.76rem] uppercase tracking-[0.12em] text-white/80">{col.title}</strong>
              {col.links.map((link, j) => (
                link.href.startsWith('/') ? (
                  <Link key={j} to={link.href} className="block mt-3 text-white/45 text-[0.85rem] hover:text-[var(--color-warm)] transition-colors leading-[1.7]">
                    {link.text}
                  </Link>
                ) : (
                  <a key={j} href={link.href} className="block mt-3 text-white/45 text-[0.85rem] hover:text-[var(--color-warm)] transition-colors leading-[1.7]">
                    {link.text}
                  </a>
                )
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-[34px] pt-[20px] flex justify-between text-white/45 text-[0.75rem] max-sm:flex-col max-sm:gap-2">
          <span>&copy; {footer.copyright}</span>
          <span>{footer.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
