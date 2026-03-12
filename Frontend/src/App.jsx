import React from "react";
import Navbar from "./Components/layouts/Navbar";
import NotFound from "./Components/layouts/NotFound";
import Footer from "./Components/layouts/Footer";
import SaleBanner from "./Components/home/SaleBanner"
import OfferBanner from "./Components/home/OfferBanner"
import HeroSection from "./Components/home/HeroSection";
import FeaturedProducts from "./Components/home/FeaturedProducts";


function App() {
  return (
    <>
      <Navbar />
      <FeaturedProducts/>
    </>
  )
}

export default App