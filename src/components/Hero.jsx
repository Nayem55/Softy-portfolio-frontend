import { useData } from '../context/DataContext'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import { ArrowRight, FlaskConical, ShieldCheck, Truck } from 'lucide-react'

export default function Hero() {
  const { content } = useData()

  const hero = content?.hero || {
    eyebrow: 'Skin care, made close to home',
    title: 'Care that feels',
    titleItalic: 'quietly certain.',
    description: 'SoftyyBD brings authentic skincare and freshness essentials to Bangladesh with practical formulas, careful sourcing, and support people can actually reach.',
    primaryBtn: 'Explore the Collection',
    secondaryBtn: 'Our Story',
  }

  return (
    <section className="min-h-screen pt-[108px] pb-[72px] relative overflow-hidden">
      <div className="w-[min(1220px,calc(100%-48px))] mx-auto relative max-sm:w-[min(100%-24px,1220px)]">
        <div className="grid grid-cols-[0.82fr_1.18fr] gap-[64px] items-center max-lg:grid-cols-1 max-lg:gap-[46px]">
          <ScrollReveal>
            <div className="max-lg:text-center">
              <span className="section-kicker mb-6">{hero.eyebrow}</span>

              <h1
                className="display-title mt-0 mb-0 leading-[0.92]"
                style={{ fontSize: 'clamp(3.15rem, 7vw, 6.7rem)' }}
              >
                {hero.title}
                <br />
                <em className="not-italic" style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>
                  {hero.titleItalic}
                </em>
              </h1>

              <p className="max-w-[560px] text-[1.02rem] my-[30px] leading-[1.8] text-[var(--color-muted)] max-lg:mx-auto">
                {hero.description}
              </p>

              <div className="flex gap-3 flex-wrap max-lg:justify-center">
                <Link
                  to="/collection"
                  className="inline-flex items-center gap-2 rounded-[8px] px-7 py-3.5 bg-[var(--color-ink)] text-white font-semibold text-[0.88rem] transition-all duration-300 hover:bg-[var(--color-primary)] hover:shadow-[0_14px_32px_rgba(22,24,33,0.18)] hover:-translate-y-0.5"
                >
                  {hero.primaryBtn}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/story"
                  className="inline-flex items-center gap-2 rounded-[8px] px-7 py-3.5 border border-[var(--color-line)] bg-white/45 text-[var(--color-ink)] font-semibold text-[0.88rem] transition-all duration-300 hover:bg-white"
                >
                  {hero.secondaryBtn}
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-0 mt-12 max-lg:mx-auto max-lg:max-w-[620px] max-sm:grid-cols-1 max-sm:gap-4">
                {[
                  { icon: ShieldCheck, label: '100% Authentic', sub: 'Zero counterfeit policy' },
                  { icon: FlaskConical, label: 'In-house Lab', sub: 'R&D guided quality' },
                  { icon: Truck, label: 'BD-wide', sub: 'Reliable delivery' },
                ].map((item, i) => (
                  <div key={i} className="border-l border-[var(--color-line)] first:border-l-0 pl-5 first:pl-0 max-sm:border-l-0 max-sm:border-t max-sm:first:border-t-0 max-sm:pt-4 max-sm:first:pt-0 max-sm:pl-0 max-sm:flex max-sm:items-center max-sm:gap-4 max-sm:text-left">
                    <item.icon size={19} className="mb-3 text-[var(--color-accent)] max-lg:mx-auto max-sm:mx-0 max-sm:mb-0 max-sm:shrink-0" />
                    <div>
                      <strong className="block text-[0.82rem] text-[var(--color-ink)]">{item.label}</strong>
                      <span className="text-[0.72rem] text-[var(--color-muted)]">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative min-h-[520px] max-lg:min-h-0">
              <div className="relative z-[2] overflow-hidden border border-[var(--color-line)] bg-[var(--color-paper)] p-3 grid place-items-center aspect-[1.62/1] premium-card max-sm:p-2">
                <img
                  src="/products/softyy/cover.jpg"
                  alt="Softyy skincare collection"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="absolute right-0 -bottom-12 z-[3] grid grid-cols-[170px_190px] gap-4 max-xl:-bottom-8 max-lg:relative max-lg:bottom-auto max-lg:right-auto max-lg:mt-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                <div className="overflow-hidden border border-[var(--color-line)] bg-[var(--color-paper)] p-4 premium-card grid place-items-center min-h-[178px] max-sm:min-h-[210px]">
                  <img src="/products/softyy/acne-serum.jpg" alt="Softyy Acne Control Serum" className="softyy-media-contain max-h-[180px] max-sm:max-h-[220px]" />
                </div>
                <div className="bg-[var(--color-ink)] text-white p-5 premium-card flex flex-col justify-between min-h-[178px] max-sm:min-h-[190px]">
                  <span className="text-[0.72rem] uppercase tracking-[0.16em] text-white/52">Current focus</span>
                  <div>
                    <strong className="display-title block text-[2.15rem] font-medium leading-none">Oil Control</strong>
                    <span className="block mt-2 text-[0.82rem] leading-[1.6] text-white/64">Daily cleansers and targeted serum care for humid-weather routines.</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
