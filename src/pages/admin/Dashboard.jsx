import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  LayoutDashboard, Image, Package, Megaphone, BookOpen, 
  MessageSquare, Mail, Footprints, Navigation, Radio,
  LogOut, ArrowLeft, Settings, FileText
} from 'lucide-react'

const sections = [
  { title: 'Hero Section', desc: 'Main hero with headline, image, floating card', icon: Image, path: '/admin/hero', color: '#7a183a' },
  { title: 'Products', desc: 'Product grid, tags, images, descriptions', icon: Package, path: '/admin/products', color: '#b22d5d' },
  { title: 'Manifesto', desc: 'Philosophy section with quote and stats', icon: Megaphone, path: '/admin/manifesto', color: '#54142c' },
  { title: 'Brand Story', desc: 'Story section with image and items', icon: BookOpen, path: '/admin/story', color: '#2b171b' },
  { title: 'Testimonial', desc: 'Customer testimonial quote', icon: MessageSquare, path: '/admin/testimonial', color: '#c89c5f' },
  { title: 'CTA Section', desc: 'Call to action and contact info', icon: Mail, path: '/admin/cta', color: '#7a183a' },
  { title: 'Footer', desc: 'Footer columns, links, copyright', icon: Footprints, path: '/admin/footer', color: '#756563' },
  { title: 'Navbar', desc: 'Navigation bar and brand', icon: Navigation, path: '/admin/navbar', color: '#b22d5d' },
  { title: 'Marquee', desc: 'Scrolling marquee text items', icon: Radio, path: '/admin/marquee', color: '#54142c' },
  { title: 'Pages', desc: 'Edit collection, story, philosophy, and contact pages', icon: FileText, path: '/admin/pages', color: '#183b7a' },
  { title: 'Brands', desc: 'Manage brand portfolio and logos', icon: Package, path: '/admin/brands', color: '#7a183a' },
  { title: 'Categories', desc: 'Manage product categories', icon: Package, path: '/admin/categories', color: '#b22d5d' },
]

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="bg-[var(--color-paper)] border-b border-[var(--color-line)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-wine)] transition-colors">
              <ArrowLeft size={16} />
              View Site
            </Link>
            <div className="w-px h-6 bg-[var(--color-line)]" />
            <div className="flex items-center gap-3">
              <span
                className="w-[32px] h-[32px] rounded-full grid place-items-center text-white text-sm"
                style={{
                  background: 'linear-gradient(145deg, var(--color-wine), var(--color-berry))',
                  fontFamily: 'var(--font-italiana)',
                }}
              >
                A
              </span>
              <div>
                <h1 className="text-sm font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Global Cosmetics Lines Admin</h1>
                <p className="text-xs text-[var(--color-muted)]">Welcome, {admin?.username}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-white transition-colors"
            >
              <Settings size={14} />
              Preview
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white bg-[var(--color-ink)] hover:bg-[var(--color-wine)] transition-all duration-200"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400 }}>
            Manage Sections
          </h2>
          <p className="text-sm text-[var(--color-muted)] mt-1">Click on any section to edit its content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.path}
                to={section.path}
                className="group bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] hover:shadow-[0_18px_45px_rgba(68,37,42,0.12)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: section.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-ink)] text-sm mb-1">{section.title}</h3>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">{section.desc}</p>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <span className="text-xs font-bold text-[var(--color-wine)] uppercase tracking-wider group-hover:tracking-widest transition-all">
                    Edit →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
