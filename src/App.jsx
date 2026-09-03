import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Collection from './pages/Collection'
import StoryPage from './pages/Story'
import Philosophy from './pages/Philosophy'
import Contact from './pages/Contact'
import Brands from './pages/Brands'
import BrandDetail from './pages/BrandDetail'
import Categories from './pages/Categories'
import CategoryDetail from './pages/CategoryDetail'
import ProductDetail from './pages/ProductDetail'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import ManageHero from './pages/admin/ManageHero'
import ManageProducts from './pages/admin/ManageProducts'
import ManageManifesto from './pages/admin/ManageManifesto'
import ManageStory from './pages/admin/ManageStory'
import ManageTestimonial from './pages/admin/ManageTestimonial'
import ManageCTA from './pages/admin/ManageCTA'
import ManageFooter from './pages/admin/ManageFooter'
import ManageNavbar from './pages/admin/ManageNavbar'
import ManageMarquee from './pages/admin/ManageMarquee'
import ManageBrands from './pages/admin/ManageBrands'
import ManageCategories from './pages/admin/ManageCategories'
import ManagePages from './pages/admin/ManagePages'

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth() || { admin: null, loading: true }
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-muted)]">Loading...</div>
  if (!admin) return <Navigate to="/admin/login" replace />
  return children
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <ScrollToTop />
          <Toaster position="top-right" toastOptions={{ style: { background: 'var(--color-paper)', color: 'var(--color-ink)', border: '1px solid var(--color-line)' } }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:slug" element={<BrandDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:slug" element={<CategoryDetail />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/hero" element={<ProtectedRoute><ManageHero /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute><ManageProducts /></ProtectedRoute>} />
            <Route path="/admin/manifesto" element={<ProtectedRoute><ManageManifesto /></ProtectedRoute>} />
            <Route path="/admin/story" element={<ProtectedRoute><ManageStory /></ProtectedRoute>} />
            <Route path="/admin/testimonial" element={<ProtectedRoute><ManageTestimonial /></ProtectedRoute>} />
            <Route path="/admin/cta" element={<ProtectedRoute><ManageCTA /></ProtectedRoute>} />
            <Route path="/admin/footer" element={<ProtectedRoute><ManageFooter /></ProtectedRoute>} />
            <Route path="/admin/navbar" element={<ProtectedRoute><ManageNavbar /></ProtectedRoute>} />
            <Route path="/admin/marquee" element={<ProtectedRoute><ManageMarquee /></ProtectedRoute>} />
            <Route path="/admin/brands" element={<ProtectedRoute><ManageBrands /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute><ManageCategories /></ProtectedRoute>} />
            <Route path="/admin/pages" element={<ProtectedRoute><ManagePages /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
