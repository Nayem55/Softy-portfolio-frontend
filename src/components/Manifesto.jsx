import { useData } from '../context/DataContext'
import ScrollReveal from './ScrollReveal'

export default function Manifesto() {
  const { content } = useData()

  const manifesto = content?.manifesto || {
    eyebrow: 'Our philosophy',
    title: 'Healthy skin should feel simple, safe, and dependable.',
    description: 'We combine accessible pricing, careful sourcing, and active formulation standards so daily self-care feels transparent from first click to final application.',
    quote: 'Global Cosmetics Lines is built for customers who want beauty products they can trust on their skin and in their routine.',
    stats: [
      { number: '01', label: 'Authentic sourcing' },
      { number: '02', label: 'Lab-led quality' },
      { number: '03', label: 'All skin types' },
      { number: '04', label: 'Fast support' },
    ],
  }

  return (
    <section id="values" className="py-[82px] max-sm:py-[58px]">
      <div className="brand-shell">
        <div className="grid grid-cols-[1.08fr_0.92fr] gap-10 items-start max-lg:grid-cols-1 max-lg:gap-8">
          <ScrollReveal>
            <span className="section-kicker mb-5">{manifesto.eyebrow}</span>
            <h2 className="display-title mt-4 mb-0" style={{ fontSize: 'clamp(2.35rem, 4.6vw, 4.15rem)', lineHeight: 1.05 }}>
              {manifesto.title}
            </h2>
            <p className="text-[0.98rem] mt-5 mb-0 leading-[1.75] text-[var(--color-muted)]">
              {manifesto.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-8 max-sm:grid-cols-1">
              {manifesto.stats.map((stat, i) => (
                <div key={i} className="bg-[var(--color-paper)] border border-[var(--color-line)] p-5 premium-card">
                  <strong className="display-title block text-[1.8rem] font-medium text-[var(--color-primary)]">
                    {stat.number}
                  </strong>
                  <span className="block text-[0.82rem] mt-1 text-[var(--color-muted)]">{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative">
              <div className="bg-[var(--color-primary)] p-8 text-white relative overflow-hidden premium-card">
                <div
                  className="absolute right-4 top-2 text-[10rem] leading-none opacity-10 pointer-events-none display-title"
                  style={{ fontFamily: 'var(--font-italiana)' }}
                >
                  &ldquo;
                </div>
                <p
                  className="relative z-[2] m-0"
                  style={{
                    fontFamily: 'var(--font-italiana)',
                    fontSize: 'clamp(1.55rem, 2.7vw, 2.35rem)',
                    lineHeight: 1.2,
                    color: '#ffffff',
                  }}
                >
                  &ldquo;{manifesto.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-white/20 grid place-items-center">
                    <span className="text-[0.8rem] font-bold">G</span>
                  </div>
                  <div>
                    <strong className="block text-[0.85rem]">Global Cosmetics Lines</strong>
                    <span className="text-[0.72rem] text-white/60">Brand Philosophy</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 w-[96px] h-[96px] border border-[var(--color-accent)]/20 pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
