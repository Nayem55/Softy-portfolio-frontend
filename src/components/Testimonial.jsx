import { useData } from '../context/DataContext'
import ScrollReveal from './ScrollReveal'

export default function Testimonial() {
  const { content } = useData()

  const testimonial = content?.testimonial || {
    stars: 5,
    quote: 'A beauty and skincare brand portfolio grounded in authenticity, accessible luxury, and customer confidence.',
    person: 'GLOBAL COSMETICS LINES',
    role: 'Brand Portfolio Statement',
  }

  return (
    <section className="py-[96px] max-sm:py-[70px]">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto max-sm:w-[min(100%-24px,1200px)]">
        <ScrollReveal>
          <div className="grid grid-cols-[0.36fr_1fr] gap-10 items-center border-y border-[var(--color-line)] py-[52px] max-md:grid-cols-1">
            <div>
              <span className="section-kicker mb-5">Brand Note</span>
              <div className="tracking-[0.16em] text-[var(--color-gold)] text-[0.9rem]">
                {'★'.repeat(testimonial.stars)}
              </div>
            </div>

            <blockquote
              className="my-0 text-[var(--color-ink)]"
              style={{
                fontFamily: 'var(--font-italiana)',
                fontSize: 'clamp(1.65rem, 2.9vw, 2.85rem)',
                lineHeight: 1.25,
              }}
            >
              &ldquo;{testimonial.quote}&rdquo;
              <span className="block mt-7 font-semibold text-[var(--color-ink)] text-[0.86rem]" style={{ fontFamily: 'var(--font-dm)' }}>
                {testimonial.person}
                <span className="block text-[var(--color-muted)] font-normal text-[0.78rem] mt-1">{testimonial.role}</span>
              </span>
            </blockquote>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
