import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ThreeDots } from 'react-loader-spinner'
import { Link } from 'react-router-dom';


export function Register(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const showSwalSuccess = () => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          title: '¡Registro exitoso!',
          text: 'Por favor, inicie sesión',
          icon: "success",
          confirmButtonColor: "#F4A615"
        }).then(()=>{
            window.location.href = '/login';
        });
      };
  
      const showSwalError = () => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          title: 'Hubo un error al registrarse.',
          icon: "error",
          confirmButtonColor: "#F4A615"
        }).then(()=>{
            window.location.href = '/register';
        });
      };

    const handleRegister = async ()=>{
        const first_name = document.getElementById('first-name').value;
        const last_name = document.getElementById('last-name').value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        setLoading(true);


        const formData = {
            first_name,
            last_name,
            email,
            password
        }

        try {
            const response = await fetch('https://gestor-gastos-backend.onrender.com:10000/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (response.ok) {
                setTimeout(()=>{
                    console.log('Registro exitoso')
                    showSwalSuccess()
                }, 2000)

              
            } else {
                setTimeout(()=>{
                    console.error('Error al registrarse');
                    showSwalError();
                    throw new Error();
                }, 2000)
            }
          } catch (error) {
            console.error('Error:', error);
          }
        
    }

    return (
        <>
            <div className='bg-black w-screen h-screen flex justify-center items-center'>
                <div className="bg-[#EAF2EF] w-4/5 h-3/5 md:w-2/6 md:h-2/5 flex flex-col rounded-lg">
                    <div className='mt-4 h-1/5 flex flex-col items-center justify-around rounded-t-lg'>
                        <h2 className='text-center font-bold w-full text-[1.5rem]'>Gestor de Gastos</h2>
                        <h3 className='text-center font-semibold w-full text-[1rem]'>Sign in</h3>
                    </div>
                    <div className='h-4/5 '>
                        <div  className=' h-full flex flex-col justify-around	'>
                            <div className='  flex flex-col justify-around items-center h-2/2 w-full gap-2'>
                                <input type="text" id="first-name" placeholder='Nombre' className='bg-[#f5f8f7] h-10 border-2 rounded-md w-5/6 p-1	' />
                                <input type="text" id="last-name" placeholder='Apellido' className='bg-[#f5f8f7] h-10 border-2  rounded-md w-5/6 p-1' />
                                <input type="text" id="email" placeholder='Email' className=' h-10 border-2 bg-[#f5f8f7] rounded-md w-5/6 p-1	' />
                                <input type="password" id="password" className='h-10 border-2  rounded-md p-1 bg-[#f5f8f7] w-5/6'placeholder='Contraseña' />
                            </div>

                            
                            <div className='text-center'>
                                <h3>¿Ya tenés una cuenta? <Link to={'/login'}> <span className='underline hover:cursor-pointer'>Inicia sesión</span> </Link></h3>
                            </div>

                            <div className='flex flex-col justify-center items-center h-10 w-full'>
                                {loading ? 
                                            <div className='flex text-center justify-center' > 
                            
                                                    <ThreeDots
                                                    visible={true}
                                                    height="80"
                                                    width="80"
                                                    color="#188C7C"
                                                    radius="9"
                                                    ariaLabel="three-dots-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                    />
                                            </div> :
                                            
                                            <input type='submit' onClick={handleRegister} value="Registrarse" className='w-5/6 bg-[#188C7C] text-[#f5f8f7] h-full rounded-md hover:cursor-pointer hover:scale-105 transition duration-150 ease-in-out' />}

                            </div>

                        </div>
                    </div>
                </div>
                <section className='flex flex-col justify-center items-center w-full fixed bottom-0 left-0 right-0' >
                    <div className='flex text-white text-sm cursor-pointer py-3 mb-2 gap-2' > 
                    <h3>Desarrollado por Franco Catania</h3>
                    <div className='flex justify-center items-center gap-2'>
                        <Link to={'https://www.linkedin.com/in/franco-catania-6758691a3/'} target="_blank"><i className="fa-brands fa-linkedin"></i></Link>
                    </div>

                    </div>
                </section>
            </div>
        </>
    )
}