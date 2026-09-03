import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Save, Plus, Trash2, Upload } from 'lucide-react'
import api from '../../api'

export default function ManageHero() {
  const { content, updateContent } = useData()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    eyebrow: '',
    title: '',
    titleItalic: '',
    description: '',
    primaryBtn: '',
    secondaryBtn: '',
    image: '',
    floatingCard: { small: '', title: '', desc: '', image: '' },
    stats: [{ label: '', sublabel: '' }],
  })

  useEffect(() => {
    if (content?.hero) setForm(content.hero)
  }, [content])

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (parent, field, value) => {
    setForm(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }))
  }

  const handleStatChange = (index, field, value) => {
    setForm(prev => {
      const stats = [...prev.stats]
      stats[index] = { ...stats[index], [field]: value }
      return { ...prev, stats }
    })
  }

  const addStat = () => {
    setForm(prev => ({ ...prev, stats: [...prev.stats, { label: '', sublabel: '' }] }))
  }

  const removeStat = (index) => {
    setForm(prev => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }))
  }

  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (field === 'image') {
        handleChange('image', res.data.url)
      } else {
        handleNestedChange('floatingCard', 'image', res.data.url)
      }
      toast.success('Image uploaded!')
    } catch (err) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateContent({ hero: form })
      toast.success('Hero section updated!')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="bg-[var(--color-paper)] border-b border-[var(--color-line)] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-wine)] transition-colors">
              <ArrowLeft size={16} />
              Back
            </Link>
            <h1 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Edit Hero Section</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-wine)] text-white font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Main Content */}
        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-5">
          <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Main Content</h2>
          
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Eyebrow</label>
              <input
                type="text"
                value={form.eyebrow}
                onChange={(e) => handleChange('eyebrow', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Title Italic</label>
              <input
                type="text"
                value={form.titleItalic}
                onChange={(e) => handleChange('titleItalic', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Primary Button</label>
              <input
                type="text"
                value={form.primaryBtn}
                onChange={(e) => handleChange('primaryBtn', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Secondary Button</label>
            <input
              type="text"
              value={form.secondaryBtn}
              onChange={(e) => handleChange('secondaryBtn', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Hero Image */}
        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-4">
          <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Hero Image</h2>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Image URL</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                placeholder="https://... or upload"
              />
              <label className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload size={14} />
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'image')} disabled={uploading} />
              </label>
            </div>
            {form.image && (
              <div className="w-32 h-32 rounded-xl overflow-hidden border border-[var(--color-line)] shrink-0">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Floating Card */}
        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-4">
          <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Floating Card</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Small Text</label>
              <input
                type="text"
                value={form.floatingCard?.small || ''}
                onChange={(e) => handleNestedChange('floatingCard', 'small', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Title</label>
              <input
                type="text"
                value={form.floatingCard?.title || ''}
                onChange={(e) => handleNestedChange('floatingCard', 'title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Description</label>
            <input
              type="text"
              value={form.floatingCard?.desc || ''}
              onChange={(e) => handleNestedChange('floatingCard', 'desc', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
            />
          </div>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Image URL</label>
              <input
                type="text"
                value={form.floatingCard?.image || ''}
                onChange={(e) => handleNestedChange('floatingCard', 'image', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
              />
              <label className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload size={14} />
                Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'floatingCard.image')} disabled={uploading} />
              </label>
            </div>
            {form.floatingCard?.image && (
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-[var(--color-line)] shrink-0">
                <img src={form.floatingCard.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Stats</h2>
            <button
              onClick={addStat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-wine)] text-white text-xs font-bold transition-all hover:-translate-y-0.5"
            >
              <Plus size={12} /> Add Stat
            </button>
          </div>
          <div className="space-y-3">
            {form.stats?.map((stat, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                  placeholder="Label"
                />
                <input
                  type="text"
                  value={stat.sublabel}
                  onChange={(e) => handleStatChange(i, 'sublabel', e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                  placeholder="Sublabel"
                />
                <button
                  onClick={() => removeStat(i)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
