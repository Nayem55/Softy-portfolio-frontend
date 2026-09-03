import { useData } from '../context/DataContext'
import ScrollReveal from './ScrollReveal'
import { Shield, FlaskConical, Heart } from 'lucide-react'

export default function Story() {
  const { content } = useData()

  const story = content?.story || {
    eyebrow: 'The brand story',
    title: 'A skincare house built around trust.',
    description: "SoftyyBD is created by Global Cosmetics Line's to make authentic skincare and cosmetics easier to discover, safer to buy, and more enjoyable to use across Bangladesh.",
    items: [
      { icon: 'shield', title: 'Safety comes first', desc: 'A strict zero-tolerance approach to counterfeit products protects every customer order.' },
      { icon: 'flask', title: 'Formulated with care', desc: 'Experienced chemists and an active R&D team guide quality control and product development.' },
      { icon: 'heart', title: 'Trust in every step', desc: 'From product details to delivery support, SoftyyBD is designed to feel clear and dependable.' },
    ],
    ctaBtn: 'Partner with Softyy',
  }

  const iconMap = { shield: Shield, flask: FlaskConical, heart: Heart }

  return (
    <section id="story" className="py-[104px] max-sm:py-[72px] bg-[#eee1d3]/70">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto max-sm:w-[min(100%-24px,1200px)]">
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-12 items-start max-lg:grid-cols-1">
          <ScrollReveal>
            <span className="section-kicker mb-4">{story.eyebrow}</span>
            <h2 className="display-title mt-3 mb-0" style={{ fontSize: 'clamp(2.35rem, 4.6vw, 4.2rem)', lineHeight: 1.04 }}>
              {story.title}
            </h2>
            <p className="max-w-[560px] mt-5 leading-[1.78] text-[var(--color-muted)] text-[0.98rem]">
              {story.description}
            </p>
            <div className="mt-8 border-t border-[var(--color-line)] pt-5 text-[0.85rem] leading-[1.7] text-[var(--color-muted)]">
              Based in North Kamalapur, Dhaka, the brand serves customers and retail partners with a direct, reachable team.
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-0 max-md:grid-cols-1">
          {story.items.map((item, i) => {
            const Icon = iconMap[item.icon] || Shield
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-[var(--color-paper)] p-7 border-y border-r first:border-l border-[var(--color-line)] transition-all duration-500 hover:bg-white h-full max-md:border-x max-md:border-b-0 max-md:last:border-b">
                  <div className="w-11 h-11 rounded-[8px] bg-[var(--color-rose)] grid place-items-center mb-6">
                    <Icon size={21} className="text-[var(--color-primary)]" />
                  </div>
                  <h3 className="m-0 mb-3 text-[1.05rem] font-semibold text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[0.88rem] text-[var(--color-muted)] leading-[1.7]">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}
