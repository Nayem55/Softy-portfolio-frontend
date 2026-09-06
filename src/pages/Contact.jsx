import Navbar from '../components/Navbar'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Grain from '../components/Grain'
import ScrollReveal from '../components/ScrollReveal'
import BrandGlyph from '../components/BrandGlyph'
import { useData } from '../context/DataContext'

const contactEmail = 'globalcosmeticslines@gmail.com'
const phone = '01911-238421'
const address = '64/68 North Kamalapur, Dhaka - 1217, Bangladesh'
const whatsappUrl = 'https://wa.me/8801911238421'
const facebookUrl = 'https://www.facebook.com/softyybd'

const inquiryTypes = [
  'Distribution Inquiry',
  'Retail Partnership',
  'Customer Support',
  'Press & Media',
  'Collaboration',
  'General Inquiry',
]

const supportCards = [
  {
    mark: 'D',
    title: 'Delivery',
    text: 'Inside Dhaka orders usually arrive within 24 to 48 hours. Outside Dhaka orders usually arrive within 2 to 4 business days.',
  },
  {
    mark: 'E',
    title: 'Exchange',
    text: 'Defective, damaged, or incorrect items can be reviewed when reported quickly with proof and intact packaging.',
  },
  {
    mark: 'P',
    title: 'Privacy',
    text: 'Customer details are used for order processing and service improvement, not sold for third-party marketing.',
  },
]

export default function Contact() {
  const { content } = useData()
  const cta = content?.cta || {}
  const page = content?.pages?.contact || {}
  const email = page.email || cta.email || contactEmail
  const contactPhone = page.phone || phone
  const contactAddress = page.address || address
  const contactWhatsappUrl = page.whatsappUrl || whatsappUrl
  const contactFacebookUrl = page.facebookUrl || facebookUrl
  const pageInquiryTypes = page.inquiryTypes || inquiryTypes
  const pageSupportCards = page.supportCards || supportCards
  const businessHours = (page.businessHours || 'Saturday to Thursday: 9:00 AM to 6:00 PM\nFriday: Limited support').split('\n')

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const firstName = form.get('firstName')
    const lastName = form.get('lastName')
    const subject = form.get('subject')
    const message = form.get('message')
    const replyTo = form.get('email')
    const body = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Email: ${replyTo}`,
      `Inquiry type: ${subject}`,
      '',
      message,
    ].join('\n')

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <Grain />
      <Navbar />
      <main id="top" className="pt-[88px]">
        <section className="py-[48px] max-sm:py-[34px]">
          <div className="brand-shell">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.92fr] gap-10 items-center">
              <ScrollReveal>
                <span className="uppercase tracking-[0.18em] text-[0.74rem] font-bold text-[var(--color-wine)] inline-flex items-center gap-2.5 mb-5">
                  <span className="w-7 h-px bg-[var(--color-wine)]" />
                  {page.eyebrow || 'Contact Global Cosmetics Lines'}
                </span>
                <h1 className="mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95 }}>
                  {page.title || 'Let us make care easier to reach.'}
                </h1>
                <p className="mt-5 text-[var(--color-muted)] text-[1.05rem] leading-[1.75] max-w-[640px]">
                  {page.description || 'Reach Global Cosmetics Line\'s for distribution, retail partnerships, customer support, collaborations, press requests, and brand inquiries.'}
                </p>
                <div className="flex gap-3 flex-wrap mt-8">
                  <a href={contactWhatsappUrl} className="inline-flex items-center gap-2 rounded-[8px] px-7 py-3.5 gcl-button text-white font-bold text-[0.88rem] transition-all duration-300 hover:-translate-y-0.5">
                    <BrandGlyph label="WA" tone="button" />
                    WhatsApp
                  </a>
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-[8px] px-7 py-3.5 bg-white border border-[var(--color-line)] text-[var(--color-ink)] font-semibold text-[0.88rem] transition-all duration-300 hover:bg-[var(--color-rose)]">
                    <BrandGlyph label="EM" tone="inline" />
                    Email Team
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <div className="rounded-[8px] bg-white border border-[var(--color-line)] p-8 premium-card">
                  <h2 className="m-0 mb-6 text-[2rem]" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400 }}>Direct Lines</h2>
                  <div className="space-y-5">
                    {[
                      { mark: 'EM', label: 'Email', value: email, href: `mailto:${email}` },
                      { mark: 'PH', label: 'Phone', value: contactPhone, href: `tel:${contactPhone}` },
                      { mark: 'WA', label: 'WhatsApp', value: contactPhone, href: contactWhatsappUrl },
                      { mark: 'FB', label: 'Facebook', value: contactFacebookUrl.replace(/^https?:\/\//, ''), href: contactFacebookUrl },
                    ].map((item) => (
                      <a key={item.label} href={item.href} className="group flex items-center gap-4 rounded-[8px] border border-[var(--color-line)] p-4 transition-all duration-300 hover:bg-[var(--color-rose)]">
                        <BrandGlyph label={item.mark} tone="light" className="shrink-0 group-hover:bg-white" />
                        <div className="min-w-0">
                          <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">{item.label}</span>
                          <strong className="block text-[0.92rem] text-[var(--color-ink)] break-words mt-1">{item.value}</strong>
                        </div>
                        <BrandGlyph label="arrow" tone="inline" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="pb-[88px] max-sm:pb-[64px]">
          <div className="brand-shell">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
              <ScrollReveal>
                <div className="bg-[var(--color-paper)] rounded-[8px] p-8 sm:p-10 border border-[var(--color-line)] premium-card">
                  <h2 className="mb-8" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: '2rem', color: 'var(--color-ink)' }}>
                    Send us a message
                  </h2>
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wider">First Name</label>
                        <input name="firstName" type="text" required className="w-full px-4 py-3 rounded-[8px] border border-[var(--color-line)] bg-white text-[var(--color-ink)] text-sm outline-none focus:border-[var(--color-primary)] transition-colors" placeholder="Your first name" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wider">Last Name</label>
                        <input name="lastName" type="text" required className="w-full px-4 py-3 rounded-[8px] border border-[var(--color-line)] bg-white text-[var(--color-ink)] text-sm outline-none focus:border-[var(--color-primary)] transition-colors" placeholder="Your last name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wider">Email</label>
                      <input name="email" type="email" required className="w-full px-4 py-3 rounded-[8px] border border-[var(--color-line)] bg-white text-[var(--color-ink)] text-sm outline-none focus:border-[var(--color-primary)] transition-colors" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wider">Subject</label>
                      <select name="subject" className="w-full px-4 py-3 rounded-[8px] border border-[var(--color-line)] bg-white text-[var(--color-ink)] text-sm outline-none focus:border-[var(--color-primary)] transition-colors">
                        {pageInquiryTypes.map((type) => <option key={type}>{type}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wider">Message</label>
                      <textarea name="message" rows={5} required className="w-full px-4 py-3 rounded-[8px] border border-[var(--color-line)] bg-white text-[var(--color-ink)] text-sm outline-none focus:border-[var(--color-primary)] transition-colors resize-none" placeholder="Tell us how we can help..." />
                    </div>
                    <button type="submit" className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-[8px] bg-[var(--color-ink)] font-bold text-[0.9rem] transition-all duration-250 hover:-translate-y-0.5 hover:bg-[var(--color-primary)]" style={{ color: '#ffffff' }}>
                      Prepare Email
                      <BrandGlyph label="send" tone="button" />
                    </button>
                  </form>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="space-y-5">
                  <div className="bg-[var(--color-paper)] rounded-[8px] p-8 border border-[var(--color-line)] premium-card">
                    <BrandGlyph label="BD" tone="light" className="mb-5" />
                    <h3 className="mb-3" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: '1.7rem', color: 'var(--color-ink)' }}>
                      {page.officeTitle || 'Office'}
                    </h3>
                    <p className="text-[var(--color-muted)] text-[0.92rem] leading-[1.7] m-0">{contactAddress}</p>
                  </div>

                  <div className="bg-[var(--color-paper)] rounded-[8px] p-8 border border-[var(--color-line)] premium-card">
                    <BrandGlyph label="HR" tone="light" className="mb-5" />
                    <h3 className="mb-3" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: '1.7rem', color: 'var(--color-ink)' }}>
                      {page.hoursTitle || 'Business Hours'}
                    </h3>
                    <p className="text-[var(--color-muted)] text-[0.92rem] leading-[1.8] m-0">
                      {businessHours.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                    {pageSupportCards.map((item, index) => {
                      return (
                        <article key={item.title} className="rounded-[8px] bg-white border border-[var(--color-line)] p-5">
                          <BrandGlyph label={item.mark || ['D', 'E', 'P'][index] || String(index + 1)} tone="mini" className="mb-3" />
                          <strong className="block text-[0.9rem] text-[var(--color-ink)]">{item.title}</strong>
                          <p className="m-0 mt-2 text-[0.8rem] text-[var(--color-muted)] leading-[1.6]">{item.text}</p>
                        </article>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
