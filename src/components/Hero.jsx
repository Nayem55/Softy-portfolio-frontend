import { useEffect, useState } from 'react'
import { useData } from '../context/DataContext'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import BrandGlyph from './BrandGlyph'
import { optimizedImageUrl } from '../utils/imageUrl'

export default function Hero() {
  const { content } = useData()

  const hero = content?.hero || {
    eyebrow: 'Global Cosmetics Lines - care made close to home',
    title: 'Care that feels',
    titleItalic: 'quietly certain.',
    description: 'Meet Softyy skincare and Fresh Daily essentials. Thoughtful care for your skin, your home, and the small rituals that make each day feel good.',
    primaryBtn: 'Explore the Collection',
    secondaryBtn: 'Our Story',
    image: '/editorial/softyy-hero-editorial.png',
    floatingCard: {
      small: 'Customer Focus',
      title: 'Oil Control',
      desc: 'Discover cleansers and targeted serum care for your daily routine.',
      image: '/products/softyy/acne-serum.jpg',
    },
    stats: [
      { label: 'Everyday-first formulas', sublabel: '' },
      { label: 'Careful product curation', sublabel: '' },
      { label: 'Support you can reach', sublabel: '' },
    ],
  }
  const slides = Array.isArray(hero.slides) && hero.slides.length ? hero.slides : [hero]
  const [activeSlide, setActiveSlide] = useState(0)
  useEffect(() => { setActiveSlide(0) }, [slides.length])
  useEffect(() => { if (slides.length < 2) return undefined; const timer = window.setInterval(() => setActiveSlide(index => (index + 1) % slides.length), 6000); return () => window.clearInterval(timer) }, [slides.length])
  const activeHero = { ...hero, ...slides[activeSlide] }
  const stats = activeHero.stats?.length ? activeHero.stats : [
    { label: 'Everyday-first formulas', sublabel: '' },
    { label: 'Careful product curation', sublabel: '' },
    { label: 'Support you can reach', sublabel: '' },
  ]
  const floatingCard = activeHero.floatingCard || {}

  if (hero.mode === 'banners') {
    return <BannerSlider banners={(hero.banners || []).filter((banner) => banner.isActive !== false)} />
  }

  return (
    <section className="min-h-[90vh] pt-[104px] pb-[56px] relative overflow-hidden hero-atmosphere bg-white max-xl:min-h-[620px] max-xl:pt-[94px] max-xl:pb-[38px] max-lg:min-h-0 max-lg:pt-[82px] max-lg:pb-[58px] max-sm:pt-[86px] max-sm:pb-[42px]">
      <div className="brand-shell relative">
        <div className="grid grid-cols-[0.98fr_1.02fr] gap-[56px] items-center min-h-[calc(90vh-160px)] max-xl:min-h-[470px] max-xl:items-start max-xl:gap-[40px] max-lg:grid-cols-1 max-lg:min-h-0 max-lg:gap-[34px]">
          <ScrollReveal>
            <div className="max-lg:text-center max-sm:text-left">
              <span className="section-kicker mb-7 max-sm:mb-5">{activeHero.eyebrow}</span>

              <h1
                className="display-title hero-title mt-0 mb-0 leading-[0.98]"
              >
                {activeHero.title}
                <br />
                <em className="not-italic" style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>
                  {activeHero.titleItalic}
                </em>
              </h1>

              <p className="max-w-[585px] text-[1.08rem] my-[22px] leading-[1.45] text-[var(--color-muted)] max-lg:mx-auto max-sm:mx-0 max-sm:my-[20px] max-sm:text-[0.95rem] max-sm:leading-[1.7]">
                {activeHero.description}
              </p>

              <div className="flex gap-3 flex-wrap max-lg:justify-center max-sm:grid max-sm:grid-cols-2 max-sm:justify-stretch">
                <Link
                  to="/collection"
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-3.5 gcl-button text-white font-bold text-[0.88rem] transition-all duration-300 hover:-translate-y-0.5 max-sm:px-4"
                >
                  {activeHero.primaryBtn}
                  <BrandGlyph label="arrow" tone="button" />
                </Link>
                <Link
                  to="/story"
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-3.5 border border-[var(--color-line)] bg-white text-[var(--color-ink)] font-bold text-[0.88rem] transition-all duration-300 hover:bg-[var(--color-rose)] max-sm:px-4"
                >
                  {activeHero.secondaryBtn}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-7 mt-8 max-lg:justify-center max-sm:justify-start max-sm:mt-7 max-sm:gap-4">
                {stats.map((item, i) => {
                  return (
                  <div key={i} className="flex items-center gap-3 text-left">
                    <BrandGlyph label={['A', 'Q', '03'][i] || 'A'} tone="soft" className="shrink-0" />
                    <div className="text-[0.72rem] leading-[1.35] text-[var(--color-muted)]">
                      <strong className="block font-medium text-[var(--color-muted)]">{item.label}</strong>
                      {item.sublabel && <span>{item.sublabel}</span>}
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="hero-art-reference max-sm:mt-1">
              <div className="hero-image-panel overflow-hidden border border-white/70 bg-[var(--color-paper)] p-1.5 grid place-items-center">
                <img
                  src={optimizedImageUrl(activeHero.image || '/editorial/softyy-hero-editorial.png', { width: 2000, quality: 'auto:good' })}
                  alt="Global Cosmetics Lines skincare collection"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="hero-ghost-card" />

              <div className="hero-mini-card overflow-hidden border border-[var(--color-line)] bg-white p-3 premium-card">
                <div className="h-[116px] overflow-hidden rounded-[8px] media-frame">
                  <img src={optimizedImageUrl(floatingCard.image || '/products/softyy/acne-serum.jpg', { width: 560 })} alt={floatingCard.title || 'Global Cosmetics Lines featured product'} className="w-full h-full object-cover" />
                </div>
                <span className="block mt-3 text-[0.82rem] leading-tight text-[var(--color-muted)]">Routine pick · daily care</span>
              </div>

              <div className="hero-note-card bg-[var(--color-primary)] text-white p-6 premium-card flex flex-col justify-between min-h-[204px] max-sm:min-h-[170px] max-sm:p-4">
                  <span className="text-[0.62rem] uppercase tracking-[0.16em] text-white/62">{floatingCard.small || 'Customer Focus'}</span>
                  <div>
                    <strong className="display-title block text-[1.9rem] font-bold leading-[0.95] max-sm:text-[1.55rem]">{floatingCard.title || 'Oil Control'}</strong>
                    <span className="block mt-4 text-[0.8rem] leading-[1.55] text-white/85">{floatingCard.desc || 'Discover cleansers and targeted serum care for your daily routine.'}</span>
                  </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        {slides.length > 1 && <div className="flex justify-center gap-2 mt-5" aria-label="Hero banners">{slides.map((slide, index) => <button key={slide.id || slide.title || index} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show banner ${index + 1}`} className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-8 bg-[var(--color-primary)]' : 'w-2 bg-[var(--color-line)]'}`} />)}</div>}
      </div>
    </section>
  )
}

function BannerSlider({ banners }) {
  const [active, setActive] = useState(0)
  useEffect(() => { setActive(0) }, [banners.length])
  useEffect(() => {
    if (banners.length < 2) return undefined
    const timer = window.setInterval(() => setActive((index) => (index + 1) % banners.length), 6000)
    return () => window.clearInterval(timer)
  }, [banners.length])
  if (!banners.length) return <section className="pt-[104px] min-h-[50vh] bg-white"><div className="brand-shell py-20"><h1 className="display-title">Homepage banners are being prepared.</h1></div></section>
  const banner = banners[active]
  return <section className="pt-[80px] bg-white" aria-label="Homepage banners"><div className="relative min-h-[620px] max-md:min-h-[520px] overflow-hidden bg-[var(--color-paper)]"><picture><source media="(max-width: 640px)" srcSet={banner.mobileImage || banner.image}/><img src={optimizedImageUrl(banner.image, { width: 2200, quality: 'auto:good' })} alt={banner.title || 'Global Cosmetics Lines banner'} className="absolute inset-0 w-full h-full object-cover"/></picture><div className="absolute inset-0 bg-black/30"/><div className="brand-shell relative min-h-[620px] max-md:min-h-[520px] flex items-end pb-16 max-md:pb-12"><div className="max-w-[640px] text-white"><p className="text-lg mb-3">{banner.subtitle}</p><h1 className="display-title text-white text-[clamp(3rem,7vw,6.5rem)] leading-[.9]">{banner.title}</h1>{banner.description && <p className="mt-6 text-lg leading-relaxed text-white/90">{banner.description}</p>}{banner.linkText && banner.linkUrl && <Link to={banner.linkUrl} className="inline-flex mt-7 px-5 py-3 bg-white text-[var(--color-ink)] font-bold rounded-[12px]">{banner.linkText}</Link>}</div></div>{banners.length > 1 && <div className="absolute bottom-7 left-0 right-0 flex justify-center gap-2">{banners.map((item, index) => <button key={`${item.title}-${index}`} type="button" onClick={() => setActive(index)} aria-label={`Show banner ${index + 1}`} className={`h-2 rounded-full transition-all ${index === active ? 'w-8 bg-white' : 'w-2 bg-white/60'}`}/>)}</div>}</div></section>
}
