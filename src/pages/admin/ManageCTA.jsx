import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Save, Upload } from 'lucide-react'
import api from '../../api'

export default function ManageCTA() {
  const { content, updateContent } = useData()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ eyebrow: '', title: '', description: '', email: '', image: '' })

  useEffect(() => { if (content?.cta) setForm(content.cta) }, [content])

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      handleChange('image', res.data.url)
      toast.success('Image uploaded!')
    } catch { toast.error('Upload failed') } finally { setUploading(false) }
  }

  const handleSave = async () => {
    setSaving(true)
    try { await updateContent({ cta: form }); toast.success('CTA updated!') }
    catch (err) { toast.error(err.response?.data?.error || 'Save failed') }
    finally { setSaving(false) }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="bg-[var(--color-paper)] border-b border-[var(--color-line)] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-wine)] transition-colors">
              <ArrowLeft size={16} /> Back
            </Link>
            <h1 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Edit CTA Section</h1>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-wine)] text-white font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-5">
          <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">CTA Content</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Eyebrow</label>
              <input type="text" value={form.eyebrow} onChange={(e) => handleChange('eyebrow', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Email</label>
              <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Title</label>
            <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Description</label>
            <textarea value={form.description} rows={3} onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-none" />
          </div>
        </div>

        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-4">
          <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Background Image</h2>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <input type="text" value={form.image} onChange={(e) => handleChange('image', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" placeholder="Image URL" />
              <label className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
            {form.image && (
              <div className="w-48 h-28 rounded-xl overflow-hidden border border-[var(--color-line)] shrink-0">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}