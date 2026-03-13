import React from 'react'
import ProductGrid from '../product/ProductGrid'

function FeaturedProducts() {
  return (
    <section className='mt-5  md:px-4 px-4 lg:px-10 2xl:px-16  mx-auto'>
        <h2 className='text-2xl my-4 font-bold font-sans'>Explore Our Products</h2>
        <ProductGrid/>
    </section>
  )
}

export default FeaturedProducts