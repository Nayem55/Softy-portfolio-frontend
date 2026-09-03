import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'

export default function ManageMarquee() {
  const { content, updateContent } = useData()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ items: [''] })

  useEffect(() => { if (content?.marquee) setForm(content.marquee) }, [content])

  const handleItemChange = (index, value) => {
    setForm(prev => {
      const items = [...prev.items]
      items[index] = value
      return { ...prev, items }
    })
  }

  const addItem = () => setForm(prev => ({ ...prev, items: [...prev.items, ''] }))
  const removeItem = (index) => setForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }))

  const handleSave = async () => {
    setSaving(true)
    try { await updateContent({ marquee: form }); toast.success('Marquee updated!') }
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
            <h1 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Edit Marquee</h1>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-wine)] text-white font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Marquee Items</h2>
            <button onClick={addItem} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-wine)] text-white text-xs font-bold transition-all hover:-translate-y-0.5">
              <Plus size={12} /> Add Item
            </button>
          </div>
          <p className="text-xs text-[var(--color-muted)]">Each item will be displayed with a ✦ separator in the scrolling marquee.</p>
          <div className="space-y-3">
            {form.items?.map((item, i) => (
              <div key={i} className="flex gap-3 items-center">
                <span className="w-8 h-8 rounded-lg bg-[var(--color-wine)]/10 text-[var(--color-wine)] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <input type="text" value={item} onChange={(e) => handleItemChange(i, e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                  placeholder="Marquee text" />
                <button onClick={() => removeItem(i)} className="w-9 h-9 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)]">
          <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider mb-3">Preview</h2>
          <div className="overflow-hidden bg-[var(--color-ink)] text-white py-4 rounded-xl">
            <div className="w-max flex gap-6 items-center uppercase tracking-[0.14em] text-xs"
              style={{ animation: 'marquee 24s linear infinite' }}>
              {[...form.items, ...form.items].map((item, i) => (
                <span key={i} className="whitespace-nowrap">{item} <span className="text-[var(--color-rose)]">✦</span></span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
