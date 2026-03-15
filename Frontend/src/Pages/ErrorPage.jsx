import React from 'react'
import NotFound from "../Components/layouts/NotFound"
import Footer from "../Components/layouts/Footer"
function ErrorPage() {
  return (
    <div className='min-h-screen'>
      <NotFound/>
      <Footer/>
    </div>
  )
}

export default ErrorPage