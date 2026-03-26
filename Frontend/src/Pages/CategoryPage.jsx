import React from 'react'
import Category from '../Components/category/Category'

function CategoryPage() {
  return (
    <div>
      <h1 className='text-center my-6 text-3xl font-bold'><span className='text-red-600   ' >All</span> Categories </h1>

      <Category />

    </div>
  )
}


export default CategoryPage