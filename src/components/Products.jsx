import { useState } from 'react'
import { useData } from '../context/DataContext'
import ScrollReveal from './ScrollReveal'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, FlaskConical } from 'lucide-react'

export default function Products({ limit, showHeader = true, showLink = false }) {
  const { products } = useData()
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
    const text = `${product.brandId || ''} ${product.brand || ''}`.toLowerCase()
    if (text.includes('fresh')) return 'Fresh Daily'
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
                  <h2 className="display-title mt-3 mb-0 max-w-[620px]" style={{ fontSize: 'clamp(2.35rem, 4vw, 4.05rem)', lineHeight: 0.95, fontWeight: 700 }}>
                    A polished shelf for daily care.
                  </h2>
                </div>
                <div className="max-w-[650px] lg:ml-auto">
                  <p className="leading-[1.65] text-[var(--color-muted)] text-[0.94rem] m-0">
                    Shop by skin need, compare benefits quickly, and move from Softyy skincare to Fresh Daily essentials without decoding a long catalogue.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                    <div className="product-proof-pill">
                      <BadgeCheck size={16} />
                      <span>Authentic products only</span>
                    </div>
                    <div className="product-proof-pill">
                      <FlaskConical size={16} />
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
                      onClick={() => setActiveFilter(filter.key)}
                      className={`rounded-full border px-4 py-2 text-[0.72rem] font-bold transition-all duration-200 whitespace-nowrap ${
                        activeFilter === filter.key
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_12px_24px_rgba(44,53,132,0.2)]'
                          : 'border-[var(--color-line)] bg-white/80 text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  {displayProducts.length} curated picks
                </span>
              </div>
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-3 gap-5 mobile-product-rail max-xl:gap-4 max-lg:grid-cols-2 max-md:grid-cols-2">
          {displayProducts.map((product, i) => {
            return (
              <ScrollReveal
                key={product._id || i}
                className="min-w-0"
              >
                <Link
                  to={`/products/${product.slug || product._id}`}
                  className="product-card-premium group flex h-full min-h-[400px] flex-col overflow-hidden rounded-[20px] bg-white p-1.5 transition-all duration-500 hover:-translate-y-1 max-xl:min-h-[372px] max-sm:min-h-[390px]"
                >
                  <div className="relative h-[236px] overflow-hidden rounded-[17px] bg-[var(--color-rose)] max-xl:h-[202px] max-sm:h-[220px]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
                      <span className="rounded-full bg-white/90 px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-[var(--color-primary)] shadow-[0_10px_22px_rgba(18,23,44,0.08)] backdrop-blur">
                        {formatTag(product)}
                      </span>
                      {product.price && (
                        <span className="rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-[0.64rem] font-bold text-white shadow-[0_10px_24px_rgba(44,53,132,0.22)]">
                          BDT {product.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-5 max-xl:pt-4">
                    <span className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">{formatBrand(product)}</span>
                    <h3 className="display-title m-0 mt-2 text-[1.48rem] leading-[1.05] text-[var(--color-ink)] max-xl:text-[1.28rem]" style={{ fontWeight: 700 }}>
                      {product.title}
                    </h3>
                    <p className="m-0 mt-3 text-[0.8rem] text-[var(--color-muted)] leading-[1.55] line-clamp-2 max-xl:text-[0.76rem]">
                      {product.desc}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-[rgba(44,53,132,0.08)] pt-5 max-xl:pt-4">
                      <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-extrabold text-[var(--color-primary)] max-xl:text-[0.74rem]">
                        View product
                        <ArrowRight size={13} />
                      </span>
                      <span className="rounded-full bg-[#f4f6ff] px-3 py-1.5 text-[0.68rem] font-semibold text-[var(--color-primary)] max-xl:px-2.5">
                        Details
                      </span>
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
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
