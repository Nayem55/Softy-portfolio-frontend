import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Save, Star } from 'lucide-react'

export default function ManageTestimonial() {
  const { content, updateContent } = useData()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ stars: 5, quote: '', person: '', role: '' })

  useEffect(() => { if (content?.testimonial) setForm(content.testimonial) }, [content])

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSave = async () => {
    setSaving(true)
    try { await updateContent({ testimonial: form }); toast.success('Testimonial updated!') }
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
            <h1 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Edit Testimonial</h1>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-wine)] text-white font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-5">
          <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Testimonial Content</h2>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Stars (1-5)</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => handleChange('stars', n)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${n <= form.stars ? 'bg-[var(--color-gold)] text-white' : 'bg-white border border-[var(--color-line)] text-[var(--color-muted)]'}`}>
                  <Star size={18} fill={n <= form.stars ? 'white' : 'none'} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Quote</label>
            <textarea value={form.quote} rows={4} onChange={(e) => handleChange('quote', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Person</label>
              <input type="text" value={form.person} onChange={(e) => handleChange('person', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Role</label>
              <input type="text" value={form.role} onChange={(e) => handleChange('role', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}