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
      <main id="top" className="pt-[100px]">
        <section className="py-[60px] max-sm:py-[40px]">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            <ScrollReveal>
              <Link to="/brands" className="text-[var(--color-wine)] text-sm font-bold hover:underline mb-6 inline-block">← All Brands</Link>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                <div className="rounded-[8px] overflow-hidden aspect-[1.25/1] softyy-media-frame border border-[var(--color-line)] p-10 grid place-items-center premium-card">
                  <img src={brand.logo} alt={brand.name} className="softyy-media-contain" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-[120px] max-sm:pb-[82px]">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            <h2 className="mb-10" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: '2.5rem', color: 'var(--color-ink)' }}>
              Products by {brand.name}
            </h2>
            {brandProducts.length === 0 ? (
              <p className="text-[var(--color-muted)] py-10">No products in this brand yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {brandProducts.map(product => (
                  <ScrollReveal key={product._id}>
                    <Link to={`/products/${product.slug || product._id}`} className="group block bg-[var(--color-paper)] rounded-[8px] overflow-hidden border border-[var(--color-line)] premium-card transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-square overflow-hidden softyy-media-frame p-5 grid place-items-center">
                        <img src={product.image} alt={product.title} className="softyy-media-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                      </div>
                      <div className="p-6">
                        <span className="text-[0.7rem] font-bold text-[var(--color-wine)] uppercase tracking-wider">{product.tag}</span>
                        <h3 className="m-0 mt-2 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)', fontSize: '1.4rem' }}>{product.title}</h3>
                        <p className="text-[var(--color-muted)] text-[0.85rem] mt-2 line-clamp-2">{product.desc}</p>
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
