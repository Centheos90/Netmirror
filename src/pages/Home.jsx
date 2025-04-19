import React, { useContext } from 'react'
import { AppContext, useGlobalContext } from './Context'
import Movies from './Movies'
import Search from './Search'


function Home() {
  // const name=useContext(AppContext)
  // const name=useGlobalContext()
  const { isLoading } = useGlobalContext();
  return (
    <>
      <div className="w-full flex justify-center px-4 mt-6">
        <div className="max-w-5xl w-full">
          <Search />
          {isLoading ? (
            <div className="loading text-center py-4">Loading...</div>
          ) : (
            <Movies />
          )}
        </div>
      </div>
    </>
  )
}

export default Home