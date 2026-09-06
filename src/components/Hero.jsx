import { useData } from '../context/DataContext'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import BrandGlyph from './BrandGlyph'

export default function Hero() {
  const { content } = useData()

  const hero = content?.hero || {
    eyebrow: 'Global Cosmetics Lines - care made close to home',
    title: 'Care that feels',
    titleItalic: 'quietly certain.',
    description: 'A cleaner, warmer storefront for everyday skincare - easy to scan, easy to trust, and designed around the way real customers browse.',
    primaryBtn: 'Explore the Collection',
    secondaryBtn: 'Our Story',
    image: '/editorial/softyy-hero-editorial.png',
    floatingCard: {
      small: 'Customer Focus',
      title: 'Oil Control',
      desc: 'Simple guidance, clear product intent.',
      image: '/products/softyy/acne-serum.jpg',
    },
    stats: [
      { label: 'Everyday-first formulas', sublabel: '' },
      { label: 'Careful product curation', sublabel: '' },
      { label: 'Support you can reach', sublabel: '' },
    ],
  }
  const stats = hero.stats?.length ? hero.stats : [
    { label: 'Everyday-first formulas', sublabel: '' },
    { label: 'Careful product curation', sublabel: '' },
    { label: 'Support you can reach', sublabel: '' },
  ]
  const floatingCard = hero.floatingCard || {}

  return (
    <section className="min-h-[90vh] pt-[104px] pb-[56px] relative overflow-hidden hero-atmosphere bg-white max-xl:min-h-[620px] max-xl:pt-[94px] max-xl:pb-[38px] max-lg:min-h-0 max-lg:pt-[82px] max-lg:pb-[58px] max-sm:pt-[86px] max-sm:pb-[42px]">
      <div className="brand-shell relative">
        <div className="grid grid-cols-[0.98fr_1.02fr] gap-[56px] items-center min-h-[calc(90vh-160px)] max-xl:min-h-[470px] max-xl:items-start max-xl:gap-[40px] max-lg:grid-cols-1 max-lg:min-h-0 max-lg:gap-[34px]">
          <ScrollReveal>
            <div className="max-lg:text-center max-sm:text-left">
              <span className="section-kicker mb-7 max-sm:mb-5">{hero.eyebrow}</span>

              <h1
                className="display-title mt-0 mb-0 leading-[0.9] max-sm:leading-[0.92]"
                style={{ fontSize: 'clamp(3.25rem, 6.7vw, 6.25rem)' }}
              >
                {hero.title}
                <br />
                <em className="not-italic" style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>
                  {hero.titleItalic}
                </em>
              </h1>

              <p className="max-w-[585px] text-[1.08rem] my-[22px] leading-[1.45] text-[var(--color-muted)] max-lg:mx-auto max-sm:mx-0 max-sm:my-[20px] max-sm:text-[0.95rem] max-sm:leading-[1.7]">
                {hero.description}
              </p>

              <div className="flex gap-3 flex-wrap max-lg:justify-center max-sm:grid max-sm:grid-cols-2 max-sm:justify-stretch">
                <Link
                  to="/collection"
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-3.5 gcl-button text-white font-bold text-[0.88rem] transition-all duration-300 hover:-translate-y-0.5 max-sm:px-4"
                >
                  {hero.primaryBtn}
                  <BrandGlyph label="arrow" tone="button" />
                </Link>
                <Link
                  to="/story"
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-3.5 border border-[var(--color-line)] bg-white text-[var(--color-ink)] font-bold text-[0.88rem] transition-all duration-300 hover:bg-[var(--color-rose)] max-sm:px-4"
                >
                  {hero.secondaryBtn}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-7 mt-8 max-lg:justify-center max-sm:justify-start max-sm:mt-7 max-sm:gap-4">
                {stats.map((item, i) => {
                  return (
                  <div key={i} className="flex items-center gap-3 text-left">
                    <BrandGlyph label={['A', 'Q', '03'][i] || 'A'} tone="soft" className="shrink-0" />
                    <div className="text-[0.72rem] leading-[1.35] text-[var(--color-muted)]">
                      <strong className="block font-medium text-[var(--color-muted)]">{item.label}</strong>
                      {item.sublabel && <span>{item.sublabel}</span>}
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="hero-art-reference max-sm:mt-1">
              <div className="hero-image-panel overflow-hidden border border-white/70 bg-[var(--color-paper)] p-1.5 grid place-items-center">
                <img
                  src={hero.image || '/editorial/softyy-hero-editorial.png'}
                  alt="Global Cosmetics Lines skincare collection"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="hero-ghost-card" />

              <div className="hero-mini-card overflow-hidden border border-[var(--color-line)] bg-white p-3 premium-card">
                <div className="h-[116px] overflow-hidden rounded-[8px] media-frame">
                  <img src={floatingCard.image || '/products/softyy/acne-serum.jpg'} alt={floatingCard.title || 'Global Cosmetics Lines featured product'} className="w-full h-full object-cover" />
                </div>
                <span className="block mt-3 text-[0.82rem] leading-tight text-[var(--color-muted)]">Routine pick · daily care</span>
              </div>

              <div className="hero-note-card bg-[var(--color-primary)] text-white p-6 premium-card flex flex-col justify-between min-h-[204px] max-sm:min-h-[170px] max-sm:p-4">
                  <span className="text-[0.62rem] uppercase tracking-[0.16em] text-white/62">{floatingCard.small || 'Customer Focus'}</span>
                  <div>
                    <strong className="display-title block text-[1.9rem] font-bold leading-[0.95] max-sm:text-[1.55rem]">{floatingCard.title || 'Oil Control'}</strong>
                    <span className="block mt-4 text-[0.72rem] leading-[1.55] text-white/76">{floatingCard.desc || 'Simple guidance, clear product intent.'}</span>
                  </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
