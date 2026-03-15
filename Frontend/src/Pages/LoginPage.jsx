import React from 'react'
import LoginForm from '../Components/auth/LoginForm'

function LoginPage() {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className='text-center text-3xl font-bold mb-4'><span className='text-red-600'>Login</span> Page</h2>
        <LoginForm/>
      </div>
    </div>
  )
}

export default LoginPage