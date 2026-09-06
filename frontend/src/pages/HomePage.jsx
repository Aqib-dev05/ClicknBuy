
import FeaturedProducts from "../components/home/FeaturedProducts"
import HeroSection from "../components/home/HeroSection"
import OfferBanner from "../components/home/OfferBanner"
import SaleBanner from "../components/home/SaleBanner"
import Features from '../components/layouts/Features'
import SubscribeToNewsLetter from '../components/layouts/SubscribeToNewsLetter'


function HomePage() {


  return (
    <div className='min-h-screen flex gap-10 flex-col overflow-x-hidden'>
      <HeroSection />
      <SaleBanner />
      <FeaturedProducts />
      <OfferBanner />
      <Features />
      <SubscribeToNewsLetter />
    </div>
  )
}

export default HomePage