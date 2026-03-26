import React from 'react'
import SubCategory from '../Components/category/SubCategory'

function SubCategoryPage() {
  return (
    <div className='bg-gray-100'>
      <h1 className='text-center pt-8 pb-4 text-3xl font-bold'><span className='text-red-600   ' >All</span> Sub<span className='text-red-600'>-</span>Categories </h1>
      <SubCategory />
    </div>
  )
}

export default SubCategoryPage