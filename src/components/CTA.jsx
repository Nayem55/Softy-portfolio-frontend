import { useData } from '../context/DataContext'
import ScrollReveal from './ScrollReveal'
import { Mail, ArrowUpRight } from 'lucide-react'

export default function CTA() {
  const { content } = useData()

  const cta = content?.cta || {
    eyebrow: 'Business & partnerships',
    title: "Let's build a more trusted beauty routine.",
    description: 'For distribution, retail, collaborations, press, and business partnerships, connect with the SoftyyBD team.',
    email: 'globalcosmeticslines@gmail.com',
    image: '/editorial/softyy-boutique-care.png',
  }

  return (
    <section id="contact" className="py-[82px] max-sm:py-[70px]">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto max-sm:w-[min(100%-24px,1200px)]">
        <ScrollReveal>
          <div className="relative overflow-hidden bg-[var(--color-ink)] p-10 sm:p-12 grid grid-cols-[1fr_auto] items-center gap-10 max-md:grid-cols-1 border border-white/10 premium-cta">
            <img src={cta.image || '/editorial/softyy-boutique-care.png'} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,24,33,0.94),rgba(22,24,33,0.72),rgba(22,24,33,0.42))]" />
            <div className="relative z-[1]">
              <span className="inline-flex items-center gap-2 mb-4" style={{ color: 'rgba(255,255,255,0.62)' }}>
                <span className="w-6 h-[2px] bg-white/40" />
                <span className="uppercase tracking-[0.18em] text-[0.7rem] font-bold">
                  {cta.eyebrow}
                </span>
              </span>
              <h2 className="display-title mt-2 mb-0 text-white" style={{ fontSize: 'clamp(2rem, 3.6vw, 3.15rem)', lineHeight: 1.08 }}>
                {cta.title}
              </h2>
              <p className="max-w-[480px] leading-[1.7] text-[0.95rem] mt-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {cta.description}
              </p>
            </div>

            <a
              href={`mailto:${cta.email}`}
              className="relative z-[1] inline-flex items-center justify-center gap-2.5 rounded-[8px] px-7 py-4 bg-white font-semibold text-[0.88rem] transition-all duration-300 hover:bg-[var(--color-rose)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 whitespace-nowrap text-[var(--color-ink)] max-sm:whitespace-normal max-sm:text-center"
            >
              <Mail size={16} />
              {cta.email}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
