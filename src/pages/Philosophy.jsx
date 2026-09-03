import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Grain from '../components/Grain'
import ScrollReveal from '../components/ScrollReveal'
import { ArrowRight, BadgeCheck, ClipboardCheck, FlaskConical, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react'

const principles = [
  {
    icon: ShieldCheck,
    title: 'Authenticity is non-negotiable',
    text: 'A strict zero-counterfeit position protects customer trust and keeps the portfolio focused on verified products.',
  },
  {
    icon: FlaskConical,
    title: 'Quality starts before launch',
    text: 'R&D, chemist guidance, and inspection routines help each formula move from idea to shelf with better discipline.',
  },
  {
    icon: Sparkles,
    title: 'Useful luxury over excess',
    text: 'Products are designed around daily needs: oil control, brightening, cleansing, soothing, freshness, and confidence.',
  },
  {
    icon: Truck,
    title: 'The experience matters',
    text: 'Ordering, confirmation, packaging, delivery, and support are treated as part of the product promise.',
  },
]

const standards = [
  'Clear product claims and usage context',
  'All-skin-type thinking where the formula allows',
  'Paraben and sulphate free positioning across key cleansers',
  'Patch-test guidance for individual skin sensitivity',
  'Order verification before fulfillment',
  'Fast customer response for damage, defect, or wrong-item issues',
]

const policyCards = [
  { title: 'Delivery Window', detail: 'Inside Dhaka: 24 to 48 hours. Outside Dhaka: 2 to 4 business days.' },
  { title: 'Exchange Standard', detail: 'Unused, sealed products can be reviewed for exchange when damaged, defective, or incorrectly delivered.' },
  { title: 'Privacy Promise', detail: 'Customer information is used for orders and service improvement, never sold for third-party marketing.' },
]

export default function Philosophy() {
  return (
    <>
      <Grain />
      <Navbar />
      <main id="top" className="pt-[100px]">
        <section className="py-[64px] max-sm:py-[42px]">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-14 items-center">
              <ScrollReveal>
                <span className="uppercase tracking-[0.18em] text-[0.74rem] font-bold text-[var(--color-wine)] inline-flex items-center gap-2.5 mb-5">
                  <span className="w-7 h-px bg-[var(--color-wine)]" />
                  Our Philosophy
                </span>
                <h1 className="mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95 }}>
                  Simple care, serious standards.
                </h1>
                <p className="mt-5 text-[var(--color-muted)] text-[1.05rem] leading-[1.75] max-w-[640px]">
                  SoftyyBD believes healthy skin should feel accessible, transparent, and dependable. The philosophy is practical: verified products, fair value, careful formulation, and support that respects the customer.
                </p>
                <div className="flex gap-3 flex-wrap mt-8">
                  <Link to="/collection" className="inline-flex items-center gap-2 rounded-[8px] px-7 py-3.5 bg-[var(--color-primary)] text-white font-semibold text-[0.88rem] transition-all duration-300 hover:bg-[#14307a] hover:-translate-y-0.5">
                    See Products
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/story" className="inline-flex items-center gap-2 rounded-[8px] px-7 py-3.5 bg-white border border-[var(--color-line)] text-[var(--color-ink)] font-semibold text-[0.88rem] transition-all duration-300 hover:bg-[var(--color-rose)]">
                    Read Our Story
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <div className="rounded-[8px] bg-[var(--color-primary)] text-white p-9 overflow-hidden relative">
                  <div className="absolute right-6 top-4 text-[9rem] leading-none opacity-10" style={{ fontFamily: 'var(--font-italiana)' }}>01</div>
                  <BadgeCheck size={34} className="text-[var(--color-warm)] mb-8 relative z-[1]" />
                  <p className="relative z-[1] m-0 text-[clamp(1.55rem,3vw,2.45rem)] leading-[1.22]" style={{ fontFamily: 'var(--font-italiana)' }}>
                    Beauty should never ask customers to choose between confidence, clarity, and care.
                  </p>
                  <div className="relative z-[1] mt-8 border-t border-white/15 pt-6 text-[0.88rem] text-white/68 leading-[1.7]">
                    That is why SoftyyBD combines authenticity, quality control, and accessible pricing into one customer promise.
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-[90px] max-sm:py-[64px] bg-white/55">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            <ScrollReveal className="text-center mb-12">
              <span className="uppercase tracking-[0.18em] text-[0.72rem] font-bold text-[var(--color-accent)]">Operating Principles</span>
              <h2 className="mt-4 mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(2.3rem, 4.8vw, 4rem)', lineHeight: 1.04 }}>
                The rules behind the SoftyyBD experience.
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {principles.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.06}>
                  <article className="h-full rounded-[8px] bg-white border border-[var(--color-line)] p-6 premium-card">
                    <div className="w-12 h-12 rounded-[8px] bg-[var(--color-rose)] grid place-items-center mb-5">
                      <item.icon size={22} className="text-[var(--color-primary)]" />
                    </div>
                    <h3 className="m-0 mb-3 text-[1rem] font-bold text-[var(--color-ink)]">{item.title}</h3>
                    <p className="m-0 text-[0.88rem] text-[var(--color-muted)] leading-[1.7]">{item.text}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-[90px] max-sm:py-[64px]">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
              <ScrollReveal>
                <div className="rounded-[8px] border border-[var(--color-line)] media-frame p-8 premium-card">
                  <img src="/products/softyy/acne-serum.jpg" alt="Softyy Acne Control Serum" className="w-full max-h-[430px] object-contain" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <span className="uppercase tracking-[0.18em] text-[0.72rem] font-bold text-[var(--color-accent)] inline-flex items-center gap-2.5">
                  <span className="w-7 h-px bg-[var(--color-accent)]" />
                  Quality Checklist
                </span>
                <h2 className="mt-4 mb-5" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(2.3rem, 4.8vw, 4rem)', lineHeight: 1.04 }}>
                  Premium means the details are easier to trust.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                  {standards.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[8px] bg-white border border-[var(--color-line)] p-4">
                      <ClipboardCheck size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <span className="text-[0.9rem] leading-[1.5] text-[var(--color-muted)]">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-sm:pb-[76px]">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            <ScrollReveal className="text-center mb-12">
              <span className="uppercase tracking-[0.18em] text-[0.72rem] font-bold text-[var(--color-accent)]">Customer Care</span>
              <h2 className="mt-4 mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(2.3rem, 4.8vw, 4rem)', lineHeight: 1.04 }}>
                Clear policies make the purchase feel safer.
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {policyCards.map((item, index) => {
                const Icon = index === 0 ? Truck : index === 1 ? PackageCheck : ShieldCheck
                return (
                  <ScrollReveal key={item.title} delay={index * 0.06}>
                    <article className="h-full rounded-[8px] bg-white border border-[var(--color-line)] p-7 premium-card">
                      <Icon size={24} className="text-[var(--color-primary)] mb-5" />
                      <h3 className="m-0 mb-3 text-[1.35rem]" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400 }}>{item.title}</h3>
                      <p className="m-0 text-[0.9rem] text-[var(--color-muted)] leading-[1.7]">{item.detail}</p>
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
