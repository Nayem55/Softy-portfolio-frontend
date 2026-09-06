import { useData } from '../context/DataContext'

export default function Marquee() {
  const { content } = useData()
  const items = content?.marquee?.items || [
    'Global Cosmetics Lines',
    'Feel The Pure Softness',
    'Softyy',
    'Fresh Daily Confidence',
    'Authentic Skincare',
    'Quality You Can Trust',
    'Lab-Guided Formulas',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="w-full max-w-[100vw] overflow-hidden bg-[var(--color-ink)] py-4" style={{ color: '#ffffff', overflowX: 'clip' }}>
      <div
        className="w-max flex gap-8 items-center uppercase tracking-[0.16em] text-[0.72rem] font-medium"
        style={{ animation: 'marquee 28s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="whitespace-nowrap flex items-center gap-8">
            {item}
            <span className="text-[var(--color-accent)] text-[0.5rem]">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
