import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home.jsx'
import { Login } from './components/Login.jsx'
import { SpentsForm } from './components/SpentsForm.jsx'
import { IncomesForm } from './components/IncomesForm.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/spents-form' element={<SpentsForm/>}></Route>
          <Route path='/incomes-form' element={<IncomesForm/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
