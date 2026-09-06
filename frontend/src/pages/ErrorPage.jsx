import React from 'react'
import NotFound from "../components/layouts/NotFound"
import Footer from "../components/layouts/Footer"
function ErrorPage() {
  return (
    <div className='min-h-screen'>
      <NotFound/>
      <Footer/>
    </div>
  )
}

export default ErrorPage