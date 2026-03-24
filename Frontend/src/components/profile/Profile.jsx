import React from "react"

function Profile() {
  return (
    <section className='w-full min-h-screen flex flex-col md:flex-row'>
      {/* sidebar */}
      <div className='w-full md:w-[30%] lg:w-[25%] bg-red-400 border-b md:border-b-0 md:border-r border-gray-200 p-4'>
        <nav className='flex flex-col gap-4'>
      
        </nav>
      </div>

      {/* main */}
      <div className='w-full md:w-[70%] lg:w-[75%] bg-blue-400 p-4 md:p-8'>
        
      </div>
    </section>
  )
}

export default Profile