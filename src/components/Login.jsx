import { useNavigate } from 'react-router-dom';

export function Login(){
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const formData = {
            email,
            password
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (response.ok) {
              console.log('Inicio de sesion exitoso')
              const data = await response.json();
              const token = data.token; // Suponiendo que el servidor devuelve un objeto con el token
        
              // Almacena el token en el localStorage
              localStorage.setItem('token', token);
              console.log(token);
              // Redirige al usuario a la página 'home' o realiza otras acciones
              navigate('/home');
            } else {
              // Manejar el caso de error
              console.error('Error al iniciar sesion');
              throw new Error();
            }
          } catch (error) {
            console.error('Error:', error);
          }
        
    }

    return (
        <>
            <div className='bg-black w-screen h-screen flex justify-center items-center'>
                <div className="bg-white w-3/5 h-2/5 md:w-2/6 flex flex-col rounded-lg">
                    <div className='h-1/5  flex items-center rounded-t-lg'>
                        <h2 className='text-center w-full'>Bienvenido/a</h2>
                    </div>
                    <div className='h-4/5 '>
                        <div  className=' h-full flex flex-col justify-around	'>
                            <div className='  flex flex-col justify-around items-center h-1/2 w-full'>
                                <input type="text" id="email" placeholder='Email' className=' h-10 border-2  rounded-md w-5/6 p-1	' />
                                <input type="text" id="password" className='h-10 border-2  rounded-md p-1	w-5/6'placeholder='Contraseña' />
                            </div>
                        <div className='flex flex-col justify-center items-center h-10 w-full'>
                            <input type='submit' onClick={handleLogin} value="Iniciar sesión" className='w-5/6 bg-green-400 text-slate-100 h-full rounded-md hover:cursor-pointer hover:scale-105 transition duration-150 ease-in-out' />
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}