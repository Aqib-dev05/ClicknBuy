import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


export default function SearchBar() {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(query.trim());
    if (!query) {
      toast.info("Please enter a search query")
      return;
    };
    navigate(`/products?q=${query}`);
    setQuery("");
  }


  return (
    <form onSubmit={handleSearch} className='flex w-fit items-center gap-2 transitions  focus-within:border-2 focus-within:border-black bg-gray-200 sm:px-4 px-2 py-2 rounded-sm'>

      <input type="text" placeholder='Search Products 🤷‍♂️' className='focus:outline-none w-fit max-sm:w-35 ' value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type='submit'>
        <Search className='cursor-pointer' />

      </button>
    </form>
  )
}
