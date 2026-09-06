import { useParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Grain from '../components/Grain'
import ScrollReveal from '../components/ScrollReveal'

export default function BrandDetail() {
  const { slug } = useParams()
  const { brands, products } = useData()

  const brand = brands.find(b => b.slug === slug)
  const brandProducts = products.filter(p => p.brandId === brand?._id)

  if (!brand) {
    return (
      <>
        <Grain />
        <Navbar />
        <main id="top" className="pt-[100px] min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-italiana)', color: 'var(--color-ink)' }}>Brand Not Found</h1>
            <Link to="/brands" className="text-[var(--color-wine)] font-bold hover:underline">← Back to Brands</Link>
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
              <Link to="/brands" className="text-[var(--color-wine)] text-sm font-bold hover:underline mb-6 inline-block">← All Brands</Link>
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-9 items-center">
                <div>
                  <h1 className="mb-4" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--color-ink)' }}>
                    {brand.name}
                  </h1>
                  <p className="text-[var(--color-muted)] text-[1.1rem] leading-[1.7] mb-6">
                    {brand.description}
                  </p>
                  <p className="text-[0.85rem] text-[var(--color-wine)] font-bold uppercase tracking-wider">
                    {brandProducts.length} Products
                  </p>
                </div>
                <div className="image-card-smooth relative min-h-[300px] overflow-hidden p-8">
                  <div className="absolute -right-10 -bottom-16 w-[260px] h-[260px] rounded-full bg-[rgba(44,53,132,0.07)]" />
                  <div className="relative z-[1] h-full flex flex-col justify-between gap-16">
                    <div className="flex items-start justify-between gap-6">
                      <div className="brand-monogram">{brand.name?.charAt(0) || 'G'}</div>
                      {brand.logo && (
                        <img src={brand.logo} alt={brand.name} className="max-h-[58px] max-w-[190px] object-contain opacity-85" />
                      )}
                    </div>
                    <div>
                      <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">Brand under Global Cosmetics Lines</span>
                      <p className="m-0 mt-3 max-w-[420px] text-[0.9rem] leading-[1.7] text-[var(--color-muted)]">
                        Curated as part of the Global Cosmetics Lines portfolio for customers who want clear product intent and dependable daily care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-[88px] max-sm:pb-[64px]">
          <div className="brand-shell">
            <h2 className="mb-10" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: '2.5rem', color: 'var(--color-ink)' }}>
              Products by {brand.name}
            </h2>
            {brandProducts.length === 0 ? (
              <p className="text-[var(--color-muted)] py-10">No products in this brand yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {brandProducts.map(product => (
                  <ScrollReveal key={product._id} className="h-full">
                    <Link to={`/products/${product.slug || product._id}`} className="catalog-product-card group flex h-full flex-col overflow-hidden rounded-[20px] bg-white p-1.5 transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-[1.1/1] overflow-hidden rounded-[17px] bg-[var(--color-rose)]">
                        <img src={product.image} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
                      </div>
                      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                        <span className="text-[0.68rem] font-extrabold text-[var(--color-primary)] uppercase tracking-[0.14em]">{product.tag}</span>
                        <h3 className="m-0 mt-3 text-[var(--color-ink)] leading-[1.08]" style={{ fontFamily: 'var(--font-italiana)', fontSize: '1.5rem', fontWeight: 500 }}>{product.title}</h3>
                        <p className="text-[var(--color-muted)] text-[0.86rem] leading-[1.55] mt-3 mb-0 line-clamp-2">{product.desc}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
