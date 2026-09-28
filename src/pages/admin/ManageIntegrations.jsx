import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useData } from '../../context/DataContext'

const inputClass = 'border border-[var(--color-line)] rounded-lg px-3 py-2'

export default function ManageIntegrations() {
  const { content, updateContent } = useData()
  const [values, setValues] = useState({ ...content?.integrations, emailSettings: content?.emailSettings || {} })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (content) setValues({ ...content.integrations, emailSettings: content.emailSettings || {} })
  }, [content?.integrations, content?.emailSettings])

  const change = (provider, key, value) => setValues(current => ({ ...current, [provider]: { ...current[provider], [key]: value } }))
  const save = async event => {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      await updateContent({ integrations: { googleAnalytics: values.googleAnalytics, facebookPixel: values.facebookPixel, cloudinary: values.cloudinary }, emailSettings: values.emailSettings })
      setMessage('Integrations saved.')
    } catch (error) {
      setMessage(error.response?.data?.error || 'Could not save integrations.')
    } finally {
      setBusy(false)
    }
  }

  const cloudinary = values.cloudinary || {}
  const analytics = [['googleAnalytics', 'Google Analytics', 'Measurement ID', 'measurementId', 'G-XXXXXXXXXX'], ['facebookPixel', 'Facebook Pixel', 'Pixel ID', 'pixelId', '123456789012345']]

  return <div className="min-h-screen bg-[var(--color-bg)]">
    <header className="bg-[var(--color-paper)] border-b border-[var(--color-line)]"><div className="max-w-4xl mx-auto px-6 py-5"><Link to="/admin" className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)]"><ArrowLeft size={16} />Back to admin</Link></div></header>
    <main className="max-w-4xl mx-auto px-6 py-10"><form onSubmit={save} className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-7 space-y-7">
      <div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-widest text-[var(--color-muted)]">Store configuration</p><h1 className="text-3xl text-[var(--color-ink)]">Marketing & integrations</h1></div><button className="button" disabled={busy}><Save size={15} />{busy ? 'Saving...' : 'Save changes'}</button></div>
      <p className="text-sm text-[var(--color-muted)]">Manage Google Analytics, Facebook Pixel, and Cloudinary from the admin panel.</p>
      {analytics.map(([provider, label, field, key, placeholder]) => <section key={provider} className="border-t border-[var(--color-line)] pt-6"><label className="flex gap-3 items-center text-sm font-semibold"><input type="checkbox" checked={!!values[provider]?.enabled} onChange={event => change(provider, 'enabled', event.target.checked)} />{label}</label><input className={`mt-4 w-full ${inputClass}`} aria-label={field} placeholder={placeholder} value={values[provider]?.[key] || ''} onChange={event => change(provider, key, event.target.value)} /></section>)}
      <section className="border-t border-[var(--color-line)] pt-6">
        <label className="flex gap-3 items-center text-sm font-semibold"><input type="checkbox" checked={!!cloudinary.enabled} onChange={event => change('cloudinary', 'enabled', event.target.checked)} />Cloudinary uploads</label>
        <div className="grid md:grid-cols-3 gap-3 mt-4">{[['cloudName', 'Cloud name'], ['uploadPreset', 'Upload preset'], ['folder', 'Folder']].map(([key, label]) => <input key={key} className={inputClass} placeholder={label} value={cloudinary[key] || ''} onChange={event => change('cloudinary', key, event.target.value)} />)}</div>
        <div className="grid md:grid-cols-2 gap-3 mt-3"><input className={inputClass} placeholder={cloudinary.credentialsConfigured ? 'API key saved securely - leave blank to keep' : 'Cloudinary API key'} value={cloudinary.apiKey || ''} onChange={event => change('cloudinary', 'apiKey', event.target.value)} /><input type="password" className={inputClass} placeholder={cloudinary.credentialsConfigured ? 'API secret saved securely - leave blank to keep' : 'Cloudinary API secret'} value={cloudinary.apiSecret || ''} onChange={event => change('cloudinary', 'apiSecret', event.target.value)} /></div>
        <p className="text-sm text-[var(--color-muted)] mt-3">Credentials are encrypted before storage and are never returned to the browser.</p>
      </section>
      <section className="border-t border-[var(--color-line)] pt-6"><h2 className="text-lg font-semibold">Order confirmation email</h2><p className="text-sm text-[var(--color-muted)] mt-2">This portfolio has no checkout order flow yet; these settings are ready for future commerce orders.</p><label className="flex gap-3 items-center text-sm font-semibold mt-4"><input type="checkbox" checked={!!values.emailSettings?.enabled} onChange={event => change('emailSettings', 'enabled', event.target.checked)} />Enable email forwarding</label><input className={`mt-4 w-full ${inputClass}`} placeholder="Forwarding email" value={values.emailSettings?.forwardingEmail || ''} onChange={event => change('emailSettings', 'forwardingEmail', event.target.value)} /></section>
      {message && <p className="text-sm text-[var(--color-muted)]">{message}</p>}
    </form></main>
  </div>
}
