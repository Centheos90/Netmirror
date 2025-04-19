import React from 'react'
import { useGlobalContext } from './Context'

function Search() {
  const {query,setQuery,isError}=useGlobalContext()

  return (
    <section className="search-section flex flex-col items-center p-6">

  <div className="flex flex-col items-center w-full max-w-2xl px-4">
      <h2 className='text-center mb-4 text-black text-xl'>Search your favourite movie</h2>
      <form action="#" onSubmit={(e)=>{e.preventDefault()}}>
        <div>
        <input 
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        </div>
      </form>
      <div className='card-error'>
        <p>{isError.show && isError.msg}</p>
      </div>
      </div>
    </section>
  )
}

export default Search