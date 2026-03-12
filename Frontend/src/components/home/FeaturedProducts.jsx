import React from 'react'
import ProductCard from '../product/ProductCard'

function FeaturedProducts() {
  return (
    <section className='mt-5 max-w-7xl md:px-4 px-2  mx-auto'>
        <h2 className='text-2xl my-4 font-bold font-sans'>Explore Our Products</h2>
<ProductCard/>
    </section>
  )
}

export default FeaturedProducts