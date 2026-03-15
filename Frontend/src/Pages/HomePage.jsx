import React from 'react'
import FeaturedProducts from "../Components/home/FeaturedProducts"
import HeroSection from "../Components/home/HeroSection"
import OfferBanner from "../Components/home/OfferBanner"
import SaleBanner from "../Components/home/SaleBanner"


function HomePage() {
  return (
    <div className='min-h-screen flex gap-10 flex-col'>
      <HeroSection/>
      <SaleBanner/>
      <FeaturedProducts/>
      <OfferBanner/>
    </div>
  )
}

export default HomePage