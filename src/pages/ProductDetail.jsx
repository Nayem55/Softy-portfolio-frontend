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
      <main id="top" className="pt-[88px]">
        <section className="py-[48px] max-sm:py-[34px]">
          <div className="brand-shell">
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

              <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
                <div className="image-card-smooth aspect-square overflow-hidden p-1.5">
                  <img src={product.image} alt={product.title} className="h-full w-full rounded-[18px] object-cover" />
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
                      <Link to={`/categories/${category.slug}`} className="inline-flex items-center justify-center gap-2 rounded-[8px] px-6 py-3 gcl-button font-bold text-[0.85rem] transition-all duration-250 hover:-translate-y-0.5"
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
          <section className="pb-[88px] max-sm:pb-[64px]">
            <div className="brand-shell">
              <h2 className="mb-10" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: '2.5rem', color: 'var(--color-ink)' }}>
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(rp => (
                  <ScrollReveal key={rp._id} className="h-full">
                    <Link to={`/products/${rp.slug || rp._id}`} className="catalog-product-card group flex h-full flex-col overflow-hidden rounded-[20px] bg-white p-1.5 transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-[1.08/1] overflow-hidden rounded-[17px] bg-[var(--color-rose)]">
                        <img src={rp.image} alt={rp.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
                      </div>
                      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
                        <span className="text-[0.65rem] font-extrabold text-[var(--color-primary)] uppercase tracking-[0.14em]">{rp.tag}</span>
                        <h3 className="m-0 mt-2 text-[var(--color-ink)] leading-[1.08]" style={{ fontFamily: 'var(--font-italiana)', fontSize: '1.18rem', fontWeight: 500 }}>{rp.title}</h3>
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
