import React from 'react'
import Logo from "../../assets/logo.webp"
import { useState } from 'react'
import {  Heart, ShoppingCart, House, User, ShoppingBasket } from "lucide-react"
import { useEffect } from 'react';
import SearchBar from "../layouts/SearchBar"

export default function Navbar() {

  const [isMobile, setIsMobile] = useState(false);
  const [enterHeart, setEnterHeart] = useState(false);

   function handleMouseEnter() {
    setEnterHeart(true);
  }
  
  function handleMouseLeave() {
    setEnterHeart(false);
  }

  useEffect(() => {
    function changeMobile() {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    changeMobile();
    window.addEventListener("resize", changeMobile);
  }, [])



  return (
    <nav className='flex justify-between bg-gray-50 items-center px-1 sticky z-[100] top-0 left-0 w-full md:px-8 lg:px-4 xl:px-16 border-b-2 border-gray-300'>
      <div className='flex items-center size-[50]'>
        <img src={Logo} alt="Logo" className='w-[80px] h-[80px] max-sm:w-[60px] max-sm:h-[60px] object-contain' />
      </div>

      {!isMobile && (
        <ul className='flex gap-8 mx-auto text-lg font-medium'>
          <li className='hover:border-b-2 transitions hover:border-black cursor-pointer'>Home</li>
          <li className='hover:border-b-2 transitions hover:border-black cursor-pointer'>Products</li>
          <li className='hover:border-b-2 transitions hover:border-black cursor-pointer'>Sign Up</li>
        </ul>
      )}

      <div className='flex items-center gap-4 sm:mr-3 '>
       <SearchBar/>
        <div className='flex gap-3'>
          {(!isMobile) && (
            <>
              <Heart className='cursor-pointer' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} fill={enterHeart ? "red" : "none"} stroke={enterHeart ? "red" : "black"} />
              <ShoppingCart className='cursor-pointer'  />
            </>
          )}

        </div>
      </div>

      {isMobile && (
        <div className='fixed z-[100] bottom-0 left-0 w-full bg-white border-t-2 border-gray-300'>
          <ul className='flex justify-around items-center py-4 text-lg font-medium'>
            <li className='cursor-pointer px-1'><House /></li>
            <li className='cursor-pointer px-1'><ShoppingBasket /></li>
            <li className='cursor-pointer px-1'><ShoppingCart /></li>
            <li className='cursor-pointer px-1'><User /></li>

          </ul>
        </div>
      )}
    </nav>
  )
}