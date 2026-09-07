import { useState } from 'react'
import { useData } from '../context/DataContext'
import ScrollReveal from './ScrollReveal'
import { Link } from 'react-router-dom'
import BrandGlyph from './BrandGlyph'

export default function Products({ limit, showHeader = true, showLink = false }) {
  const { products, brands } = useData()
  const [activeFilter, setActiveFilter] = useState('all')

  const allProducts = products.length > 0 ? products : [
    { _id: '1', title: 'Lemon Face Wash', desc: 'Oil Control · Acne Control · Brightening Deep Cleansing', tag: 'Face Wash', image: '/products/softyy/lemon-face-wash.jpg', size: 'large', price: 350, brandId: 'brand-softyy' },
    { _id: '2', title: 'Milk Expert Face Wash', desc: 'Brightening · Extra Moisturizing · Gentle Cleansing', tag: 'Face Wash', image: '/products/softyy/milk-face-wash.jpg', size: 'side', price: 350, brandId: 'brand-softyy' },
    { _id: '3', title: 'Acne Control Serum', desc: '2% Salicylic Acid · 5% Niacinamide · 30ml', tag: 'Serum', image: '/products/softyy/acne-serum.jpg', size: 'third', price: 450, brandId: 'brand-softyy' },
    { _id: '4', title: 'Papaya Face Wash', desc: 'Glow Boost · Anti-Blemish · Gentle Deep Clean', tag: 'Face Wash', image: '/products/softyy/papaya-face-wash.jpg', size: 'third', price: 350, brandId: 'brand-softyy' },
    { _id: '5', title: 'Salicylic Acid Face Wash', desc: 'Acne Control · Deep Pore Cleansing · Blackheads', tag: 'Face Wash', image: '/products/softyy/salicylic-face-wash.jpg', size: 'third', price: 350, brandId: 'brand-softyy' },
    { _id: '6', title: 'Milk Soothing Gel', desc: 'Deep Moisturizing · Sunburn Recovery · 250gm', tag: 'Gel', image: '/products/softyy/milk-soothing-gel.jpg', size: 'third', price: 480, brandId: 'brand-softyy' },
  ]

  const filters = [
    { key: 'all', label: 'All products' },
    { key: 'cleanser', label: 'Cleansers' },
    { key: 'acne', label: 'Acne care' },
    { key: 'gentle', label: 'Gentle care' },
  ]

  const productMatchesFilter = (product) => {
    const haystack = `${product.title || ''} ${product.desc || ''} ${product.tag || ''}`.toLowerCase()
    if (activeFilter === 'all') return true
    if (activeFilter === 'cleanser') return haystack.includes('face wash') || haystack.includes('cleanser') || haystack.includes('cleansing')
    if (activeFilter === 'acne') return haystack.includes('acne') || haystack.includes('salicylic')
    if (activeFilter === 'gentle') return haystack.includes('gentle') || haystack.includes('milk') || haystack.includes('soothing')
    return true
  }

  const filteredProducts = allProducts.filter(productMatchesFilter)
  const displayProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts

  const formatTag = (product) => {
    const text = `${product.title || ''} ${product.desc || ''} ${product.tag || ''}`.toLowerCase()
    if (text.includes('acne') || text.includes('salicylic')) return 'Acne Care'
    if (text.includes('milk') || text.includes('soothing') || text.includes('gentle')) return 'Gentle Care'
    if (text.includes('face wash') || text.includes('cleanser') || text.includes('cleansing')) return 'Cleanser'
    return product.tag || 'Care'
  }

  const formatBrand = (product) => {
    const brandId = product.brandId?._id || product.brandId
    const brand = brands.find((item) => item._id === brandId)
    if (brand) return brand.name
    const text = `${product.brandId || ''} ${product.brand || ''}`.toLowerCase()
    if (text.includes('fresh') || text.includes('brand-fd') || product.title?.startsWith('Fresh Daily')) return 'Fresh Daily'
    return 'Softyy'
  }

  return (
    <section id="collection" className="product-shelf-section py-[76px] max-xl:py-[58px] max-sm:py-[52px]">
      <div className="brand-shell">
        {showHeader && (
          <ScrollReveal className="mb-6">
            <div className="product-shelf-head">
              <div className="grid grid-cols-[0.85fr_1.15fr] gap-8 items-end max-lg:grid-cols-1 max-lg:gap-5">
                <div>
                  <span className="section-kicker mb-4">The everyday shelf</span>
                  <h2 className="display-title shelf-title mt-3 mb-0 max-w-[620px]">
                    Everyday care, thoughtfully chosen.
                  </h2>
                </div>
                <div className="max-w-[650px] lg:ml-auto">
                  <p className="leading-[1.65] text-[var(--color-muted)] text-[0.94rem] m-0">
                    From your morning cleanse to a fresher home. Discover Softyy skincare and Fresh Daily essentials for the routines that matter to you.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                    <div className="product-proof-pill">
                      <BrandGlyph label="A" tone="inline" />
                      <span>Authentic products only</span>
                    </div>
                    <div className="product-proof-pill">
                      <BrandGlyph label="R" tone="inline" />
                      <span>Clear routine benefits</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between gap-4 border-t border-[var(--color-line)] pt-5 max-md:flex-col max-md:items-start">
                <div className="shelf-filter-row flex flex-wrap gap-2 max-sm:flex-nowrap max-sm:w-full max-sm:overflow-x-auto max-sm:pb-1">
                  {filters.map((filter) => (
                    <button
                      key={filter.key}
                      type="button"
                      aria-pressed={activeFilter === filter.key}
                      aria-controls="shelf-products"
                      onClick={() => setActiveFilter(filter.key)}
                      className={`rounded-full border px-4 py-2 text-[0.72rem] font-bold transition-all duration-200 whitespace-nowrap ${
                        activeFilter === filter.key
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                          : 'border-[var(--color-line)] bg-white/80 text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                <span aria-live="polite" className="text-[0.8rem] text-[var(--color-muted)]">
                  {displayProducts.length} products
                </span>
              </div>
            </div>
          </ScrollReveal>
        )}

        <div id="shelf-products" className="grid grid-cols-3 gap-5 mobile-product-rail max-xl:gap-4 max-lg:grid-cols-2 max-md:grid-cols-2">
          {displayProducts.map((product, i) => {
            return (
              <ScrollReveal
                key={product._id || i}
                className="min-w-0"
              >
                <Link
                  to={`/products/${product.slug || product._id}`}
                  className="product-card-premium group flex h-full flex-col overflow-hidden rounded-[20px] bg-white p-1.5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[15px] bg-[var(--color-rose)]">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-5 max-xl:pt-4">
                    <div className="flex justify-between gap-3 text-[0.75rem] text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-primary)]">{formatBrand(product)}</span>
                      <span>{formatTag(product)}</span>
                    </div>
                    <h3 className="display-title m-0 mt-2 text-[1.48rem] leading-[1.05] text-[var(--color-ink)] max-xl:text-[1.28rem]" style={{ fontWeight: 700 }}>
                      {product.title}
                    </h3>
                    <p className="m-0 mt-3 mb-5 text-[0.875rem] text-[var(--color-muted)] leading-[1.6]">
                      {product.desc}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-[rgba(44,53,132,0.08)] pt-5 max-xl:pt-4">
                      <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-extrabold text-[var(--color-primary)] max-xl:text-[0.74rem]">
                        View product
                        <BrandGlyph label="arrow" tone="inline" />
                      </span>
                      {product.price != null && <span className="text-[0.9rem] font-semibold text-[var(--color-ink)]">BDT {product.price}</span>}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        {showLink && (
          <ScrollReveal className="text-center mt-9">
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 rounded-[8px] px-8 py-3.5 gcl-button text-white font-bold text-[0.88rem] transition-all duration-300 hover:-translate-y-0.5"
            >
              View Full Collection
              <BrandGlyph label="arrow" tone="button" />
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
