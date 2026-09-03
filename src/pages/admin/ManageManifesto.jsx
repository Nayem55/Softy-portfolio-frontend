import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'

export default function ManageManifesto() {
  const { content, updateContent } = useData()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    eyebrow: '',
    title: '',
    description: '',
    quote: '',
    stats: [{ number: '', label: '' }],
  })

  useEffect(() => {
    if (content?.manifesto) setForm(content.manifesto)
  }, [content])

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleStatChange = (index, field, value) => {
    setForm(prev => {
      const stats = [...prev.stats]
      stats[index] = { ...stats[index], [field]: value }
      return { ...prev, stats }
    })
  }

  const addStat = () => setForm(prev => ({ ...prev, stats: [...prev.stats, { number: '', label: '' }] }))
  const removeStat = (index) => setForm(prev => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateContent({ manifesto: form })
      toast.success('Manifesto updated!')
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
              <ArrowLeft size={16} /> Back
            </Link>
            <h1 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Edit Manifesto</h1>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-wine)] text-white font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-5">
          <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Content</h2>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Eyebrow</label>
            <input type="text" value={form.eyebrow} onChange={(e) => handleChange('eyebrow', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Title</label>
            <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Description</label>
            <textarea value={form.description} rows={4} onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Quote</label>
            <textarea value={form.quote} rows={3} onChange={(e) => handleChange('quote', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-none" />
          </div>
        </div>

        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Stats</h2>
            <button onClick={addStat} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-wine)] text-white text-xs font-bold transition-all hover:-translate-y-0.5">
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="space-y-3">
            {form.stats?.map((stat, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input type="text" value={stat.number} onChange={(e) => handleStatChange(i, 'number', e.target.value)}
                  className="w-20 px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" placeholder="01" />
                <input type="text" value={stat.label} onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" placeholder="Label" />
                <button onClick={() => removeStat(i)} className="w-9 h-9 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors shrink-0">
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