import React from 'react'
import { Search } from 'lucide-react'
export default function SearchBar() {
  return (
     <div className='flex items-center gap-2 transitions  focus-within:border-2 focus-within:border-black bg-gray-200 px-4 py-2 rounded-sm'>
          <input type="text" placeholder='What are you looking for?' className='focus:outline-none' />
          <Search className='cursor-pointer' />
          </div>
  )
}
