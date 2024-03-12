import { useState, useEffect, useContext } from 'react'
import {decodeToken} from 'react-jwt';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';
import { SelectedAccountContext } from '../App.jsx';




export function AccountsForm(){

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const { arrayAccounts, setArrayAccounts } = useContext(SelectedAccountContext);

    useEffect(()=>{
        setArrayAccounts(arrayAccounts)
    }, [])


    const showSwalSuccess = () => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: '¡Cuenta creada!',
        icon: "success",
        confirmButtonColor: '#F4A615'
      }).then(()=>{
          window.location.href = '/home';
      });
    };

    const showSwalError = () => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Hubo un error al crear la cuenta.',
        icon: "error",
        confirmButtonColor: '#F4A615'
      })
    };



    const handleSubmit = async (event)=>{
        event.preventDefault();
  
        setLoading(true);
        
        const formData = {
            accountName: name
        }

        const token = localStorage.getItem('token');
        const payload = decodeToken(token);
        const userId = payload._id;
  
        try {
            const response = await fetch(`http://localhost:8080/api/accounts/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        
            if (response.ok) {
                setTimeout(() => {
                  showSwalSuccess();
                  console.log('Cuenta creada');
                  setLoading(false);
                }, 1000);
                
            } else {
              setTimeout(() => {
                showSwalError()
                console.error('Error al crear la cuenta');
                setLoading(false);
              }, 1000);
                
             }
          } catch (error) {
             console.error('Error de red:', error);
        }
      }



    return <>
        <div className='bg-black h-lvh w-full flex align-middle'>
          <div className='bg-[#EAF2EF] h-5/6 w-[95%] md:w-3/6 m-auto rounded-lg'>
            <form action="POST" className='w-full h-full '>

                <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full  '>
                  <Link className='hover:cursor-pointer' to={'/accounts'}> 
                    <h5 className='text-[0.8rem]'><i className="fa-solid fa-arrow-left"></i> Volver</h5>
                  </Link>
                  <h2 className='text-[1.5rem]'>Formulario de Cuenta</h2>
                  
                </div>                
                
                <div className='flex flex-col p-2 md:p-5 justify-start gap-4 h-4/6 w-full '>
                        <label htmlFor="" >Nombre de Cuenta</label>
                        <div className='shadow-sm'>
                            <input className='w-full rounded-sm p-1 shadow-sm bg-[#f5f8f7]' type="text" onChange={(e) => setName(e.target.value)}/>   
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
                            <input onClick={handleSubmit} type="submit" value='Crear Cuenta' className='text center text-[#071013] w-full rounded-sm p-1 bg-[#F4A615] hover:cursor-pointer hover:scale-105 duration-75' />

                      }
                    </div>
                </div>                    
                

            </form>
          </div>
        </div>
    </>
} 