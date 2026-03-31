import React from 'react'
import FeaturedProducts from "../Components/home/FeaturedProducts"
import HeroSection from "../Components/home/HeroSection"
import OfferBanner from "../Components/home/OfferBanner"
import SaleBanner from "../Components/home/SaleBanner"
import Features from '../Components/layouts/Features'
import SubscribeToNewsLetter from '../Components/layouts/SubscribeToNewsLetter'

function HomePage() {
  return (
    <div className='min-h-screen flex gap-10 flex-col overflow-x-hidden'>
      <HeroSection/>
      <SaleBanner/>
      <FeaturedProducts/>
      <OfferBanner/>
      <Features/>
      <SubscribeToNewsLetter/>
    </div>
  )
}

export default HomePage