import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export function Sidebar({user}){
    const [open, setOpen] = useState(false)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(()=>{
        if(user && user.user && user.user.first_name){
            console.log(user)
            const name = user.user.first_name
            const lastName = user.user.last_name;
            setFirstName(name);
            setLastName(lastName)
        }

    }, [user])

    return(
    <div className='b py-3 fixed top-0 left-0 right-0 shadow-md'>
      <button className='ml-4 ' onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="w-6 h-6 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`} onClick={() => setOpen(false)}></div>

      <div className={`${open ? "w-80" : "w-0"} bg-cyan-600 min-h-screen fixed top-0 left-0 transition-w duration-300`}>
        <div className={`${!open && "hidden"} pt-3`}>
          <button className='ml-4 text-white mb-14' onClick={() => setOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <section className='flex flex-col px-4 fixed left-0' >
            <div className='text-start text-white text-xl py-3 mb-2 border-b-[1px] font-bold	'>{firstName} {lastName}</div>
            <div className='text-start text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'><Link to={'/accounts'}>Cuentas</Link></div>
            <div className='text-start text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Transferencias</div>
          </section>

          <section className='flex flex-col px-4 fixed left-0 bottom-0' >
            <div className='text-start text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Cerrar sesión</div>
          </section>

        </div>
      </div>
    </div>
  )
}