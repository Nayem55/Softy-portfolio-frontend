import { useData } from '../context/DataContext'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import BrandGlyph from './BrandGlyph'

export default function Story() {
  const { content } = useData()

  const story = content?.story || {
    eyebrow: 'The brand story',
    title: 'Global Cosmetics Lines, built around trust.',
    description: 'Global Cosmetics Lines makes authentic skincare, cosmetics, personal care, and freshness essentials easier to discover, safer to buy, and more enjoyable to use across Bangladesh.',
    items: [
      { icon: 'shield', title: 'Safety comes first', desc: 'A strict zero-tolerance approach to counterfeit products protects every customer order.' },
      { icon: 'flask', title: 'Formulated with care', desc: 'Experienced chemists and an active R&D team guide quality control and product development.' },
      { icon: 'heart', title: 'Trust in every step', desc: 'From product details to delivery support, Global Cosmetics Lines is designed to feel clear and dependable.' },
    ],
    ctaBtn: 'Partner with GCL',
  }

  const iconLabels = { shield: 'A', flask: 'Q', heart: 'C' }

  return (
    <section id="story" className="py-[82px] max-xl:py-[58px] max-sm:py-[50px] surface-band">
      <div className="brand-shell">
        <div className="grid grid-cols-[0.88fr_1.12fr] gap-9 items-center max-xl:grid-cols-[0.82fr_1.18fr] max-lg:grid-cols-1">
          <ScrollReveal>
            <span className="section-kicker mb-4">{story.eyebrow}</span>
            <h2 className="display-title mt-3 mb-0 max-w-[560px]" style={{ fontSize: 'clamp(2.25rem, 4vw, 4rem)', lineHeight: 1.02 }}>
              {story.title}
            </h2>
            <p className="max-w-[550px] mt-5 leading-[1.72] text-[var(--color-muted)] text-[0.98rem] max-xl:text-[0.94rem]">
              {story.description}
            </p>
            <div className="mt-7 border-t border-[var(--color-line)] pt-5 text-[0.85rem] leading-[1.65] text-[var(--color-muted)] max-w-[520px]">
              Based in North Kamalapur, Dhaka, the brand serves customers and retail partners with a direct, reachable team.
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="grid grid-cols-[1fr_170px] gap-4 max-xl:grid-cols-[1fr_142px] max-md:grid-cols-1">
              <div className="bg-white border border-[var(--color-line)] premium-card p-4 max-xl:p-3">
                <div className="grid gap-3">
                  {story.items.map((item, i) => {
                    return (
                      <div key={i} className="grid grid-cols-[46px_1fr] gap-4 rounded-[8px] border border-[rgba(44,53,132,0.08)] bg-[linear-gradient(135deg,#ffffff,#f7f9ff)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(31,43,91,0.08)] max-xl:grid-cols-[40px_1fr] max-xl:gap-3 max-xl:p-3">
                        <BrandGlyph label={iconLabels[item.icon] || String(i + 1).padStart(2, '0')} tone="light" />
                        <div>
                          <h3 className="m-0 mb-1 text-[1.02rem] font-semibold leading-[1.28] text-[var(--color-ink)] max-xl:text-[0.94rem]">
                            {item.title}
                          </h3>
                          <p className="m-0 text-[0.86rem] text-[var(--color-muted)] leading-[1.55] max-xl:text-[0.8rem] max-xl:leading-[1.5]">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-4 max-xl:gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                <div className="bg-[var(--color-primary)] text-white premium-card p-5 flex flex-col justify-between min-h-[176px] max-xl:min-h-[150px] max-xl:p-4">
                  <span className="text-[0.66rem] uppercase tracking-[0.15em] text-white/62">Brand house</span>
                  <div>
                    <strong className="display-title block text-[2.45rem] leading-none max-xl:text-[2rem]">2</strong>
                    <span className="mt-2 block text-[0.82rem] leading-[1.45] text-white/74">Softyy and Fresh Daily under one trusted company.</span>
                  </div>
                </div>
                <Link to="/story" className="bg-white border border-[var(--color-line)] premium-card p-5 flex flex-col justify-between min-h-[176px] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(44,53,132,0.22)] max-xl:min-h-[150px] max-xl:p-4">
                  <span className="text-[0.66rem] uppercase tracking-[0.15em] text-[var(--color-primary)]">Since trust matters</span>
                  <span className="inline-flex items-center gap-2 text-[0.86rem] font-bold text-[var(--color-ink)]">
                    Read the story
                    <BrandGlyph label="arrow" tone="inline" />
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
