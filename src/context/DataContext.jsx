import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../api'

const DataContext = createContext(null)

export const softyyContent = {
  hero: {
    eyebrow: 'Skin care, made close to home',
    title: 'Care that feels',
    titleItalic: 'quietly certain.',
    description: 'SoftyyBD brings authentic skincare and freshness essentials to Bangladesh with practical formulas, careful sourcing, and support people can actually reach.',
    primaryBtn: 'Explore the Collection',
    secondaryBtn: 'Our Story',
  },
  marquee: {
    items: ['Authentic products', 'In-house quality care', 'Bangladesh-wide delivery', 'SoftyyBD', 'Fresh Daily'],
  },
  manifesto: {
    eyebrow: 'How we work',
    title: 'A routine should feel simple before it feels beautiful.',
    description: 'Every product decision starts with usefulness: clear skin concerns, honest care claims, accessible pricing, and quality checks that make repeat purchase feel easy.',
    quote: 'We are building SoftyyBD for the customer who reads the label, checks the seal, and still wants the experience to feel beautiful.',
    stats: [
      { number: '01', label: 'Verified sourcing' },
      { number: '02', label: 'R&D guided quality' },
      { number: '03', label: 'Daily-use formulas' },
      { number: '04', label: 'Responsive support' },
    ],
  },
  story: {
    eyebrow: 'The brand story',
    title: 'Global Cosmetics Line\'s, built for everyday trust.',
    description: 'SoftyyBD was created to make authentic skincare, personal care, and home freshness products easier to discover and safer to buy across Bangladesh.',
    items: [
      { icon: 'shield', title: 'Authentic by policy', desc: 'A zero-counterfeit approach keeps trust at the center of the customer experience.' },
      { icon: 'flask', title: 'Guided by formulation care', desc: 'An active quality mindset, chemist involvement, and R&D direction shape how products are developed.' },
      { icon: 'heart', title: 'Made for real routines', desc: 'From face wash to air freshener, the portfolio is practical, affordable, and easy to use daily.' },
    ],
    ctaBtn: 'Contact SoftyyBD',
  },
  testimonial: {
    stars: 5,
    quote: 'Authentic care, fair pricing, and useful formulas should belong in the same routine.',
    person: 'SOFTYYBD',
    role: 'Brand Promise',
  },
  cta: {
    eyebrow: 'Business & support',
    title: 'For retail, distribution, or customer care, talk to the SoftyyBD team.',
    description: 'Connect with Global Cosmetics Line\'s for partnerships, product questions, delivery support, and brand inquiries.',
    email: 'globalcosmeticslines@gmail.com',
  },
  footer: {
    description: 'Authentic skincare and freshness essentials from Global Cosmetics Line\'s. Feel The Pure Softness.',
    columns: [
      { title: 'Discover', links: [{ text: 'Collection', href: '/collection' }, { text: 'Our Story', href: '/story' }, { text: 'Philosophy', href: '/philosophy' }] },
      { title: 'Business', links: [{ text: 'Distribution', href: '/contact' }, { text: 'Retail', href: '/contact' }, { text: 'Support', href: '/contact' }] },
      { title: 'Social', links: [{ text: 'Facebook', href: 'https://www.facebook.com/softyybd' }, { text: 'WhatsApp', href: 'https://wa.me/8801911238421' }, { text: 'Email', href: 'mailto:globalcosmeticslines@gmail.com' }] },
    ],
    copyright: '2026 Global Cosmetics Line\'s. All rights reserved.',
    tagline: 'Feel The Pure Softness.',
  },
  navbar: {
    brandName: 'SOFTYY',
    brandInitial: 'S',
    links: [
      { text: 'Collection', href: '/collection' },
      { text: 'Our Story', href: '/story' },
      { text: 'Philosophy', href: '/philosophy' },
      { text: 'Contact', href: '/contact' },
    ],
    ctaBtn: 'Explore Beauty',
  },
  pages: {
    collection: {
      eyebrow: 'The SoftyyBD Edit',
      title: 'Curated care for everyday confidence.',
      description: 'Explore skincare, cosmetics, soap, and freshness essentials from the SoftyyBD brand family, selected for practical routines and reliable quality.',
      categoryEyebrow: 'Shop By Need',
      categoryTitle: 'Find the right daily routine.',
      trustItems: [
        { title: 'Authentic', text: 'Zero counterfeit policy' },
        { title: 'Lab-guided', text: 'R&D quality standards' },
        { title: 'Skin-focused', text: 'Useful everyday claims' },
        { title: 'Nationwide', text: 'Delivery across Bangladesh' },
      ],
    },
    story: {
      eyebrow: 'Our Story',
      title: 'A beauty house built around trust.',
      description: 'SoftyyBD brings authentic cosmetics, skincare, and freshness essentials to customers who want clear claims, practical formulas, and a smoother shopping experience.',
      image: '/products/softyy/cover.jpg',
      stats: [
        { number: '2', label: 'Core brands' },
        { number: '12+', label: 'Portfolio items' },
        { number: 'BD', label: 'Nationwide care' },
      ],
      journeyEyebrow: 'Brand Journey',
      journeyTitle: 'From careful sourcing to confident daily use.',
      chapters: [
        { label: 'Founded with a clear promise', title: 'Authentic care first', text: 'SoftyyBD was created by Global Cosmetics Line\'s to make trustworthy skincare easier to find, easier to understand, and easier to buy across Bangladesh.' },
        { label: 'Built for everyday routines', title: 'Beauty that feels usable', text: 'The portfolio focuses on practical skin and lifestyle needs: cleansers, serums, gels, soaps, and home freshness products designed for daily confidence.' },
        { label: 'Made to scale responsibly', title: 'Quality before noise', text: 'Every brand expression is shaped around reliable sourcing, in-house quality thinking, and direct support so customers can shop with more clarity.' },
      ],
      trustEyebrow: 'Why Customers Trust Us',
      trustTitle: 'A practical promise for beauty in Bangladesh.',
      trustDescription: 'The company is based in Dhaka and serves customers through clear product information, reliable support, and delivery-focused operations.',
      address: '64/68 North Kamalapur, Dhaka - 1217, Bangladesh',
      promises: [
        { title: 'Zero counterfeit policy', text: 'Products are sourced through the company brand family and authorized manufacturing relationships.' },
        { title: 'Lab-guided standards', text: 'Experienced chemists and R&D practice guide formulation, inspection, and product development.' },
        { title: 'All skin type focus', text: 'Care formats are developed for diverse skin concerns, from oil control to soothing moisture.' },
        { title: 'Support-led shopping', text: 'Clear contact channels, order confirmation, and nationwide delivery keep the experience dependable.' },
      ],
      familyEyebrow: 'Brand Family',
      familyTitle: 'Softyy and Fresh Daily, one trusted house.',
    },
    philosophy: {
      eyebrow: 'Our Philosophy',
      title: 'Simple care, serious standards.',
      description: 'SoftyyBD believes healthy skin should feel accessible, transparent, and dependable. The philosophy is practical: verified products, fair value, careful formulation, and support that respects the customer.',
      statement: 'Beauty should never ask customers to choose between confidence, clarity, and care.',
      statementDetail: 'That is why SoftyyBD combines authenticity, quality control, and accessible pricing into one customer promise.',
      principlesEyebrow: 'Operating Principles',
      principlesTitle: 'The rules behind the SoftyyBD experience.',
      principles: [
        { title: 'Authenticity is non-negotiable', text: 'A strict zero-counterfeit position protects customer trust and keeps the portfolio focused on verified products.' },
        { title: 'Quality starts before launch', text: 'R&D, chemist guidance, and inspection routines help each formula move from idea to shelf with better discipline.' },
        { title: 'Useful luxury over excess', text: 'Products are designed around daily needs: oil control, brightening, cleansing, soothing, freshness, and confidence.' },
        { title: 'The experience matters', text: 'Ordering, confirmation, packaging, delivery, and support are treated as part of the product promise.' },
      ],
      checklistEyebrow: 'Quality Checklist',
      checklistTitle: 'Premium means the details are easier to trust.',
      standards: [
        'Clear product claims and usage context',
        'All-skin-type thinking where the formula allows',
        'Paraben and sulphate free positioning across key cleansers',
        'Patch-test guidance for individual skin sensitivity',
        'Order verification before fulfillment',
        'Fast customer response for damage, defect, or wrong-item issues',
      ],
      careEyebrow: 'Customer Care',
      careTitle: 'Clear policies make the purchase feel safer.',
      policyCards: [
        { title: 'Delivery Window', detail: 'Inside Dhaka: 24 to 48 hours. Outside Dhaka: 2 to 4 business days.' },
        { title: 'Exchange Standard', detail: 'Unused, sealed products can be reviewed for exchange when damaged, defective, or incorrectly delivered.' },
        { title: 'Privacy Promise', detail: 'Customer information is used for orders and service improvement, never sold for third-party marketing.' },
      ],
    },
    contact: {
      eyebrow: 'Contact SoftyyBD',
      title: 'Let us make care easier to reach.',
      description: 'Reach Global Cosmetics Line\'s for distribution, retail partnerships, customer support, collaborations, press requests, and brand inquiries.',
      email: 'globalcosmeticslines@gmail.com',
      phone: '01911-238421',
      address: '64/68 North Kamalapur, Dhaka - 1217, Bangladesh',
      whatsappUrl: 'https://wa.me/8801911238421',
      facebookUrl: 'https://www.facebook.com/softyybd',
      inquiryTypes: ['Distribution Inquiry', 'Retail Partnership', 'Customer Support', 'Press & Media', 'Collaboration', 'General Inquiry'],
      officeTitle: 'Office',
      hoursTitle: 'Business Hours',
      businessHours: 'Saturday to Thursday: 9:00 AM to 6:00 PM\nFriday: Limited support',
      supportCards: [
        { title: 'Delivery', text: 'Inside Dhaka orders usually arrive within 24 to 48 hours. Outside Dhaka orders usually arrive within 2 to 4 business days.' },
        { title: 'Exchange', text: 'Defective, damaged, or incorrect items can be reviewed when reported quickly with proof and intact packaging.' },
        { title: 'Privacy', text: 'Customer details are used for order processing and service improvement, not sold for third-party marketing.' },
      ],
    },
  },
}

const isDemoContent = (value) => {
  const text = JSON.stringify(value || {}).toLowerCase()
  return [
    'adornica',
    'velvet icon',
    'second skin',
    'afterglow palette',
    'artist essentials',
    'luna glow',
    'glass skin',
    'images.unsplash.com',
    'realtechniques.com',
    'arowbee.com',
  ].some((needle) => text.includes(needle))
}
const normalizeContent = (value) => isDemoContent(value) ? { ...value, ...softyyContent } : value

const fallbackBrands = [
  {
    _id: 'brand-softyy',
    name: 'Softyy',
    slug: 'softyy',
    logo: '/brand/softyy-logo.png',
    description: 'Authentic skincare and cosmetics for healthy everyday confidence. Feel The Pure Softness.',
  },
  {
    _id: 'brand-fd',
    name: 'Fresh Daily',
    slug: 'fd-fresh-daily',
    logo: '/brand/softyy-mark-set.png',
    description: 'Fresh daily personal care and home essentials for simple, reliable routines.',
  },
]

const fallbackCategories = [
  {
    _id: 'cat-face-wash',
    name: 'Face Wash',
    slug: 'face-wash',
    image: '/products/softyy/lemon-face-wash.jpg',
    description: 'Gentle cleansing face washes for all skin types.',
  },
  {
    _id: 'cat-serum',
    name: 'Serums',
    slug: 'serums',
    image: '/products/softyy/acne-serum.jpg',
    description: 'Targeted treatment serums for specific skin concerns.',
  },
  {
    _id: 'cat-gel',
    name: 'Soothing Gels',
    slug: 'soothing-gels',
    image: '/products/softyy/milk-soothing-gel.jpg',
    description: 'Calming and moisturizing gels for skin recovery.',
  },
  {
    _id: 'cat-soap',
    name: 'Soaps',
    slug: 'soaps',
    image: '/products/fresh-daily/acne-control-soap.jpg',
    description: 'Effective cleansing bars for face and body.',
  },
  {
    _id: 'cat-air-freshener',
    name: 'Air Fresheners',
    slug: 'air-fresheners',
    image: '/products/fresh-daily/jasmine-air-freshener.jpg',
    description: 'Long-lasting fragrances for home and office.',
  },
]

const fallbackProducts = [
  {
    _id: 'product-lemon-face-wash',
    title: 'Softyy Lemon Face Wash',
    slug: 'softyy-lemon-face-wash',
    desc: 'Oil Control · Acne Control · Brightening Deep Cleansing',
    tag: 'Face Wash',
    image: '/products/softyy/lemon-face-wash.jpg',
    images: ['/products/softyy/lemon-face-wash.jpg'],
    size: 'large',
    price: 350,
    brandId: 'brand-softyy',
    categoryId: 'cat-face-wash',
    features: ['Oil Control', 'Acne Control', 'Brightening Deep Cleansing', 'Paraben & Sulphate Free', 'For All Skin Types'],
    details: 'Softyy Lemon Face Wash deeply cleanses with natural lemon power, controls oil, and brings natural glow. 100ml.',
    inStock: true,
    isNew: false,
  },
  {
    _id: 'product-milk-face-wash',
    title: 'Softyy Milk Expert Face Wash',
    slug: 'softyy-milk-expert-face-wash',
    desc: 'Brightening · Extra Moisturizing · Gentle Cleansing',
    tag: 'Face Wash',
    image: '/products/softyy/milk-face-wash.jpg',
    images: ['/products/softyy/milk-face-wash.jpg'],
    size: 'side',
    price: 350,
    brandId: 'brand-softyy',
    categoryId: 'cat-face-wash',
    features: ['Brightening', 'Extra Moisturizing', 'Gentle Cleansing', 'Paraben & Sulphate Free', 'For All Skin Types'],
    details: 'Softyy Milk Expert Face Wash is a premium daily care formula that cleanses gently without drying. 100ml.',
    inStock: true,
    isNew: false,
  },
  {
    _id: 'product-acne-serum',
    title: 'Softyy Acne Control Serum',
    slug: 'softyy-acne-control-serum',
    desc: '2% Salicylic Acid · 5% Niacinamide · 30ml',
    tag: 'Serum',
    image: '/products/softyy/acne-serum.jpg',
    images: ['/products/softyy/acne-serum.jpg'],
    size: 'third',
    price: 450,
    brandId: 'brand-softyy',
    categoryId: 'cat-serum',
    features: ['2% Salicylic Acid', '5% Niacinamide', 'Acne & Dark Spot Treatment', 'All Skin Types', '30ml'],
    details: 'Softyy Acne Control Face Serum for spotless, bright, and radiant skin. Targets acne and stubborn dark spots.',
    inStock: true,
    isNew: true,
  },
  {
    _id: 'product-papaya-face-wash',
    title: 'Softyy Papaya Face Wash',
    slug: 'softyy-papaya-face-wash',
    desc: 'Glow Boost · Anti-Blemish · Gentle Deep Clean',
    tag: 'Face Wash',
    image: '/products/softyy/papaya-face-wash.jpg',
    images: ['/products/softyy/papaya-face-wash.jpg'],
    size: 'third',
    price: 350,
    brandId: 'brand-softyy',
    categoryId: 'cat-face-wash',
    features: ['Glow Boost', 'Anti-Blemish', 'Gentle Deep Clean', 'Paraben & Sulphate Free', 'For All Skin Types'],
    details: 'Softyy Papaya Face Wash with natural papaya power for bright, clean, and glowing skin. 100ml.',
    inStock: true,
    isNew: false,
  },
  {
    _id: 'product-salicylic-face-wash',
    title: 'Softyy Salicylic Acid Face Wash',
    slug: 'softyy-salicylic-acid-face-wash',
    desc: 'Acne Control · Deep Pore Cleansing · Blackheads',
    tag: 'Face Wash',
    image: '/products/softyy/salicylic-face-wash.jpg',
    images: ['/products/softyy/salicylic-face-wash.jpg'],
    size: 'third',
    price: 350,
    brandId: 'brand-softyy',
    categoryId: 'cat-face-wash',
    features: ['Acne Control', 'Deep Pore Cleansing', 'Blackheads & Whiteheads', 'Paraben & Sulphate Free', 'For All Skin Types'],
    details: 'Softyy Salicylic Acid Face Wash for acne-free fresh skin. Deep cleanses and removes stubborn acne marks.',
    inStock: true,
    isNew: false,
  },
  {
    _id: 'product-milk-soothing-gel',
    title: 'Softyy Milk Soothing Gel',
    slug: 'softyy-milk-soothing-gel',
    desc: 'Deep Moisturizing · Sunburn Recovery · 250gm',
    tag: 'Gel',
    image: '/products/softyy/milk-soothing-gel.jpg',
    images: ['/products/softyy/milk-soothing-gel.jpg'],
    size: 'side',
    price: 480,
    brandId: 'brand-softyy',
    categoryId: 'cat-gel',
    features: ['99% Pure Formula', 'Deep Moisturizing', 'Sunburn Recovery', 'For Sensitive Skin', '250gm'],
    details: 'Softyy Milk Soothing Gel with 99% pure formula for deep moisturizing and sunburn recovery. 250gm jar.',
    inStock: true,
    isNew: false,
  },
  {
    _id: 'product-fd-acne-soap',
    title: 'Fresh Daily Acne Control Soap',
    slug: 'fresh-daily-acne-control-soap',
    desc: 'Oil Control · Prevents Acne · Unclogs Pores',
    tag: 'Soap',
    image: '/products/fresh-daily/acne-control-soap.jpg',
    images: ['/products/fresh-daily/acne-control-soap.jpg'],
    size: 'third',
    price: 120,
    brandId: 'brand-fd',
    categoryId: 'cat-soap',
    features: ['Oil Control', 'Prevents Acne', 'Unclogs Pores', 'Reduces Redness', 'Face & Body', '80gm'],
    details: 'Fresh Daily Acne Control Soap for daily freshness and spotless skin. Anti-acne & oil balancing bar.',
    inStock: true,
    isNew: false,
  },
  {
    _id: 'product-fd-kojic-soap',
    title: 'Fresh Daily Kojic Acid Soap',
    slug: 'fresh-daily-kojic-acid-soap',
    desc: 'Double Brightening · Face & Body · 80gm',
    tag: 'Soap',
    image: '/products/fresh-daily/kojic-acid-soap.jpg',
    images: ['/products/fresh-daily/kojic-acid-soap.jpg'],
    size: 'third',
    price: 150,
    brandId: 'brand-fd',
    categoryId: 'cat-soap',
    features: ['Brightens Skin Tone', 'Deeply Moisturizes', 'Helps Prevent Acne', 'Reduces Signs of Aging', '80gm'],
    details: 'Fresh Daily Kojic Acid Soap - The Brightening Ritual. Double brightening facial bar for face and body.',
    inStock: true,
    isNew: true,
  },
  {
    _id: 'product-fd-jasmine',
    title: 'Fresh Daily Jasmine Bliss Air Freshener',
    slug: 'fresh-daily-jasmine-bliss',
    desc: 'Natural Jasmine Fragrance · Long Lasting · 300ml',
    tag: 'Air Freshener',
    image: '/products/fresh-daily/jasmine-air-freshener.jpg',
    images: ['/products/fresh-daily/jasmine-air-freshener.jpg'],
    size: 'third',
    price: 250,
    brandId: 'brand-fd',
    categoryId: 'cat-air-freshener',
    features: ['Natural Jasmine Scent', 'Long Lasting', 'Quick Odor Elimination', 'Home & Office', '300ml'],
    details: 'Fresh Daily Jasmine Bliss Air Freshener with the enchanting scent of jasmine flowers.',
    inStock: true,
    isNew: false,
  },
]

const normalizeProducts = (data) => isDemoContent(data) ? fallbackProducts : data
const normalizeBrands = (data) => isDemoContent(data) ? fallbackBrands : data
const normalizeCategories = (data) => isDemoContent(data) ? fallbackCategories : data

export function DataProvider({ children }) {
  const [content, setContent] = useState(null)
  const [products, setProducts] = useState(fallbackProducts)
  const [brands, setBrands] = useState(fallbackBrands)
  const [categories, setCategories] = useState(fallbackCategories)
  const [loading, setLoading] = useState(true)

  const fetchContent = useCallback(async () => {
    try {
      const res = await api.get('/content')
      setContent(normalizeContent(res.data))
    } catch (err) {
      console.error('Failed to fetch content:', err)
    }
  }, [])

  const fetchProducts = useCallback(async (params = {}) => {
    try {
      const res = await api.get('/products', { params })
      const data = res.data.length > 0 ? normalizeProducts(res.data) : fallbackProducts
      setProducts(data)
      return data
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setProducts(fallbackProducts)
      return fallbackProducts
    }
  }, [])

  const fetchBrands = useCallback(async () => {
    try {
      const res = await api.get('/brands')
      setBrands(res.data.length > 0 ? normalizeBrands(res.data) : fallbackBrands)
    } catch (err) {
      console.error('Failed to fetch brands:', err)
      setBrands(fallbackBrands)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get('/categories')
      setCategories(res.data.length > 0 ? normalizeCategories(res.data) : fallbackCategories)
    } catch (err) {
      console.error('Failed to fetch categories:', err)
      setCategories(fallbackCategories)
    }
  }, [])

  useEffect(() => {
    Promise.all([fetchContent(), fetchProducts(), fetchBrands(), fetchCategories()])
      .finally(() => setLoading(false))
  }, [fetchContent, fetchProducts, fetchBrands, fetchCategories])

  const updateContent = async (data) => {
    const res = await api.put('/content', data)
    setContent(res.data)
    return res.data
  }

  const createProduct = async (data) => {
    const res = await api.post('/products', data)
    setProducts(prev => [...prev, res.data])
    return res.data
  }

  const updateProduct = async (id, data) => {
    const res = await api.put(`/products/${id}`, data)
    setProducts(prev => prev.map(p => p._id === id ? res.data : p))
    return res.data
  }

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`)
    setProducts(prev => prev.filter(p => p._id !== id))
  }

  const createBrand = async (data) => {
    const res = await api.post('/brands', data)
    setBrands(prev => [...prev, res.data])
    return res.data
  }

  const updateBrand = async (id, data) => {
    const res = await api.put(`/brands/${id}`, data)
    setBrands(prev => prev.map(b => b._id === id ? res.data : b))
    return res.data
  }

  const deleteBrand = async (id) => {
    await api.delete(`/brands/${id}`)
    setBrands(prev => prev.filter(b => b._id !== id))
  }

  const createCategory = async (data) => {
    const res = await api.post('/categories', data)
    setCategories(prev => [...prev, res.data])
    return res.data
  }

  const updateCategory = async (id, data) => {
    const res = await api.put(`/categories/${id}`, data)
    setCategories(prev => prev.map(c => c._id === id ? res.data : c))
    return res.data
  }

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`)
    setCategories(prev => prev.filter(c => c._id !== id))
  }

  return (
    <DataContext.Provider value={{
      content, products, brands, categories, loading,
      fetchContent, fetchProducts, fetchBrands, fetchCategories,
      updateContent,
      createProduct, updateProduct, deleteProduct,
      createBrand, updateBrand, deleteBrand,
      createCategory, updateCategory, deleteCategory
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
