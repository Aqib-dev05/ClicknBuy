import React from 'react'
import RegisterForm from "../Components/auth/RegisterForm"

function RegisterPage() {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className='text-center text-3xl font-bold mb-4'><span className='text-red-600'>Sign Up</span> Page</h2>
        <RegisterForm/>
      </div>
    </div>
  )
}


export default RegisterPage