import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Grain from '../components/Grain'
import ScrollReveal from '../components/ScrollReveal'

export default function Brands() {
  const { brands, products } = useData()

  const getProductCount = (brandId) => products.filter(p => p.brandId === brandId).length

  return (
    <>
      <Grain />
      <Navbar />
      <main id="top" className="pt-[100px]">
        <section className="py-[60px] max-sm:py-[40px]">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            <ScrollReveal>
              <span className="uppercase tracking-[0.18em] text-[0.74rem] font-bold text-[var(--color-wine)] inline-flex items-center gap-2.5 mb-5">
                <span className="w-7 h-px bg-[var(--color-wine)]" />
                Our Brands
              </span>
              <h1 className="mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.04em' }}>
                Brand Portfolio
              </h1>
              <p className="mt-5 text-[var(--color-muted)] text-[1.05rem] leading-[1.7] max-w-[600px]">
                Discover the Softyy brand family, built around authentic care, everyday freshness, and quality customers can trust.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-[120px] max-sm:pb-[82px]">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            {brands.length === 0 ? (
              <p className="text-[var(--color-muted)] text-center py-20">No brands available yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {brands.map((brand, i) => (
                  <ScrollReveal key={brand._id}>
                    <Link
                      to={`/brands/${brand.slug}`}
                      className="group block bg-[var(--color-paper)] rounded-[8px] overflow-hidden border border-[var(--color-line)] premium-card transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className="aspect-[2.25/1] overflow-hidden softyy-media-frame p-8 grid place-items-center">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="softyy-media-contain transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="p-8">
                        <h2 className="m-0 mb-3" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: '2rem', color: 'var(--color-ink)' }}>
                          {brand.name}
                        </h2>
                        <p className="text-[var(--color-muted)] text-[0.95rem] leading-[1.7] mb-4">{brand.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[0.78rem] font-bold text-[var(--color-wine)] uppercase tracking-wider">
                            {getProductCount(brand._id)} Products
                          </span>
                          <span className="text-[0.85rem] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors">
                            View Collection →
                          </span>
                        </div>
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
