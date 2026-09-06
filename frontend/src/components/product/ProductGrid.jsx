import React from 'react'
import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom'
import Button from '../layouts/Button'
import { motion as Motion } from 'framer-motion'


function ProductGrid({product }) {

    const navigate = useNavigate();

  

  return (
    <Motion.section
      className='mx-auto  flex flex-wrap justify-center items-center gap-6'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5 }}
    >
      {product && Array.isArray(product.products) && product.products.map((item) => (
        <ProductCard key={item._id} product={item} payload={item} />

      ))}
      {product && product.products && product.products.length === 0 && (
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className='text-center text-xl font-semibold w-full'>No Product Found!!!</p>
          <br /><br />
          <Button text={"Go Back"} className='mt-8 ml-2' onClick={() => navigate(-1)} />
        </Motion.div>

      )}
    </Motion.section>
  )
}

export default ProductGrid