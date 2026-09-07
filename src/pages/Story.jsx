import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Grain from '../components/Grain'
import ScrollReveal from '../components/ScrollReveal'
import BrandGlyph from '../components/BrandGlyph'
import { useData } from '../context/DataContext'

const chapters = [
  {
    label: 'Founded with a clear promise',
    title: 'Authentic care first',
    text: 'Global Cosmetics Lines was created to make trustworthy skincare easier to find, easier to understand, and easier to buy across Bangladesh.',
  },
  {
    label: 'Built for everyday routines',
    title: 'Beauty that feels usable',
    text: 'The portfolio focuses on practical skin and lifestyle needs: cleansers, serums, gels, soaps, and home freshness products designed for daily confidence.',
  },
  {
    label: 'Made to scale responsibly',
    title: 'Quality before noise',
    text: 'Every brand expression is shaped around reliable sourcing, in-house quality thinking, and direct support so customers can shop with more clarity.',
  },
]

const promises = [
  { mark: 'A', title: 'Zero counterfeit policy', text: 'Products are sourced through the company brand family and authorized manufacturing relationships.' },
  { mark: 'Q', title: 'Lab-guided standards', text: 'Experienced chemists and R&D practice guide formulation, inspection, and product development.' },
  { mark: 'S', title: 'All skin type focus', text: 'Care formats are developed for diverse skin concerns, from oil control to soothing moisture.' },
  { mark: 'C', title: 'Support-led shopping', text: 'Clear contact channels, order confirmation, and nationwide delivery keep the experience dependable.' },
]

export default function StoryPage() {
  const { content, brands, products } = useData()
  const page = content?.pages?.story || {}
  const stats = page.stats || [
    { number: '2', label: 'Core brands' },
    { number: `${products.length}+`, label: 'Portfolio items' },
    { number: 'BD', label: 'Nationwide care' },
  ]
  const pageChapters = page.chapters || chapters
  const pagePromises = page.promises || promises

  return (
    <>
      <Grain />
      <Navbar />
      <main id="top" className="story-page pt-[88px] max-md:pt-[66px]">
        <section className="py-[48px] max-sm:py-[34px]">
          <div className="brand-shell">
            <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 items-center">
              <ScrollReveal>
                <span className="uppercase tracking-[0.18em] text-[0.74rem] font-bold text-[var(--color-wine)] inline-flex items-center gap-2.5 mb-5">
                  <span className="w-7 h-px bg-[var(--color-wine)]" />
                  {page.eyebrow || 'Our Story'}
                </span>
                <h1 className="story-title display-title mb-0">
                  {page.title || 'A beauty house built around trust.'}
                </h1>
                <p className="mt-5 text-[var(--color-muted)] text-[1.05rem] leading-[1.75] max-w-[620px]">
                  {page.description || 'Global Cosmetics Lines brings authentic cosmetics, skincare, and freshness essentials to customers who want clear claims, practical formulas, and a smoother shopping experience.'}
                </p>
                <div className="flex gap-3 flex-wrap mt-8">
                  <Link to="/collection" className="inline-flex items-center gap-2 rounded-[8px] px-7 py-3.5 gcl-button text-white font-bold text-[0.88rem] transition-all duration-300 hover:-translate-y-0.5">
                    Explore Collection
                    <BrandGlyph label="arrow" tone="button" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-[8px] px-7 py-3.5 bg-white border border-[var(--color-line)] text-[var(--color-ink)] font-semibold text-[0.88rem] transition-all duration-300 hover:bg-[var(--color-rose)]">
                    Partner With Us
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <div className="story-collection">
                  <img src={page.image || '/products/softyy/cover.jpg'} alt="Softyy skincare collection" className="w-full aspect-[1.28/1] object-contain rounded-[18px]" />
                  <div className="story-stats">
                    {stats.map(({ number, label }) => (
                      <div key={label}>
                        <strong className="block text-[1.7rem] font-normal text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-italiana)' }}>{number}</strong>
                        <span className="text-[0.8rem] text-[var(--color-muted)]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-[72px] max-sm:py-[54px] surface-band">
          <div className="brand-shell">
            <ScrollReveal className="max-w-[720px] mb-9">
              <span className="uppercase tracking-[0.18em] text-[0.72rem] font-bold text-[var(--color-accent)]">{page.journeyEyebrow || 'Brand Journey'}</span>
              <h2 className="mt-4 mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', lineHeight: 1.02 }}>
                {page.journeyTitle || 'From careful sourcing to confident daily use.'}
              </h2>
            </ScrollReveal>
            <div className="story-chapters">
              {pageChapters.map((chapter, index) => (
                <ScrollReveal key={chapter.title} delay={index * 0.08}>
                  <article className="story-chapter">
                    <span className="chapter-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--color-wine)]">{chapter.label}</span>
                    <h3 className="mt-5 mb-3 text-[1.6rem] leading-tight" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400 }}>{chapter.title}</h3>
                    <p className="m-0 text-[1rem] leading-[1.7] text-[var(--color-muted)]">{chapter.text}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-[72px] max-sm:py-[54px]">
          <div className="brand-shell">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-9 items-start">
              <ScrollReveal>
                <span className="uppercase tracking-[0.18em] text-[0.72rem] font-bold text-[var(--color-accent)] inline-flex items-center gap-2.5">
                  <span className="w-7 h-px bg-[var(--color-accent)]" />
                  {page.trustEyebrow || 'Why Customers Trust Us'}
                </span>
                <h2 className="mt-4 mb-5" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(2.3rem, 4.8vw, 4rem)', lineHeight: 1.04 }}>
                  {page.trustTitle || 'A practical promise for beauty in Bangladesh.'}
                </h2>
                <p className="text-[var(--color-muted)] leading-[1.75]">
                  {page.trustDescription || 'The company is based in Dhaka and serves customers through clear product information, reliable support, and delivery-focused operations.'}
                </p>
                <div className="mt-8 flex items-start gap-4 rounded-[8px] bg-white border border-[var(--color-line)] p-6">
                  <BrandGlyph label="BD" tone="light" className="shrink-0" />
                  <div>
                    <strong className="block text-[var(--color-ink)]">Global Cosmetics Lines</strong>
                    <span className="block text-[0.9rem] text-[var(--color-muted)] mt-1">{page.address || '64/68 North Kamalapur, Dhaka - 1217, Bangladesh'}</span>
                  </div>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {pagePromises.map((item, index) => {
                  return (
                  <ScrollReveal key={item.title} delay={index * 0.06}>
                    <article className="story-promise h-full">
                      <BrandGlyph label={item.mark || String(index + 1).padStart(2, '0')} tone="light" className="mb-5" />
                      <h3 className="m-0 mb-2 text-[1rem] font-bold text-[var(--color-ink)]">{item.title}</h3>
                      <p className="m-0 text-[0.88rem] text-[var(--color-muted)] leading-[1.7]">{item.text}</p>
                    </article>
                  </ScrollReveal>
                )})}
              </div>
            </div>
          </div>
        </section>

        {brands.length > 0 && (
          <section className="pb-[88px] max-sm:pb-[64px]">
            <div className="brand-shell">
              <ScrollReveal className="text-center mb-9">
                <span className="uppercase tracking-[0.18em] text-[0.72rem] font-bold text-[var(--color-accent)]">{page.familyEyebrow || 'Brand Family'}</span>
                <h2 className="mt-4 mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(2.3rem, 4.8vw, 4rem)', lineHeight: 1.04 }}>
                  {page.familyTitle || 'Softyy and Fresh Daily, one trusted house.'}
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {brands.map((brand) => (
                  <ScrollReveal key={brand._id}>
                    <Link to={`/brands/${brand.slug}`} className="image-card-smooth group block h-full overflow-hidden transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-[2.2/1] rounded-[18px] bg-[linear-gradient(135deg,#fff,#f4f7ff)] p-5 grid place-items-center">
                        <img src={brand.logo} alt={brand.name} className="softyy-media-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                      </div>
                      <div className="px-5 pb-5 pt-6">
                        <h3 className="m-0 text-[1.7rem]" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400 }}>{brand.name}</h3>
                        <p className="m-0 mt-2 text-[0.9rem] leading-[1.65] text-[var(--color-muted)]">{brand.description}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  )
}
