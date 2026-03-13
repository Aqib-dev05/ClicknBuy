import React from 'react'
import ProductCard from './ProductCard'
function ProductGrid() {
  return (
    <section className='mx-auto  flex flex-wrap justify-center items-center gap-6'>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>

    </section>
  )
}

export default ProductGrid