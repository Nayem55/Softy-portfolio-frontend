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
      <main id="top" className="pt-[100px]">
        <section className="py-[60px] max-sm:py-[40px]">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
              <div>
                <Link to="/categories" className="text-[var(--color-wine)] text-sm font-bold hover:underline mb-6 inline-block">← All Categories</Link>
                <h1 className="m-0 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)', fontWeight: 400, fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.95 }}>
                  {category.name}
                </h1>
                <p className="text-[var(--color-muted)] text-[1.05rem] leading-[1.7] mt-4 max-w-[540px]">{category.description}</p>
              </div>
              <div className="aspect-[1.35/1] rounded-[8px] overflow-hidden softyy-media-frame border border-[var(--color-line)] p-8 grid place-items-center premium-card">
                <img src={category.image} alt={category.name} className="softyy-media-contain" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-[80px] max-sm:py-[50px]">
          <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-sm:w-[min(100%-24px,1180px)]">
            {categoryProducts.length === 0 ? (
              <p className="text-[var(--color-muted)] py-10 text-center">No products in this category yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map(product => (
                  <ScrollReveal key={product._id}>
                    <Link to={`/products/${product.slug || product._id}`} className="group block bg-[var(--color-paper)] rounded-[8px] overflow-hidden border border-[var(--color-line)] premium-card transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-square overflow-hidden softyy-media-frame p-5 grid place-items-center">
                        <img src={product.image} alt={product.title} className="softyy-media-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                      </div>
                      <div className="p-6">
                        <span className="text-[0.7rem] font-bold text-[var(--color-wine)] uppercase tracking-wider">{product.tag}</span>
                        <h3 className="m-0 mt-2 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-italiana)', fontSize: '1.4rem' }}>{product.title}</h3>
                        <p className="text-[var(--color-muted)] text-[0.85rem] mt-2 line-clamp-2">{product.desc}</p>
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
