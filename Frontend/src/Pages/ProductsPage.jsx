import React from 'react'
import ProductGrid from "../Components/product/ProductGrid"

function ProductsPage() {
  return (
    <div>
      <h1 className='text-center my-6 text-3xl font-bold'><span className='text-red-600   ' >All</span> Products </h1>
   <ProductGrid/>
   <br /><br /><br /><br />
    </div>
  )
}

export default ProductsPage