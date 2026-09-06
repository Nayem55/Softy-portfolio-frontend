import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import ScrollReveal from './ScrollReveal'
import BrandGlyph from './BrandGlyph'

export default function BrandsSection() {
  const { brands, products } = useData()

  if (!brands || brands.length === 0) return null

  const getProductCount = (brandId) => products.filter(p => p.brandId === brandId).length

  return (
    <section className="py-[82px] max-sm:py-[58px] surface-band">
      <div className="brand-shell">
        <ScrollReveal className="mb-[34px] max-w-[720px]">
          <span className="section-kicker mb-4">Our Brands</span>
          <h2 className="display-title mt-3 mb-0" style={{ fontSize: 'clamp(2.35rem, 4.6vw, 4.1rem)', lineHeight: 1.05 }}>
            Two lines, one standard of care.
          </h2>
          <p className="mt-4 text-[0.96rem] leading-[1.75] text-[var(--color-muted)]">
            Softyy focuses on skincare rituals; Fresh Daily extends the same practical promise into daily freshness and personal care.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {brands.map((brand, i) => (
            <ScrollReveal key={brand._id} delay={i * 0.15}>
              <Link
                to={`/brands/${brand.slug}`}
                className="image-card-smooth group relative block h-full overflow-hidden p-7 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute -right-8 -bottom-12 w-[220px] h-[220px] rounded-full bg-[rgba(44,53,132,0.06)] transition-transform duration-700 group-hover:scale-110" />
                <div className="relative z-[1] flex flex-col min-h-[210px]">
                  <div>
                    <div className="flex items-center justify-between gap-5">
                      <div className="brand-monogram">{brand.name?.charAt(0) || 'G'}</div>
                      {brand.logo && (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-[44px] max-w-[150px] object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      )}
                    </div>
                    <span className="block mt-7 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">0{i + 1}</span>
                    <h3 className="display-title m-0 mt-4 text-[1.8rem] font-normal text-[var(--color-ink)]">
                      {brand.name}
                    </h3>
                    <p className="text-[0.88rem] text-[var(--color-muted)] leading-[1.7] m-0 mt-3">
                      {brand.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mt-auto pt-7">
                    <span className="py-1.5 text-[0.74rem] font-bold text-[var(--color-primary)]">
                      {getProductCount(brand._id)} Products
                    </span>
                    <span className="flex items-center gap-2 text-[0.78rem] font-semibold text-[var(--color-primary)] uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                    View Collection
                    <BrandGlyph label="arrow" tone="inline" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
