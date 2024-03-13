import { useState, useEffect, useContext } from 'react'
import {decodeToken} from 'react-jwt';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';


import { SelectedAccountContext } from '../App.jsx';



export function TransfersForm(){
    const [selectedDate, setSelectedDate] = useState('');
    const [account, setAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('');
    const [accounts, setAccounts] = useState([]);
    const { arrayAccounts } = useContext(SelectedAccountContext);


    const showSwalSuccess = () => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: '¡Transferencia con éxito!',
        icon: "success",
        confirmButtonColor: '#F4A615'
      }).then(()=>{
          window.location.href = '/home';
      });
    };

    const showSwalError = () => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Hubo un error al registrar la transferencia.',
        icon: "error",
        confirmButtonColor: '#F4A615'
      })
    };

    useEffect(()=>{
      const token = localStorage.getItem('token');
      const payload = decodeToken(token);
      const userId = payload._id;
      setUser(userId);
    },[])

    const handleSubmit = async (event)=>{
      event.preventDefault();

      setLoading(true);

      const fromFilter = arrayAccounts.filter(i => i._id == account) 
      const fromName = fromFilter.length > 0 ? fromFilter[0].accountName : '';
      const toFilter = arrayAccounts.filter(i => i._id == toAccount) 
      const toName = toFilter.length > 0 ? toFilter[0].accountName : '';
      
      const formData = {
        userId:user,
        accountId: account,
        fromName,
        to: toAccount,
        toName,
        date: selectedDate,
        amount:amount
      }

      try {
          const token = localStorage.getItem('token');
          console.log(formData)

          const response = await fetch('https://gestor-gastos-backend.onrender.com/api/transfers', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });
      
          if (response.ok) {
              setTimeout(() => {
                showSwalSuccess();
                console.log('Transferencia registrada.');
                setLoading(false);
              }, 1000);
              
          } else {
            setTimeout(() => {
              showSwalError()
              console.error('Error al registrar la transferencia.');
              setLoading(false);
            }, 1000);
              
           }
        } catch (error) {
           console.error('Error de red:', error);
      }
    }

    useEffect(()=>{
      if(arrayAccounts !=[]){
        setAccounts(arrayAccounts)}
      
    }, [arrayAccounts])



    return <>
        <div className='bg-black h-lvh w-full flex align-middle'>
          <div className='bg-[#EAF2EF] h-5/6 w-[95%] md:w-3/6 m-auto rounded-lg'>
            <form action="POST" className='w-full h-full '>

                <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full  '>
                  <Link className='hover:cursor-pointer' to={'/home'}> 
                    <h5 className='text-[0.8rem]'><i className="fa-solid fa-arrow-left"></i> Volver</h5>
                  </Link>
                  <h2 className='text-[1.5rem]'>Formulario de transferencias</h2>
                  
                </div>
                
                <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full b'>
                      <div className='w-full '>
                        <label htmlFor="">Fecha</label>
                      </div>
                      <div className=' shadow-sm'>
                        <input  
                              type="date" 
                              value={selectedDate} 
                              onChange={(e) => {
                                setSelectedDate(e.target.value)
                                console.log(selectedDate)
                              }} 
                              className='w-full rounded-sm p-1 shadow-sm bg-[#f5f8f7]'
                          />
                      </div>
                      

                </div>

                <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full '>
                        <label htmlFor="">Cuenta origen</label>
                        <div className=' shadow-sm' >
                            <select className='w-full rounded-sm p-1 shadow-sm bg-[#f5f8f7]' defaultValue={''} onChange={(e) => setAccount(e.target.value)}  name="" id="" >
                                <option value="" disabled>Cuentas</option>
                                {arrayAccounts.map((account, index) => (
                                <option key={index} value={account._id}>{account.accountName}</option>
                            ))}
                            
                            </select>     
                        </div>  
             
                </div>

                <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full '>
                        <label htmlFor="">Cuenta Destino</label>
                        <div className=' shadow-sm' >
                            <select className='w-full rounded-sm p-1 shadow-sm bg-[#f5f8f7]' defaultValue={''} onChange={(e) => setToAccount(e.target.value)}  name="" id="" >
                                <option value="" disabled>Cuentas</option>
                                {arrayAccounts.map((account, index) => (
                                <option key={index} value={account._id}>{account.accountName}</option>
                            ))}
                            
                            </select>     
                        </div>  
             
                </div>
                

                <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full '>
                        <label htmlFor="">Monto</label>
                        <div className='shadow-sm' >
                            <input className='w-full rounded-sm p-1 shadow-sm bg-[#f5f8f7]' type="number" onChange={(e) => setAmount(e.target.value)}/>
                        </div>

                </div>


                <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full '>
                    <div className='shadow-sm rounded-md'>
                      {loading ? 
                      <div className='flex text-center justify-center' > 
                        
                            <ThreeDots
                            visible={true}
                            height="80"
                            width="80"
                            color="#F4A615"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            />
                      </div>       :
                            <input onClick={handleSubmit} type="submit" value='Agregar Transferencia' className='text center w-full rounded-sm p-1 bg-[#F4A615] text-[#071013] hover:cursor-pointer hover:scale-105 duration-75' />

                      }
                    </div>
                </div>                    
                

            </form>
          </div>
        </div>
    </>
} 