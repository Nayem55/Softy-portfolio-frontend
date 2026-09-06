import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Testimonial from '../components/Testimonial'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Grain from '../components/Grain'
import ScrollReveal from '../components/ScrollReveal'
import { useData } from '../context/DataContext'
import { ArrowRight, BadgeCheck, FlaskConical, ShieldCheck, Truck } from 'lucide-react'

export default function Collection() {
  const { content, categories, brands, products } = useData()
  const page = content?.pages?.collection || {}
  const featured = products.slice(0, 3)
  const trustItems = page.trustItems || [
    { title: 'Authentic', text: 'Zero counterfeit policy' },
    { title: 'Lab-guided', text: 'R&D quality standards' },
    { title: 'Skin-focused', text: 'Useful everyday claims' },
    { title: 'Nationwide', text: 'Delivery across Bangladesh' },
  ]

  return (
    <>
      <Grain />
      <Navbar />
      <main id="top" className="pt-[88px]">
        <section className="py-[48px] max-sm:py-[34px]">
          <div className="brand-shell">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.96fr] gap-10 items-center">
              <ScrollReveal>
                <span className="uppercase tracking-[0.18em] text-[0.74rem] font-bold text-[var(--color-wine)] inline-flex items-center gap-2.5 mb-5">
                  <span className="w-7 h-px bg-[var(--color-wine)]" />
                  {page.eyebrow || 'The GCL Edit'}
                </span>
                <h1 className="mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95 }}>
                  {page.title || 'Curated care for everyday confidence.'}
                </h1>
                <p className="mt-5 text-[var(--color-muted)] text-[1.05rem] leading-[1.75] max-w-[640px]">
                  {page.description || 'Explore skincare, cosmetics, soap, and freshness essentials from the Global Cosmetics Lines brand family, selected for practical routines and reliable quality.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                  {[
                    [products.length, 'Products'],
                    [categories.length, 'Categories'],
                    [brands.length, 'Brands'],
                    ['BD', 'Delivery'],
                  ].map(([number, label]) => (
                    <div key={label} className="rounded-[8px] bg-white border border-[var(--color-line)] p-4">
                      <strong className="block text-[1.6rem] font-normal text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-italiana)' }}>{number}</strong>
                      <span className="text-[0.72rem] uppercase tracking-[0.12em] text-[var(--color-muted)]">{label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <div className="grid grid-cols-2 gap-4">
                  {featured.map((product, index) => (
                    <Link
                      key={product._id}
                      to={`/products/${product.slug || product._id}`}
                      className={`${index === 0 ? 'col-span-2' : ''} image-card-smooth group block overflow-hidden transition-all duration-300 hover:-translate-y-1`}
                    >
                      <div className={`${index === 0 ? 'aspect-[2.2/1]' : 'aspect-square'} overflow-hidden rounded-[18px]`}>
                        <img src={product.image} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="pb-[40px]">
          <div className="brand-shell">
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {trustItems.map((item, index) => {
                  const Icon = [ShieldCheck, FlaskConical, BadgeCheck, Truck][index] || BadgeCheck
                  return (
                  <div key={item.title} className="flex items-center gap-4 rounded-[8px] bg-white border border-[var(--color-line)] p-5">
                    <div className="w-11 h-11 rounded-[8px] bg-[var(--color-rose)] grid place-items-center shrink-0">
                      <Icon size={20} className="text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <strong className="block text-[0.9rem] text-[var(--color-ink)]">{item.title}</strong>
                      <span className="block text-[0.78rem] text-[var(--color-muted)] mt-0.5">{item.text}</span>
                    </div>
                  </div>
                )})}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {categories.length > 0 && (
          <section className="py-[62px] max-sm:py-[48px] surface-band">
            <div className="brand-shell">
              <div className="flex items-end justify-between gap-6 mb-9 max-sm:flex-col max-sm:items-start">
                <ScrollReveal>
                  <span className="uppercase tracking-[0.18em] text-[0.72rem] font-bold text-[var(--color-accent)]">{page.categoryEyebrow || 'Shop By Need'}</span>
                  <h2 className="mt-3 mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)', lineHeight: 1.04 }}>
                    {page.categoryTitle || 'Find the right daily routine.'}
                  </h2>
                </ScrollReveal>
                <Link to="/categories" className="inline-flex items-center gap-2 text-[0.82rem] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  View Categories
                  <ArrowRight size={15} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {categories.slice(0, 5).map((category) => (
                  <ScrollReveal key={category._id}>
                    <Link to={`/categories/${category.slug}`} className="image-card-smooth group block overflow-hidden transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-square overflow-hidden rounded-[18px]">
                        <img src={category.image} alt={category.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      </div>
                      <div className="px-4 pb-4 pt-5">
                        <h3 className="m-0 text-[1.25rem]" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400 }}>{category.name}</h3>
                        <p className="m-0 mt-2 text-[0.78rem] leading-[1.55] text-[var(--color-muted)]">{category.description}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <Products showHeader={true} />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
