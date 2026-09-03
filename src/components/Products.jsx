import { useData } from '../context/DataContext'
import ScrollReveal from './ScrollReveal'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function Products({ limit, showHeader = true, showLink = false }) {
  const { products } = useData()

  const allProducts = products.length > 0 ? products : [
    { _id: '1', title: 'Lemon Face Wash', desc: 'Oil Control · Acne Control · Brightening Deep Cleansing', tag: 'Face Wash', image: '/products/softyy/lemon-face-wash.jpg', size: 'large', price: 350, brandId: 'brand-softyy' },
    { _id: '2', title: 'Milk Expert Face Wash', desc: 'Brightening · Extra Moisturizing · Gentle Cleansing', tag: 'Face Wash', image: '/products/softyy/milk-face-wash.jpg', size: 'side', price: 350, brandId: 'brand-softyy' },
    { _id: '3', title: 'Acne Control Serum', desc: '2% Salicylic Acid · 5% Niacinamide · 30ml', tag: 'Serum', image: '/products/softyy/acne-serum.jpg', size: 'third', price: 450, brandId: 'brand-softyy' },
    { _id: '4', title: 'Papaya Face Wash', desc: 'Glow Boost · Anti-Blemish · Gentle Deep Clean', tag: 'Face Wash', image: '/products/softyy/papaya-face-wash.jpg', size: 'third', price: 350, brandId: 'brand-softyy' },
    { _id: '5', title: 'Salicylic Acid Face Wash', desc: 'Acne Control · Deep Pore Cleansing · Blackheads', tag: 'Face Wash', image: '/products/softyy/salicylic-face-wash.jpg', size: 'third', price: 350, brandId: 'brand-softyy' },
    { _id: '6', title: 'Milk Soothing Gel', desc: 'Deep Moisturizing · Sunburn Recovery · 250gm', tag: 'Gel', image: '/products/softyy/milk-soothing-gel.jpg', size: 'third', price: 480, brandId: 'brand-softyy' },
  ]

  const displayProducts = limit ? allProducts.slice(0, limit) : allProducts

  return (
    <section id="collection" className="py-[104px] max-sm:py-[72px]">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto max-sm:w-[min(100%-24px,1200px)]">
        {showHeader && (
          <ScrollReveal className="mb-[52px] grid grid-cols-[0.9fr_1.1fr] gap-10 items-end max-md:grid-cols-1">
            <div>
              <span className="section-kicker mb-4">The Softyy Edit</span>
              <h2 className="display-title mt-3 mb-0" style={{ fontSize: 'clamp(2.35rem, 4.4vw, 4rem)', lineHeight: 1.04 }}>
                A shelf built for repeat use.
              </h2>
            </div>
            <p className="max-w-[560px] md:ml-auto leading-[1.75] text-[var(--color-muted)] text-[0.96rem] m-0">
              Cleansers, treatment care, soothing gel, soaps, and Fresh Daily essentials arranged around the routines customers actually come back to.
            </p>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-12 gap-x-5 gap-y-8">
          {displayProducts.map((product, i) => {
            const isLarge = product.size === 'large'
            const isSide = product.size === 'side'
            return (
              <ScrollReveal
                key={product._id || i}
                className={`${
                  isLarge ? 'col-span-7 max-lg:!col-span-12' :
                  isSide ? 'col-span-5 max-lg:!col-span-12' :
                  'col-span-4 max-md:!col-span-6 max-sm:!col-span-12'
                }`}
              >
                <Link
                  to={`/products/${product.slug}`}
                  className="group grid h-full overflow-hidden bg-[var(--color-paper)] border border-[var(--color-line)] premium-card transition-all duration-500 hover:-translate-y-1"
                >
                  <div className={`relative media-frame grid place-items-center overflow-hidden ${isLarge || isSide ? 'aspect-[1.32/1]' : 'aspect-[1.02/1]'} p-7 max-sm:p-5`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="softyy-media-contain transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 bg-[var(--color-paper)]/90 backdrop-blur-sm py-1.5 px-3 rounded-[6px] text-[0.66rem] font-bold text-[var(--color-primary)] uppercase tracking-wider">
                      {product.tag}
                    </span>
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-[8px] bg-[var(--color-paper)]/90 backdrop-blur-sm grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-[0_10px_24px_rgba(26,26,46,0.08)]">
                      <ArrowUpRight size={16} className="text-[var(--color-ink)]" />
                    </div>
                  </div>
                  <div className="p-6 border-t border-[var(--color-line)]">
                    <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">0{i + 1}</span>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="display-title m-0 mt-2 text-[1.55rem] leading-tight text-[var(--color-ink)]">
                        {product.title}
                      </h3>
                      {product.price && (
                        <span className="shrink-0 rounded-[6px] bg-[var(--color-rose)] px-3 py-1.5 text-[0.76rem] font-bold text-[var(--color-primary)]">
                          BDT {product.price}
                        </span>
                      )}
                    </div>
                    <p className="m-0 mt-2 text-[0.86rem] text-[var(--color-muted)] leading-[1.65]">
                      {product.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        {showLink && (
          <ScrollReveal className="text-center mt-12">
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 rounded-[8px] px-8 py-3.5 bg-[var(--color-ink)] text-white font-semibold text-[0.88rem] transition-all duration-300 hover:bg-[var(--color-primary)] hover:shadow-[0_12px_32px_rgba(22,24,33,0.18)] hover:-translate-y-0.5"
            >
              View Full Collection
              <ArrowUpRight size={16} />
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
