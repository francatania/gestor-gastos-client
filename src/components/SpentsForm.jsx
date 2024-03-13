import { useState, useEffect, useContext } from 'react'
import {decodeToken} from 'react-jwt';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';
import { SelectedAccountContext } from '../App.jsx';



export function SpentsForm(){
    const [categories, setCategories] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [account, setAccount] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const { selectedAccount } = useContext(SelectedAccountContext);


    const showSwalSuccess = () => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: '¡Gasto agreado!',
        icon: "success",
        confirmButtonColor: '#F4A615'
      }).then(()=>{
          window.location.href = '/home';
      });
    };

    const showSwalError = () => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Hubo un error al registrar el gasto.',
        text: 'Recuerde que se debe completar todos los campos.',
        icon: "error",
        confirmButtonColor: '#F4A615'
      })
    };

    useEffect(()=>{
      console.log("ABER DESDE SPENTFORM", selectedAccount)
    }, [selectedAccount])

    useEffect(()=>{
        const fetchData = async () => {
            try {

              const response = await fetch(`https://gestor-gastos-backend.onrender.com/api/spents-categories`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                },
              });
        
              if (!response.ok) {
                throw new Error('Hubo un error al hacer el fetch');
              }
        
              const result = await response.json();
        
              setCategories(result.categories);
            } catch (error) {
              console.error('Error al obtener los datos', error);
            }
          };
        
          fetchData();
    }, [])

    const handleSubmit = async (event)=>{
      event.preventDefault();

      setLoading(true);
      
      const formData = {
        accountId: account,
        category: category,
        description: description,
        date: selectedDate,
        amount: amount
      }

      try {
          const response = await fetch('https://gestor-gastos-backend.onrender.com/api/spents', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });
      
          if (response.ok) {
              setTimeout(() => {
                showSwalSuccess();
                console.log('Gasto agregado exitosamente');
                setLoading(false);
              }, 1000);
              
          } else {
            setTimeout(() => {
              showSwalError()
              console.error('Error al agregar el gasto');
              setLoading(false);
            }, 1000);
              
           }
        } catch (error) {
           console.error('Error de red:', error);
      }
    }

    useEffect(()=>{
      const token = localStorage.getItem('token');
      const payload = decodeToken(token);
      if(selectedAccount == ''){
        setAccount(payload.accounts[0]);
      }else{
        setAccount(selectedAccount);
      }
      
    }, [selectedAccount])




    return <>
        <div className='bg-black h-lvh w-full flex align-middle'>
          <div className='bg-[#EAF2EF] h-5/6 w-[95%] md:w-3/6 m-auto rounded-lg'>
            <form action="POST" className='w-full h-full '>

                <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full  '>
                  <Link className='hover:cursor-pointer' to={'/home'}> 
                    <h5 className='text-[0.8rem]'><i className="fa-solid fa-arrow-left"></i> Volver</h5>
                  </Link>
                  <h2 className='text-[1.5rem]'>Formulario de gasto</h2>
                  
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
                        <label htmlFor="">Categoría</label>
                        <div className=' shadow-sm' >
                            <select className='w-full rounded-sm p-1 shadow-sm bg-[#f5f8f7]' value={category} onChange={(e) => setCategory(e.target.value)}  name="" id="" >
                                <option value="" disabled>Categorias</option>
                                {categories.map((category, index) => (
                                <option key={index} value={category.category}>{category.category}</option>
                            ))}
                            
                            </select>     
                        </div>  
             
                </div>
                
                <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full '>
                        <label htmlFor="" >Descripción</label>
                        <div className='shadow-sm'>
                            <input className='w-full rounded-sm p-1 shadow-sm bg-[#f5f8f7]' type="text" onChange={(e) => setDescription(e.target.value)}/>   
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
                            <input onClick={handleSubmit} type="submit" value='Agregar Gasto' className='text center text-[#071013] w-full rounded-sm p-1 bg-[#F4A615]  hover:cursor-pointer hover:scale-105 duration-75' />

                      }
                    </div>
                </div>                    
                

            </form>
          </div>
        </div>
    </>
} 