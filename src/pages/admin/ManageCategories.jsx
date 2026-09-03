import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Save, Plus, Trash2, Upload, Edit3, X } from 'lucide-react'
import api from '../../api'

const emptyCategory = { name: '', slug: '', image: '', description: '', order: 0 }

export default function ManageCategories() {
  const { categories, createCategory, updateCategory, deleteCategory, fetchCategories } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ ...emptyCategory })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => { fetchCategories() }, [])

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))
  const generateSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

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

  const openAdd = () => { setForm({ ...emptyCategory }); setEditing(null); setShowForm(true) }
  const openEdit = (cat) => { setForm({ ...cat }); setEditing(cat._id); setShowForm(true) }

  const handleSave = async () => {
    if (!form.name) { toast.error('Name is required'); return }
    setSaving(true)
    try {
      const data = { ...form, slug: form.slug || generateSlug(form.name) }
      if (editing) { await updateCategory(editing, data); toast.success('Category updated!') }
      else { await createCategory(data); toast.success('Category created!') }
      setShowForm(false); setEditing(null); setForm({ ...emptyCategory })
    } catch (err) { toast.error(err.response?.data?.error || 'Save failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return
    try { await deleteCategory(id); toast.success('Category deleted!') }
    catch (err) { toast.error('Delete failed') }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="bg-[var(--color-paper)] border-b border-[var(--color-line)] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-wine)] transition-colors"><ArrowLeft size={16} /> Back</Link>
            <h1 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Manage Categories</h1>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-wine)] font-bold text-sm transition-all hover:-translate-y-0.5" style={{ color: '#ffffff' }}>
            <Plus size={16} /> Add Category
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-[var(--color-paper)] rounded-2xl p-6 w-full max-w-lg border border-[var(--color-line)] shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>{editing ? 'Edit Category' : 'Add Category'}</h2>
                <button onClick={() => { setShowForm(false); setEditing(null) }} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Name *</label>
                    <input type="text" value={form.name} onChange={(e) => { handleChange('name', e.target.value); if (!editing) handleChange('slug', generateSlug(e.target.value)) }}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Slug</label>
                    <input type="text" value={form.slug} onChange={(e) => handleChange('slug', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Description</label>
                  <textarea value={form.description} rows={3} onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Image</label>
                  <div className="flex gap-3 items-start">
                    <input type="text" value={form.image} onChange={(e) => handleChange('image', e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" placeholder="URL or upload" />
                    <label className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload size={14} /> {uploading ? '...' : 'Upload'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  </div>
                  {form.image && <div className="mt-3 w-full h-40 rounded-xl overflow-hidden border border-[var(--color-line)] softyy-media-frame p-3"><img src={form.image} alt="Preview" className="softyy-media-contain" /></div>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Order</label>
                  <input type="number" value={form.order} onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-wine)] font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50" style={{ color: '#ffffff' }}>
                    <Save size={16} /> {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                  </button>
                  <button onClick={() => { setShowForm(false); setEditing(null) }} className="px-5 py-3 rounded-xl border border-[var(--color-line)] text-sm font-bold text-[var(--color-ink)] hover:bg-gray-50 transition-colors">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {categories.length === 0 && <p className="text-center py-16 text-[var(--color-muted)]">No categories yet.</p>}
          {categories.map((cat) => (
            <div key={cat._id} className="bg-[var(--color-paper)] rounded-2xl p-5 border border-[var(--color-line)] flex gap-5 items-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-[var(--color-line)] shrink-0 softyy-media-frame p-2">
                {cat.image ? <img src={cat.image} alt={cat.name} className="softyy-media-contain" /> : <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)] text-xs">No img</div>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[var(--color-ink)] text-sm">{cat.name}</h3>
                <p className="text-xs text-[var(--color-muted)] truncate mt-0.5">{cat.description}</p>
                <span className="text-[0.65rem] text-[var(--color-muted)]">Slug: {cat.slug}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(cat)} className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--color-wine)] hover:bg-[var(--color-wine)]/10 transition-colors"><Edit3 size={16} /></button>
                <button onClick={() => handleDelete(cat._id)} className="w-9 h-9 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
