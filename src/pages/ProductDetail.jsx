import { useParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Grain from '../components/Grain'
import ScrollReveal from '../components/ScrollReveal'

export default function ProductDetail() {
  const { slug } = useParams()
  const { products, brands, categories } = useData()

  const product = products.find(p => (p.slug || p._id) === slug)
  const brand = product ? brands.find(b => b._id === product.brandId) : null
  const category = product ? categories.find(c => c._id === product.categoryId) : null

  const relatedProducts = product
    ? products.filter(p => p._id !== product._id && (p.brandId === product.brandId || p.categoryId === product.categoryId)).slice(0, 4)
    : []

  if (!product) {
    return (
      <>
        <Grain />
        <Navbar />
        <main id="top" className="pt-[100px] min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-italiana)', color: 'var(--color-ink)' }}>Product Not Found</h1>
            <Link to="/collection" className="text-[var(--color-wine)] font-bold hover:underline">← Back to Collection</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Grain />
      <Navbar />
      <main id="top" className="pt-[100px]">
        <section className="py-[60px] max-sm:py-[40px]">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            <ScrollReveal>
              <div className="flex items-center gap-2 text-sm mb-8">
                <Link to="/collection" className="text-[var(--color-wine)] font-bold hover:underline">Collection</Link>
                {category && (
                  <>
                    <span className="text-[var(--color-muted)]">/</span>
                    <Link to={`/categories/${category.slug}`} className="text-[var(--color-wine)] font-bold hover:underline">{category.name}</Link>
                  </>
                )}
                {brand && (
                  <>
                    <span className="text-[var(--color-muted)]">/</span>
                    <Link to={`/brands/${brand.slug}`} className="text-[var(--color-wine)] font-bold hover:underline">{brand.name}</Link>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-16 items-start">
                <div className="rounded-[8px] overflow-hidden softyy-media-frame aspect-square p-8 grid place-items-center border border-[var(--color-line)] premium-card">
                  <img src={product.image} alt={product.title} className="softyy-media-contain" />
                </div>

                <div>
                  {product.isNew && (
                    <span className="inline-block px-3 py-1 rounded-[8px] bg-[var(--color-wine)] text-white text-[0.7rem] font-bold uppercase tracking-wider mb-4">
                      New Arrival
                    </span>
                  )}
                  {product.tag && (
                    <span className="inline-block px-3 py-1 rounded-[8px] bg-[var(--color-wine)]/10 text-[var(--color-wine)] text-[0.7rem] font-bold uppercase tracking-wider mb-4 ml-2">
                      {product.tag}
                    </span>
                  )}

                  <h1 className="m-0 mb-4" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1, color: 'var(--color-ink)' }}>
                    {product.title}
                  </h1>

                  {brand && (
                    <Link to={`/brands/${brand.slug}`} className="text-[var(--color-muted)] text-[0.9rem] hover:text-[var(--color-wine)] transition-colors">
                      by {brand.name}
                    </Link>
                  )}

                  {product.price && (
                    <p className="text-[var(--color-ink)] text-[1.5rem] font-bold mt-4 mb-6">
                      BDT {product.price.toFixed(0)}
                    </p>
                  )}

                  <p className="text-[var(--color-muted)] text-[1.05rem] leading-[1.7] mb-8">
                    {product.details || product.desc}
                  </p>

                  {product.features && product.features.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider mb-4">Key Features</h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-[var(--color-muted)] text-[0.95rem]">
                            <span className="text-[var(--color-wine)] mt-1">✦</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    {category && (
                      <Link to={`/categories/${category.slug}`} className="inline-flex items-center justify-center gap-2 rounded-[8px] px-6 py-3 bg-[var(--color-ink)] font-bold text-[0.85rem] transition-all duration-250 hover:-translate-y-0.5 hover:bg-[var(--color-wine)]"
                        style={{ color: '#ffffff' }}>
                        Browse {category.name}
                      </Link>
                    )}
                    <Link to="/collection" className="inline-flex items-center justify-center gap-2 rounded-[8px] px-6 py-3 bg-white border border-[var(--color-line)] text-[var(--color-ink)] font-bold text-[0.85rem] transition-all duration-250 hover:bg-gray-50">
                      View All Products
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="pb-[120px] max-sm:pb-[82px]">
            <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
              <h2 className="mb-10" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: '2.5rem', color: 'var(--color-ink)' }}>
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(rp => (
                  <ScrollReveal key={rp._id}>
                    <Link to={`/products/${rp.slug || rp._id}`} className="group block bg-[var(--color-paper)] rounded-[8px] overflow-hidden border border-[var(--color-line)] premium-card transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-square overflow-hidden softyy-media-frame p-5 grid place-items-center">
                        <img src={rp.image} alt={rp.title} className="softyy-media-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                      </div>
                      <div className="p-5">
                        <span className="text-[0.65rem] font-bold text-[var(--color-wine)] uppercase tracking-wider">{rp.tag}</span>
                        <h3 className="m-0 mt-1.5 text-[var(--color-ink)] text-[1.1rem]" style={{ fontFamily: 'var(--font-italiana)' }}>{rp.title}</h3>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
