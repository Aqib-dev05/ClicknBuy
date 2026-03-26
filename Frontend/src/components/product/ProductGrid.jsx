import React from 'react'
import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom'
import Button from '../layouts/Button'


function ProductGrid({product }) {

    const navigate = useNavigate();

  

  return (
    <section className='mx-auto  flex flex-wrap justify-center items-center gap-6'>
      {product && Array.isArray(product.products) && product.products.map((item) => (
        <ProductCard key={item._id} product={item} payload={item} />

      ))}
      {product && product.products && product.products.length === 0 && (
        <>
          <p className='text-center text-xl font-semibold w-full'>No Product Found!!!</p>
          <br /><br />
          <Button text={"Go Back"} className='mt-8 ml-2' onClick={() => navigate(-1)} />
        </>

      )}
    </section>
  )
}

export default ProductGrid