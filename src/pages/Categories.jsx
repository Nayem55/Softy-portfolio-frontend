import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Grain from '../components/Grain'
import ScrollReveal from '../components/ScrollReveal'

export default function Categories() {
  const { categories, products } = useData()

  const getProductCount = (catId) => products.filter(p => p.categoryId === catId).length

  return (
    <>
      <Grain />
      <Navbar />
      <main id="top" className="pt-[88px]">
        <section className="py-[48px] max-sm:py-[34px]">
          <div className="brand-shell">
            <ScrollReveal>
              <span className="uppercase tracking-[0.18em] text-[0.74rem] font-bold text-[var(--color-wine)] inline-flex items-center gap-2.5 mb-5">
                <span className="w-7 h-px bg-[var(--color-wine)]" />
                Explore by Category
              </span>
              <h1 className="mb-0" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.04em' }}>
                Categories
              </h1>
              <p className="mt-5 text-[var(--color-muted)] text-[1.05rem] leading-[1.7] max-w-[600px]">
                Browse Global Cosmetics Lines categories and see how each part of the portfolio supports a simple daily routine.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-[88px] max-sm:pb-[64px]">
          <div className="brand-shell">
            {categories.length === 0 ? (
              <p className="text-[var(--color-muted)] text-center py-20">No categories available yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((cat) => (
                  <ScrollReveal key={cat._id}>
                    <Link
                      to={`/categories/${cat.slug}`}
                      className="image-card-smooth group block overflow-hidden transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className="aspect-[1.08/1] overflow-hidden rounded-[18px]">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="px-5 pb-5 pt-6">
                        <h2 className="m-0 mb-2 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: '2rem' }}>
                          {cat.name}
                        </h2>
                        <p className="text-[var(--color-muted)] text-[0.9rem] leading-[1.65] mb-4">{cat.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[0.75rem] font-bold text-[var(--color-primary)] uppercase tracking-wider">
                            {getProductCount(cat._id)} Products
                          </span>
                          <span className="text-[0.85rem] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors">
                            View More →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
