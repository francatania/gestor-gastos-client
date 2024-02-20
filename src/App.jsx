import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home.jsx'
import { Login } from './components/Login.jsx'
import { SpentsForm } from './components/SpentsForm.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/spents-form' element={<SpentsForm/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
