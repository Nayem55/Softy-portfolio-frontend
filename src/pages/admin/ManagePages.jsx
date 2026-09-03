import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react'
import { softyyContent, useData } from '../../context/DataContext'

const pageTabs = [
  { key: 'collection', label: 'Collection' },
  { key: 'story', label: 'Story' },
  { key: 'philosophy', label: 'Philosophy' },
  { key: 'contact', label: 'Contact' },
]

const defaultPages = softyyContent.pages

const mergePages = (incoming = {}) => {
  const merged = {}
  pageTabs.forEach(({ key }) => {
    merged[key] = { ...defaultPages[key], ...(incoming[key] || {}) }
  })
  return merged
}

function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
      />
    </div>
  )
}

function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">{label}</label>
      <textarea
        value={value || ''}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-y"
      />
    </div>
  )
}

function SectionCard({ title, children }) {
  return (
    <section className="bg-[var(--color-paper)] rounded-2xl p-6 border border-[var(--color-line)] space-y-5">
      <h2 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider">{title}</h2>
      {children}
    </section>
  )
}

function SimpleListEditor({ title, items, onChange, placeholder = 'List item' }) {
  const updateItem = (index, value) => onChange(items.map((item, itemIndex) => itemIndex === index ? value : item))
  const addItem = () => onChange([...(items || []), ''])
  const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index))

  return (
    <SectionCard title={title}>
      <div className="space-y-3">
        {(items || []).map((item, index) => (
          <div key={`${title}-${index}`} className="flex gap-3">
            <input
              type="text"
              value={item || ''}
              onChange={(event) => updateItem(index, event.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
            />
            <button type="button" onClick={() => removeItem(index)} className="w-10 h-10 rounded-xl border border-[var(--color-line)] grid place-items-center text-[var(--color-muted)] hover:text-red-600 hover:bg-red-50">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] hover:bg-gray-50 transition-colors">
        <Plus size={14} /> Add Item
      </button>
    </SectionCard>
  )
}

function ObjectListEditor({ title, items, fields, template, onChange }) {
  const updateItem = (index, field, value) => {
    onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item))
  }
  const addItem = () => onChange([...(items || []), template])
  const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index))

  return (
    <SectionCard title={title}>
      <div className="space-y-4">
        {(items || []).map((item, index) => (
          <div key={`${title}-${index}`} className="rounded-xl border border-[var(--color-line)] bg-white/70 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Item {index + 1}</span>
              <button type="button" onClick={() => removeItem(index)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-red-600 hover:bg-red-50">
                <Trash2 size={14} /> Remove
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                field.multiline ? (
                  <div key={field.key} className="md:col-span-2">
                    <TextArea label={field.label} value={item[field.key]} rows={field.rows || 3} onChange={(value) => updateItem(index, field.key, value)} />
                  </div>
                ) : (
                  <Field key={field.key} label={field.label} value={item[field.key]} onChange={(value) => updateItem(index, field.key, value)} />
                )
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={addItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] hover:bg-gray-50 transition-colors">
        <Plus size={14} /> Add Item
      </button>
    </SectionCard>
  )
}

export default function ManagePages() {
  const { content, updateContent } = useData()
  const [activePage, setActivePage] = useState('collection')
  const [pages, setPages] = useState(() => mergePages())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setPages(mergePages(content?.pages))
  }, [content])

  const updatePage = (pageKey, field, value) => {
    setPages((previous) => ({
      ...previous,
      [pageKey]: {
        ...previous[pageKey],
        [field]: value,
      },
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateContent({ pages })
      toast.success('Pages updated!')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const current = pages[activePage] || defaultPages[activePage]

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="bg-[var(--color-paper)] border-b border-[var(--color-line)] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-wine)] transition-colors">
              <ArrowLeft size={16} /> Back
            </Link>
            <h1 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Edit Pages</h1>
          </div>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-wine)] text-white font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {pageTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActivePage(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${activePage === tab.key ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]' : 'bg-white text-[var(--color-ink)] border-[var(--color-line)] hover:bg-[var(--color-rose)]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {activePage === 'collection' && (
            <>
              <SectionCard title="Collection Hero">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Eyebrow" value={current.eyebrow} onChange={(value) => updatePage('collection', 'eyebrow', value)} />
                  <Field label="Category Eyebrow" value={current.categoryEyebrow} onChange={(value) => updatePage('collection', 'categoryEyebrow', value)} />
                </div>
                <Field label="Title" value={current.title} onChange={(value) => updatePage('collection', 'title', value)} />
                <TextArea label="Description" value={current.description} onChange={(value) => updatePage('collection', 'description', value)} />
                <Field label="Category Title" value={current.categoryTitle} onChange={(value) => updatePage('collection', 'categoryTitle', value)} />
              </SectionCard>
              <ObjectListEditor
                title="Collection Trust Items"
                items={current.trustItems || []}
                template={{ title: '', text: '' }}
                fields={[{ key: 'title', label: 'Title' }, { key: 'text', label: 'Text' }]}
                onChange={(items) => updatePage('collection', 'trustItems', items)}
              />
            </>
          )}

          {activePage === 'story' && (
            <>
              <SectionCard title="Story Hero">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Eyebrow" value={current.eyebrow} onChange={(value) => updatePage('story', 'eyebrow', value)} />
                  <Field label="Image URL" value={current.image} onChange={(value) => updatePage('story', 'image', value)} />
                </div>
                <Field label="Title" value={current.title} onChange={(value) => updatePage('story', 'title', value)} />
                <TextArea label="Description" value={current.description} onChange={(value) => updatePage('story', 'description', value)} />
              </SectionCard>
              <ObjectListEditor
                title="Story Stats"
                items={current.stats || []}
                template={{ number: '', label: '' }}
                fields={[{ key: 'number', label: 'Number' }, { key: 'label', label: 'Label' }]}
                onChange={(items) => updatePage('story', 'stats', items)}
              />
              <SectionCard title="Brand Journey">
                <Field label="Journey Eyebrow" value={current.journeyEyebrow} onChange={(value) => updatePage('story', 'journeyEyebrow', value)} />
                <Field label="Journey Title" value={current.journeyTitle} onChange={(value) => updatePage('story', 'journeyTitle', value)} />
              </SectionCard>
              <ObjectListEditor
                title="Story Chapters"
                items={current.chapters || []}
                template={{ label: '', title: '', text: '' }}
                fields={[{ key: 'label', label: 'Label' }, { key: 'title', label: 'Title' }, { key: 'text', label: 'Text', multiline: true }]}
                onChange={(items) => updatePage('story', 'chapters', items)}
              />
              <SectionCard title="Trust Block">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Trust Eyebrow" value={current.trustEyebrow} onChange={(value) => updatePage('story', 'trustEyebrow', value)} />
                  <Field label="Address" value={current.address} onChange={(value) => updatePage('story', 'address', value)} />
                </div>
                <Field label="Trust Title" value={current.trustTitle} onChange={(value) => updatePage('story', 'trustTitle', value)} />
                <TextArea label="Trust Description" value={current.trustDescription} onChange={(value) => updatePage('story', 'trustDescription', value)} />
              </SectionCard>
              <ObjectListEditor
                title="Trust Promise Cards"
                items={current.promises || []}
                template={{ title: '', text: '' }}
                fields={[{ key: 'title', label: 'Title' }, { key: 'text', label: 'Text', multiline: true }]}
                onChange={(items) => updatePage('story', 'promises', items)}
              />
              <SectionCard title="Brand Family">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Family Eyebrow" value={current.familyEyebrow} onChange={(value) => updatePage('story', 'familyEyebrow', value)} />
                  <Field label="Family Title" value={current.familyTitle} onChange={(value) => updatePage('story', 'familyTitle', value)} />
                </div>
              </SectionCard>
            </>
          )}

          {activePage === 'philosophy' && (
            <>
              <SectionCard title="Philosophy Hero">
                <Field label="Eyebrow" value={current.eyebrow} onChange={(value) => updatePage('philosophy', 'eyebrow', value)} />
                <Field label="Title" value={current.title} onChange={(value) => updatePage('philosophy', 'title', value)} />
                <TextArea label="Description" value={current.description} onChange={(value) => updatePage('philosophy', 'description', value)} />
              </SectionCard>
              <SectionCard title="Statement Card">
                <TextArea label="Statement" value={current.statement} onChange={(value) => updatePage('philosophy', 'statement', value)} />
                <TextArea label="Statement Detail" value={current.statementDetail} onChange={(value) => updatePage('philosophy', 'statementDetail', value)} />
              </SectionCard>
              <SectionCard title="Operating Principles Heading">
                <Field label="Principles Eyebrow" value={current.principlesEyebrow} onChange={(value) => updatePage('philosophy', 'principlesEyebrow', value)} />
                <Field label="Principles Title" value={current.principlesTitle} onChange={(value) => updatePage('philosophy', 'principlesTitle', value)} />
              </SectionCard>
              <ObjectListEditor
                title="Operating Principles"
                items={current.principles || []}
                template={{ title: '', text: '' }}
                fields={[{ key: 'title', label: 'Title' }, { key: 'text', label: 'Text', multiline: true }]}
                onChange={(items) => updatePage('philosophy', 'principles', items)}
              />
              <SectionCard title="Quality Checklist Heading">
                <Field label="Checklist Eyebrow" value={current.checklistEyebrow} onChange={(value) => updatePage('philosophy', 'checklistEyebrow', value)} />
                <Field label="Checklist Title" value={current.checklistTitle} onChange={(value) => updatePage('philosophy', 'checklistTitle', value)} />
              </SectionCard>
              <SimpleListEditor title="Quality Checklist Items" items={current.standards || []} onChange={(items) => updatePage('philosophy', 'standards', items)} />
              <SectionCard title="Customer Care Heading">
                <Field label="Care Eyebrow" value={current.careEyebrow} onChange={(value) => updatePage('philosophy', 'careEyebrow', value)} />
                <Field label="Care Title" value={current.careTitle} onChange={(value) => updatePage('philosophy', 'careTitle', value)} />
              </SectionCard>
              <ObjectListEditor
                title="Customer Care Policy Cards"
                items={current.policyCards || []}
                template={{ title: '', detail: '' }}
                fields={[{ key: 'title', label: 'Title' }, { key: 'detail', label: 'Detail', multiline: true }]}
                onChange={(items) => updatePage('philosophy', 'policyCards', items)}
              />
            </>
          )}

          {activePage === 'contact' && (
            <>
              <SectionCard title="Contact Hero">
                <Field label="Eyebrow" value={current.eyebrow} onChange={(value) => updatePage('contact', 'eyebrow', value)} />
                <Field label="Title" value={current.title} onChange={(value) => updatePage('contact', 'title', value)} />
                <TextArea label="Description" value={current.description} onChange={(value) => updatePage('contact', 'description', value)} />
              </SectionCard>
              <SectionCard title="Direct Lines">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Email" type="email" value={current.email} onChange={(value) => updatePage('contact', 'email', value)} />
                  <Field label="Phone" value={current.phone} onChange={(value) => updatePage('contact', 'phone', value)} />
                  <Field label="WhatsApp URL" value={current.whatsappUrl} onChange={(value) => updatePage('contact', 'whatsappUrl', value)} />
                  <Field label="Facebook URL" value={current.facebookUrl} onChange={(value) => updatePage('contact', 'facebookUrl', value)} />
                </div>
              </SectionCard>
              <SimpleListEditor title="Inquiry Types" items={current.inquiryTypes || []} onChange={(items) => updatePage('contact', 'inquiryTypes', items)} />
              <SectionCard title="Office Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Office Title" value={current.officeTitle} onChange={(value) => updatePage('contact', 'officeTitle', value)} />
                  <Field label="Hours Title" value={current.hoursTitle} onChange={(value) => updatePage('contact', 'hoursTitle', value)} />
                </div>
                <TextArea label="Address" value={current.address} onChange={(value) => updatePage('contact', 'address', value)} />
                <TextArea label="Business Hours" value={current.businessHours} rows={4} onChange={(value) => updatePage('contact', 'businessHours', value)} />
              </SectionCard>
              <ObjectListEditor
                title="Support Cards"
                items={current.supportCards || []}
                template={{ title: '', text: '' }}
                fields={[{ key: 'title', label: 'Title' }, { key: 'text', label: 'Text', multiline: true }]}
                onChange={(items) => updatePage('contact', 'supportCards', items)}
              />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
