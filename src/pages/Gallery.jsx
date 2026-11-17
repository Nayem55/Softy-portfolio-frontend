import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Grain from '../components/Grain'
import ScrollReveal from '../components/ScrollReveal'
import { useData } from '../context/DataContext'
import { optimizedImageUrl } from '../utils/imageUrl'

export default function Gallery() {
  const { content } = useData()
  const gallery = content?.gallery || {}
  const items = Array.isArray(gallery.items) ? gallery.items.filter((item) => item?.image) : []
  const [selected, setSelected] = useState(null)

  return <>
    <Grain />
    <Navbar />
    <main id="top" className="pt-[112px] pb-20 max-sm:pt-[92px]">
      <section className="brand-shell pt-10 pb-12 max-sm:pt-7 max-sm:pb-8">
        <ScrollReveal>
          <p className="section-kicker">{gallery.eyebrow || 'Gallery'}</p>
          <h1 className="display-title mt-4 max-w-3xl text-[clamp(3rem,6vw,6.25rem)] leading-[.92]">{gallery.title || 'Product gallery'}</h1>
          {gallery.description && <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[var(--color-muted)]">{gallery.description}</p>}
        </ScrollReveal>
      </section>

      <section className="brand-shell">
        {items.length ? <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {items.map((item, index) => <ScrollReveal key={item.id || `${item.image}-${index}`} delay={(index % 3) * 0.08} className="mb-5 break-inside-avoid">
            <button type="button" onClick={() => setSelected(item)} className="group block w-full overflow-hidden rounded-[18px] bg-[var(--color-paper)] text-left border border-[var(--color-line)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-wine)]">
              <img src={optimizedImageUrl(item.image, { width: 1400, quality: 'auto:good' })} alt={item.alt || item.title || 'Global Cosmetics Lines product'} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.035]" loading="lazy" />
              {(item.title || item.caption) && <span className="block px-4 py-3"><strong className="block text-sm">{item.title}</strong>{item.caption && <small className="block mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{item.caption}</small>}</span>}
            </button>
          </ScrollReveal>)}
        </div> : <div className="border border-[var(--color-line)] rounded-[18px] bg-[var(--color-paper)] px-6 py-16 text-center"><h2 className="display-title text-3xl">The gallery is being curated.</h2><p className="mt-3 text-sm text-[var(--color-muted)]">New product photography will appear here soon.</p></div>}
      </section>
    </main>
    {selected && <div className="fixed inset-0 z-[1200] bg-black/75 p-5 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={selected.title || 'Gallery image'} onClick={() => setSelected(null)}><button type="button" className="absolute right-6 top-6 text-white text-sm font-bold" onClick={() => setSelected(null)}>Close</button><div className="max-w-5xl max-h-full" onClick={(event) => event.stopPropagation()}><img src={optimizedImageUrl(selected.image, { width: 2200, quality: 'auto:good' })} alt={selected.alt || selected.title || 'Global Cosmetics Lines product'} className="max-h-[85vh] max-w-full object-contain rounded-xl" />{(selected.title || selected.caption) && <div className="mt-3 text-center text-white"><strong>{selected.title}</strong>{selected.caption && <p className="mt-1 text-sm text-white/80">{selected.caption}</p>}</div>}</div></div>}
    <Footer />
  </>
}
