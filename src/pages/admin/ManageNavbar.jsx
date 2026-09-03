import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'

export default function ManageNavbar() {
  const { content, updateContent } = useData()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ brandName: '', brandInitial: '', ctaBtn: '', links: [{ text: '', href: '' }] })

  useEffect(() => { if (content?.navbar) setForm(content.navbar) }, [content])

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleLinkChange = (index, field, value) => {
    setForm(prev => {
      const links = [...prev.links]
      links[index] = { ...links[index], [field]: value }
      return { ...prev, links }
    })
  }

  const addLink = () => setForm(prev => ({ ...prev, links: [...prev.links, { text: '', href: '' }] }))
  const removeLink = (index) => setForm(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }))

  const handleSave = async () => {
    setSaving(true)
    try { await updateContent({ navbar: form }); toast.success('Navbar updated!') }
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
            <h1 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Edit Navbar</h1>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-wine)] text-white font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-5">
          <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Brand</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Brand Name</label>
              <input type="text" value={form.brandName} onChange={(e) => handleChange('brandName', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Brand Initial</label>
              <input type="text" value={form.brandInitial} onChange={(e) => handleChange('brandInitial', e.target.value.slice(0, 1))}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">CTA Button Text</label>
            <input type="text" value={form.ctaBtn} onChange={(e) => handleChange('ctaBtn', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
          </div>
        </div>

        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Nav Links</h2>
            <button onClick={addLink} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-wine)] text-white text-xs font-bold transition-all hover:-translate-y-0.5">
              <Plus size={12} /> Add Link
            </button>
          </div>
          <div className="space-y-3">
            {form.links?.map((link, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input type="text" value={link.text} onChange={(e) => handleLinkChange(i, 'text', e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                  placeholder="Text" />
                <input type="text" value={link.href} onChange={(e) => handleLinkChange(i, 'href', e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                  placeholder="href" />
                <button onClick={() => removeLink(i)} className="w-9 h-9 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors shrink-0">
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
