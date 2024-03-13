import { createContext, useContext, useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './components/Home.jsx'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx';
import { SpentsForm } from './components/SpentsForm.jsx'
import { IncomesForm } from './components/IncomesForm.jsx'
import {TransfersForm} from './components/TransfersForm.jsx'
import { AccountsList } from './components/AccountsList.jsx';
import { AccountsForm } from './components/AccountsForm.jsx';

export const SelectedAccountContext = createContext();


export function App() {

  const [selectedAccount, setSelectedAccount] = useState('');
  const [ arrayAccounts, setArrayAccounts ] = useState([]);
  

  // useEffect(() => {
  //     const pathname = window.location.pathname;
  //     if (pathname === '/' || pathname === '') {
  //       return <Navigate to="/login" />;
  //     }
  // }, []);

  return (
    <SelectedAccountContext.Provider value={{selectedAccount, setSelectedAccount, arrayAccounts, setArrayAccounts}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="" element={<Navigate to="/login" />} />
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/register' element={<Register/>}></Route>
              <Route path='/home' element={<Home/>}></Route>
              <Route path='/spents-form' element={<SpentsForm/>}></Route>
              <Route path='/incomes-form' element={<IncomesForm/>}></Route>
              <Route path='/transfers-form' element={<TransfersForm/>}></Route>
              <Route path='/accounts' element={<AccountsList/>}></Route>
              <Route path='/accounts-form' element={<AccountsForm/>}></Route>

            </Routes>
          </BrowserRouter>

    </SelectedAccountContext.Provider>

  )
}

export default App
