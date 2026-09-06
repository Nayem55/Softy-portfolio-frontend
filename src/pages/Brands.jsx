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
      <main id="top" className="pt-[88px]">
        <section className="py-[48px] max-sm:py-[34px]">
          <div className="brand-shell">
            <ScrollReveal>
              <span className="uppercase tracking-[0.18em] text-[0.74rem] font-bold text-[var(--color-wine)] inline-flex items-center gap-2.5 mb-5">
                <span className="w-7 h-px bg-[var(--color-wine)]" />
                Our Brands
              </span>
              <h1 className="mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.04em' }}>
                Brand Portfolio
              </h1>
              <p className="mt-5 text-[var(--color-muted)] text-[1.05rem] leading-[1.7] max-w-[600px]">
                Discover the Global Cosmetics Lines brand family, built around authentic care, everyday freshness, and quality customers can trust.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-[88px] max-sm:pb-[64px]">
          <div className="brand-shell">
            {brands.length === 0 ? (
              <p className="text-[var(--color-muted)] text-center py-20">No brands available yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                {brands.map((brand, i) => (
                  <ScrollReveal key={brand._id} className="h-full">
                    <Link
                      to={`/brands/${brand.slug}`}
                      className="image-card-smooth group relative flex h-full min-h-[334px] flex-col overflow-hidden p-7 transition-all duration-500 hover:-translate-y-1 max-xl:min-h-[310px] max-sm:min-h-[286px]"
                    >
                      <div className="absolute -right-8 -bottom-12 w-[220px] h-[220px] rounded-full bg-[rgba(44,53,132,0.06)] transition-transform duration-700 group-hover:scale-110" />
                      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
                        <div className="flex items-center justify-between gap-5">
                          <div className="brand-monogram">{brand.name?.charAt(0) || 'G'}</div>
                          {brand.logo && (
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="max-h-[48px] max-w-[160px] object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                            />
                          )}
                        </div>
                        <span className="block mt-8 text-[0.68rem] font-bold text-[var(--color-accent)] uppercase tracking-[0.14em]">0{i + 1}</span>
                        <h2 className="m-0 mb-3" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: '2rem', color: 'var(--color-ink)' }}>
                          {brand.name}
                        </h2>
                        <p className="text-[var(--color-muted)] text-[0.95rem] leading-[1.7] mb-4">{brand.description}</p>
                        <div className="flex items-center justify-between mt-auto pt-6">
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
