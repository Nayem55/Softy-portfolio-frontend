const paths = {
  authentic: (
    <>
      <path d="M12 3.4 18.4 6v4.8c0 4.1-2.7 7.7-6.4 9.1-3.7-1.4-6.4-5-6.4-9.1V6L12 3.4Z" />
      <path d="m9 12 2 2 4.2-5" />
    </>
  ),
  lab: (
    <>
      <path d="M10 3.8h4" />
      <path d="M11 4v5.3l-4.2 7.1c-.8 1.4.2 3.1 1.8 3.1h6.8c1.6 0 2.6-1.7 1.8-3.1L13 9.3V4" />
      <path d="M8.6 15.4h6.8" />
    </>
  ),
  routine: (
    <>
      <path d="M7.2 8.4c1.4-2.5 4.4-3.8 7.2-2.9 3.1 1 4.8 4.3 3.8 7.4" />
      <path d="M17.7 8.2V5h-3.2" />
      <path d="M16.8 15.6c-1.4 2.5-4.4 3.8-7.2 2.9-3.1-1-4.8-4.3-3.8-7.4" />
      <path d="M6.3 15.8V19h3.2" />
    </>
  ),
  support: (
    <>
      <path d="M5.5 12.1a6.5 6.5 0 0 1 13 0v3.2" />
      <path d="M8 11.6h-1.2c-.8 0-1.4.6-1.4 1.4v1.8c0 .8.6 1.4 1.4 1.4H8v-4.6Z" />
      <path d="M16 11.6h1.2c.8 0 1.4.6 1.4 1.4v1.8c0 .8-.6 1.4-1.4 1.4H16v-4.6Z" />
      <path d="M14.8 18.2h-2.2" />
    </>
  ),
  delivery: (
    <>
      <path d="M4.2 7.5h9.4v8H4.2z" />
      <path d="M13.6 10.1h3l2.2 2.7v2.7h-5.2" />
      <path d="M7.1 18.1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M16.1 18.1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    </>
  ),
  privacy: (
    <>
      <path d="M7.4 10.3V8.2a4.6 4.6 0 0 1 9.2 0v2.1" />
      <path d="M6.2 10.3h11.6v9H6.2z" />
      <path d="M12 14.1v2" />
    </>
  ),
  exchange: (
    <>
      <path d="M7.2 8.1h8.6l-2.1-2.1" />
      <path d="M16.8 15.9H8.2l2.1 2.1" />
      <path d="M15.8 8.1c1.1 1 1.8 2.4 1.8 3.9" />
      <path d="M8.2 15.9A5.4 5.4 0 0 1 6.4 12" />
    </>
  ),
  skin: (
    <>
      <path d="M12 4.2c3.1 2 5 4.8 5 7.7a5 5 0 0 1-10 0c0-2.9 1.9-5.7 5-7.7Z" />
      <path d="M9.4 13.3c1 .9 2.7 1.3 4.7.2" />
    </>
  ),
  care: (
    <>
      <path d="M12 19s-6.4-3.8-7.4-8.2C4 8 5.7 5.9 8.2 5.9c1.5 0 2.8.8 3.8 2.1 1-1.3 2.3-2.1 3.8-2.1 2.5 0 4.2 2.1 3.6 4.9C18.4 15.2 12 19 12 19Z" />
      <path d="M8.4 12h2l1.1-2.1 1.4 4.2 1.1-2.1h1.7" />
    </>
  ),
  useful: (
    <>
      <path d="M12 4.2v15.6" />
      <path d="M6 7.2c3.7 0 6 2 6 5.6-3.8 0-6-1.9-6-5.6Z" />
      <path d="M18 7.2c-3.7 0-6 2-6 5.6 3.8 0 6-1.9 6-5.6Z" />
    </>
  ),
  home: (
    <>
      <path d="m4.8 11.2 7.2-6 7.2 6" />
      <path d="M7.1 10.3v8h9.8v-8" />
      <path d="M10.2 18.3v-4.4h3.6v4.4" />
    </>
  ),
  shop: (
    <>
      <path d="M7 8.4h10l.8 11H6.2l.8-11Z" />
      <path d="M9.2 8.4a2.8 2.8 0 0 1 5.6 0" />
    </>
  ),
  story: (
    <>
      <path d="M6.2 5.1h8.4a3.2 3.2 0 0 1 3.2 3.2v10.6H8.4a2.2 2.2 0 0 1-2.2-2.2V5.1Z" />
      <path d="M9 8.5h5.7" />
      <path d="M9 11.8h4.2" />
    </>
  ),
  message: (
    <>
      <path d="M5 6.6h14v9.2H9l-4 3.1V6.6Z" />
      <path d="M8.8 10.3h6.4" />
      <path d="M8.8 13h4.2" />
    </>
  ),
  email: (
    <>
      <path d="M4.8 7.2h14.4v9.6H4.8z" />
      <path d="m5.4 7.8 6.6 5 6.6-5" />
    </>
  ),
  phone: (
    <>
      <path d="M8.1 4.7 10 8.8l-1.7 1.3c.8 1.8 2.2 3.2 4 4l1.3-1.7 4.1 1.9-.9 3.7c-.2.7-.8 1.1-1.5 1C9.8 18.4 5.6 14.2 5 8.7c-.1-.7.3-1.3 1-1.5l2.1-.5Z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M6.1 18.2 7 15.6a6.4 6.4 0 1 1 2.4 2.2l-3.3.4Z" />
      <path d="M9.7 9.4c.6 2.2 2 3.6 4.2 4.2l1-1.2" />
      <path d="m8.9 8.3.8 1.1" />
    </>
  ),
  facebook: (
    <>
      <path d="M13.4 8.2h2V5.3h-2.5c-2 0-3.3 1.3-3.3 3.4v2H7.7v2.9h1.9v5.1h3.1v-5.1h2.1l.4-2.9h-2.5V9.1c0-.6.3-.9.7-.9Z" />
    </>
  ),
  location: (
    <>
      <path d="M12 20s6-5.1 6-10.2a6 6 0 0 0-12 0C6 14.9 12 20 12 20Z" />
      <path d="M12 11.7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </>
  ),
  time: (
    <>
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 8v4.4l3 1.8" />
    </>
  ),
  house: (
    <>
      <path d="M5.3 18.6V9.4L12 4.2l6.7 5.2v9.2" />
      <path d="M8.2 18.6v-6.7h7.6v6.7" />
      <path d="M10.1 14.5h3.8" />
    </>
  ),
  arrow: (
    <>
      <path d="M5.2 12h12.4" />
      <path d="m13.2 7.6 4.4 4.4-4.4 4.4" />
    </>
  ),
  send: (
    <>
      <path d="m4.6 5.4 15 6.6-15 6.6 2.7-6.6-2.7-6.6Z" />
      <path d="M7.3 12H15" />
    </>
  ),
}

const aliases = {
  A: 'authentic',
  Q: 'lab',
  R: 'routine',
  S: 'skin',
  C: 'care',
  U: 'useful',
  D: 'delivery',
  E: 'exchange',
  P: 'privacy',
  BD: 'location',
  HR: 'time',
  EM: 'email',
  PH: 'phone',
  WA: 'whatsapp',
  FB: 'facebook',
  HO: 'home',
  SH: 'shop',
  ST: 'story',
  CO: 'message',
  GCL: 'house',
  '01': 'authentic',
  '02': 'lab',
  '03': 'support',
  '04': 'delivery',
  '05': 'skin',
  '06': 'care',
}

export default function BrandGlyph({ label = 'A', name, tone = 'light', className = '' }) {
  const iconName = name || aliases[label] || label || 'authentic'
  const icon = paths[iconName] || paths.authentic

  return (
    <span className={`brand-glyph brand-glyph-${tone} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        {icon}
      </svg>
    </span>
  )
}
