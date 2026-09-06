import { useParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Grain from '../components/Grain'
import ScrollReveal from '../components/ScrollReveal'

export default function CategoryDetail() {
  const { slug } = useParams()
  const { categories, products } = useData()

  const category = categories.find(c => c.slug === slug)
  const categoryProducts = products.filter(p => p.categoryId === category?._id)

  if (!category) {
    return (
      <>
        <Grain />
        <Navbar />
        <main id="top" className="pt-[100px] min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-italiana)', color: 'var(--color-ink)' }}>Category Not Found</h1>
            <Link to="/categories" className="text-[var(--color-wine)] font-bold hover:underline">← Back to Categories</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Grain />
      <Navbar />
      <main id="top" className="pt-[88px]">
        <section className="py-[48px] max-sm:py-[34px]">
          <div className="brand-shell">
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-9 items-center">
              <div>
                <Link to="/categories" className="text-[var(--color-wine)] text-sm font-bold hover:underline mb-6 inline-block">← All Categories</Link>
                <h1 className="m-0 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.95 }}>
                  {category.name}
                </h1>
                <p className="text-[var(--color-muted)] text-[1.05rem] leading-[1.7] mt-4 max-w-[540px]">{category.description}</p>
              </div>
              <div className="image-card-smooth aspect-[1.35/1] overflow-hidden p-1.5">
                <img src={category.image} alt={category.name} className="h-full w-full rounded-[18px] object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-[64px] max-sm:py-[48px]">
          <div className="brand-shell">
            {categoryProducts.length === 0 ? (
              <p className="text-[var(--color-muted)] py-10 text-center">No products in this category yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categoryProducts.map(product => (
                  <ScrollReveal key={product._id} className="h-full">
                    <Link to={`/products/${product.slug || product._id}`} className="catalog-product-card group flex h-full flex-col overflow-hidden rounded-[20px] bg-white p-1.5 transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-[1.1/1] overflow-hidden rounded-[17px] bg-[var(--color-rose)]">
                        <img src={product.image} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
                      </div>
                      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                        <span className="text-[0.68rem] font-extrabold text-[var(--color-primary)] uppercase tracking-[0.14em]">{product.tag}</span>
                        <h3 className="m-0 mt-3 text-[var(--color-ink)] leading-[1.08]" style={{ fontFamily: 'var(--font-italiana)', fontSize: '1.5rem', fontWeight: 500 }}>{product.title}</h3>
                        <p className="text-[var(--color-muted)] text-[0.86rem] leading-[1.55] mt-3 mb-0 line-clamp-2">{product.desc}</p>
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
