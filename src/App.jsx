import React from 'react'
import Home from './pages/Home'
import SingleMovie from './pages/SingleMovie'
import Error from './pages/Error'
import {BrowserRouter, Route, Routes} from 'react-router'
import { AppProvider } from './pages/Context'
function App() {
  

  return (
    <>
      <AppProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='movie/:id' element={<SingleMovie/>}/>
            <Route path='*' element={<Error/>}/>
          </Routes>
      </BrowserRouter>
      </AppProvider>
    </>
  )
}

export default App
