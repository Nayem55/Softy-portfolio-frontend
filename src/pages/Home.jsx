import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Products from '../components/Products'
import BrandsSection from '../components/BrandsSection'
import Manifesto from '../components/Manifesto'
import Story from '../components/Story'
import Testimonial from '../components/Testimonial'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Grain from '../components/Grain'

export default function Home() {
  return (
    <>
      <Grain />
      <Navbar />
      <main id="top">
        <Hero />
        <Marquee />
        <Products limit={6} showLink={true} />
        <BrandsSection />
        <Manifesto />
        <Story />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
