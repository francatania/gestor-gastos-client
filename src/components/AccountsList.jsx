import { useState, useEffect, useContext } from "react"
import {decodeToken} from 'react-jwt';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';
import { SelectedAccountContext } from '../App.jsx';


export function AccountsList(){

    const [loading, setLoading] = useState(false);
    const { arrayAccounts, setArrayAccounts } = useContext(SelectedAccountContext);
    

  

    return <>
    <div className='bg-black h-lvh w-full flex align-middle'>
          <div className='bg-[#EAF2EF] h-5/6 w-[95%] md:w-3/6 m-auto rounded-lg'>
            <form action="POST" className='w-full h-full '>

                <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full  '>
                  <Link className='hover:cursor-pointer' to={'/home'}> 
                    <h5 className='text-[0.8rem]'><i className="fa-solid fa-arrow-left"></i> Volver</h5>
                  </Link>
                  <div className="flex justify-between">
                    <h2 className='text-[1.5rem]'>Mis Cuentas</h2>
                    <Link to={'/accounts-form'}>                            
                      <button class="bg-[#F4A615] text-white font-bold py-2 px-4 rounded flex items-center hover:bg-[#dba033] duration-75">
                        <i class="fa-solid fa-plus"></i>      
                      </button>
                    </Link>

                  </div>
                  
                  
                </div>
                
                <div className="h-4/6 overflow-scroll overflow-x-hidden">
                    {arrayAccounts.map(account => (
                        <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full b' key={account.id}>
                            <div className='w-full shadow-md h-full flex justify-center align-middle items-center'>
                            <h3 htmlFor="" className="text-[1.5rem]">{account.accountName}</h3>
                            </div>        
                        </div>
                        ))}

                </div>                    
                

            </form>
          </div>
        </div>
    </>
}