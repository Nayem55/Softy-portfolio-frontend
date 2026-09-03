import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Plus, Trash2, Save, Upload, GripVertical, Edit3, X } from 'lucide-react'
import api from '../../api'

const emptyProduct = {
  title: '', slug: '', desc: '', tag: '', image: '', size: 'third', order: 0,
  brand: '', category: '', price: '', features: '', details: '', isNew: false, inStock: true
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ManageProducts() {
  const { products, createProduct, updateProduct, deleteProduct, fetchProducts, brands, categories, fetchBrands, fetchCategories } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ ...emptyProduct })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [slugEdited, setSlugEdited] = useState(false)

  useEffect(() => { fetchProducts(); fetchBrands(); fetchCategories() }, [])

  const handleChange = (field, value) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value }
      if (field === 'title' && !slugEdited) {
        updated.slug = slugify(value)
      }
      return updated
    })
  }

  const handleSlugChange = (value) => {
    setSlugEdited(true)
    setForm(prev => ({ ...prev, slug: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      handleChange('image', res.data.url)
      toast.success('Image uploaded!')
    } catch (err) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const openAdd = () => {
    setForm({ ...emptyProduct })
    setEditing(null)
    setSlugEdited(false)
    setShowForm(true)
  }

  const openEdit = (product) => {
    setForm({
      ...emptyProduct,
      ...product,
      brand: product.brand?._id || product.brand || '',
      category: product.category?._id || product.category || '',
      price: product.price ?? '',
      features: Array.isArray(product.features) ? product.features.join('\n') : (product.features || ''),
      details: product.details || '',
    })
    setEditing(product._id)
    setSlugEdited(!!product.slug)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.title) { toast.error('Title is required'); return }
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: form.price !== '' ? Number(form.price) : undefined,
        features: form.features ? form.features.split('\n').map(f => f.trim()).filter(Boolean) : [],
      }
      if (editing) {
        await updateProduct(editing, payload)
        toast.success('Product updated!')
      } else {
        await createProduct(payload)
        toast.success('Product created!')
      }
      setShowForm(false)
      setEditing(null)
      setForm({ ...emptyProduct })
      setSlugEdited(false)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await deleteProduct(id)
      toast.success('Product deleted!')
    } catch (err) {
      toast.error('Delete failed')
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="bg-[var(--color-paper)] border-b border-[var(--color-line)] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-wine)] transition-colors">
              <ArrowLeft size={16} />
              Back
            </Link>
            <h1 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>Manage Products</h1>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-wine)] text-white font-bold text-sm transition-all hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-[var(--color-paper)] rounded-2xl p-6 w-full max-w-lg border border-[var(--color-line)] shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)' }}>
                  {editing ? 'Edit Product' : 'Add Product'}
                </h2>
                <button onClick={() => { setShowForm(false); setEditing(null); setSlugEdited(false) }} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Title *</label>
                    <input
                      type="text" value={form.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Slug</label>
                    <input
                      type="text" value={form.slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                      placeholder="auto-generated-from-title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Tag</label>
                    <input
                      type="text" value={form.tag}
                      onChange={(e) => handleChange('tag', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Price</label>
                    <input
                      type="number" value={form.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Brand</label>
                    <select
                      value={form.brand}
                      onChange={(e) => handleChange('brand', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                    >
                      <option value="">No Brand</option>
                      {brands.map(b => (
                        <option key={b._id} value={b._id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                    >
                      <option value="">No Category</option>
                      {categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Description</label>
                  <textarea
                    value={form.desc} rows={2}
                    onChange={(e) => handleChange('desc', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Features (one per line)</label>
                  <textarea
                    value={form.features} rows={3}
                    onChange={(e) => handleChange('features', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-none"
                    placeholder="Cruelty-free&#10;Vegan&#10;Long-lasting"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Details</label>
                  <textarea
                    value={form.details} rows={3}
                    onChange={(e) => handleChange('details', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Size</label>
                    <select
                      value={form.size}
                      onChange={(e) => handleChange('size', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                    >
                      <option value="large">Large (7 cols)</option>
                      <option value="side">Side (5 cols)</option>
                      <option value="third">Third (4 cols)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Order</label>
                    <input
                      type="number" value={form.order}
                      onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox" checked={form.isNew}
                      onChange={(e) => handleChange('isNew', e.target.checked)}
                      className="w-4 h-4 rounded accent-[var(--color-wine)]"
                    />
                    <span className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider">New Arrivals</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox" checked={form.inStock}
                      onChange={(e) => handleChange('inStock', e.target.checked)}
                      className="w-4 h-4 rounded accent-[var(--color-wine)]"
                    />
                    <span className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider">In Stock</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-muted)] mb-1.5 uppercase tracking-wider">Image URL</label>
                  <div className="flex gap-3 items-start">
                    <input
                      type="text" value={form.image}
                      onChange={(e) => handleChange('image', e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-white text-sm outline-none focus:border-[var(--color-wine)] transition-colors"
                      placeholder="URL or upload"
                    />
                    <label className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload size={14} />
                      {uploading ? '...' : 'Upload'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  </div>
                  {form.image && (
                    <div className="mt-3 w-full h-40 rounded-xl overflow-hidden border border-[var(--color-line)] softyy-media-frame p-3">
                      <img src={form.image} alt="Preview" className="softyy-media-contain" />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-wine)] text-white font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    <Save size={16} />
                    {saving ? 'Saving...' : editing ? 'Update Product' : 'Create Product'}
                  </button>
                  <button
                    onClick={() => { setShowForm(false); setEditing(null); setSlugEdited(false) }}
                    className="px-5 py-3 rounded-xl border border-[var(--color-line)] text-sm font-bold text-[var(--color-ink)] hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="space-y-4">
          {products.length === 0 && (
            <div className="text-center py-16 text-[var(--color-muted)]">
              <p>No products yet. Click "Add Product" to create one.</p>
            </div>
          )}
          {products.map((product) => (
            <div key={product._id} className="bg-[var(--color-paper)] rounded-2xl p-5 border border-[var(--color-line)] flex gap-5 items-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-[var(--color-line)] shrink-0 softyy-media-frame p-2">
                {product.image ? (
                  <img src={product.image} alt={product.title} className="softyy-media-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)] text-xs">No img</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[var(--color-ink)] text-sm truncate">{product.title}</h3>
                <p className="text-xs text-[var(--color-muted)] truncate mt-0.5">{product.desc}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--color-wine)]/10 text-[var(--color-wine)] text-[0.65rem] font-bold uppercase">{product.tag}</span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[var(--color-muted)] text-[0.65rem] font-bold uppercase">{product.size}</span>
                  {product.brand?.name && <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[0.65rem] font-bold uppercase">{product.brand.name}</span>}
                  {product.category?.name && <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 text-[0.65rem] font-bold uppercase">{product.category.name}</span>}
                  {product.price != null && <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[0.65rem] font-bold">${product.price}</span>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEdit(product)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--color-wine)] hover:bg-[var(--color-wine)]/10 transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
