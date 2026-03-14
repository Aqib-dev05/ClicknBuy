import React from "react";
import {ToastContainer} from "react-toastify"
import Navbar from "./Components/layouts/Navbar";
import NotFound from "./Components/layouts/NotFound";
import Footer from "./Components/layouts/Footer";
import SaleBanner from "./Components/home/SaleBanner"
import OfferBanner from "./Components/home/OfferBanner"
import HeroSection from "./Components/home/HeroSection";
import FeaturedProducts from "./Components/home/FeaturedProducts";
import ProductDetails from "./Components/product/ProductDetails";
import LoginForm from "./Components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm"


function App() {
  return (
    <>
    <ToastContainer/>
      <Navbar />
    <FeaturedProducts/>
    </>
  )
}

export default App