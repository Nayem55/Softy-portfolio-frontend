import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Save, Plus, Trash2, PlusCircle, MinusCircle } from 'lucide-react'

export default function ManageFooter() {
  const { content, updateContent } = useData()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    description: '', copyright: '', tagline: '',
    columns: [{ title: '', links: [{ text: '', href: '' }] }],
  })

  useEffect(() => { if (content?.footer) setForm(content.footer) }, [content])

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleColumnChange = (colIndex, field, value) => {
    setForm(prev => {
      const columns = [...prev.columns]
      columns[colIndex] = { ...columns[colIndex], [field]: value }
      return { ...prev, columns }
    })
  }

  const handleLinkChange = (colIndex, linkIndex, field, value) => {
    setForm(prev => {
      const columns = [...prev.columns]
      const links = [...columns[colIndex].links]
      links[linkIndex] = { ...links[linkIndex], [field]: value }
      columns[colIndex] = { ...columns[colIndex], links }
      return { ...prev, columns }
    })
  }

  const addColumn = () => setForm(prev => ({
    ...prev, columns: [...prev.columns, { title: '', links: [{ text: '', href: '' }] }]
  }))

  const removeColumn = (index) => setForm(prev => ({
    ...prev, columns: prev.columns.filter((_, i) => i !== index)
  }))

  const addLink = (colIndex) => {
    setForm(prev => {
      const columns = [...prev.columns]
      columns[colIndex] = { ...columns[colIndex], links: [...columns[colIndex].links, { text: '', href: '' }] }
      return { ...prev, columns }
    })
  }

  const removeLink = (colIndex, linkIndex) => {
    setForm(prev => {
      const columns = [...prev.columns]
      columns[colIndex] = { ...columns[colIndex], links: columns[colIndex].links.filter((_, i) => i !== linkIndex) }
      return { ...prev, columns }
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try { await updateContent({ footer: form }); toast.success('Footer updated!') }
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
            <h1 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Edit Footer</h1>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-wine)] text-white font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-5">
          <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Footer Info</h2>
          <div>
            <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Description</label>
            <textarea value={form.description} rows={2} onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Copyright</label>
              <input type="text" value={form.copyright} onChange={(e) => handleChange('copyright', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Tagline</label>
              <input type="text" value={form.tagline} onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">Columns</h2>
            <button onClick={addColumn} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-wine)] text-white text-xs font-bold transition-all hover:-translate-y-0.5">
              <Plus size={12} /> Add Column
            </button>
          </div>
          <div className="space-y-6">
            {form.columns?.map((col, ci) => (
              <div key={ci} className="bg-white rounded-xl p-4 border border-[var(--color-line)] space-y-3">
                <div className="flex items-center justify-between">
                  <input type="text" value={col.title} onChange={(e) => handleColumnChange(ci, 'title', e.target.value)}
                    className="px-3 py-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] text-sm font-bold outline-none focus:border-[var(--color-wine)] transition-colors w-48"
                    placeholder="Column title" />
                  <button onClick={() => removeColumn(ci)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                </div>
                <div className="space-y-2">
                  {col.links?.map((link, li) => (
                    <div key={li} className="flex gap-2 items-center">
                      <input type="text" value={link.text} onChange={(e) => handleLinkChange(ci, li, 'text', e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                        placeholder="Link text" />
                      <input type="text" value={link.href} onChange={(e) => handleLinkChange(ci, li, 'href', e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                        placeholder="href" />
                      <button onClick={() => removeLink(ci, li)} className="text-red-400 hover:text-red-600 transition-colors shrink-0">
                        <MinusCircle size={16} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addLink(ci)} className="flex items-center gap-1 text-xs text-[var(--color-wine)] font-bold hover:underline">
                    <PlusCircle size={14} /> Add Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
