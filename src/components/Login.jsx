import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import {decodeToken} from 'react-jwt';


export function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        try {
            const formData = { email, password };
            const response = await fetch('https://gestor-gastos-backend.onrender.com:10000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setTimeout(async ()=>{
                    const data = await response.json();
                    const token = data.token;
                    const payload = decodeToken(token);
                    const name = payload.first_name + " " + payload.last_name
                    localStorage.setItem('token', token);
                    toast.success(`Bienvenido/a, ${name}`)
                }, 500)
                setTimeout(()=>{
                    setLoading(false);
                    navigate('/home');
                }, 2500)
                
            } else {
                setTimeout(()=>{
                    setLoading(false);
                    toast.error('Usuario y/o contraseña incorrecto.');
                }, 1000)

            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            toast.error('Ocurrió un error al iniciar sesión.');
        }
    };

    return (
        <div className='bg-black w-screen h-screen flex justify-center items-center'>
            <div className="bg-[#EAF2EF] w-4/5 h-2/5 md:w-2/6 md:h-2/5 flex flex-col rounded-lg">
                <div className='mt-4 h-1/5 flex flex-col items-center justify-around rounded-t-lg'>
                    <h2 className='text-center font-bold w-full text-[1.5rem]'>Gestor de Gastos</h2>
                    <h3 className='text-center font-semibold w-full text-[1rem]'>Log in</h3>
                </div>
                <div className='h-4/5 '>
                    <div className=' h-full flex flex-col justify-around'>
                        <div className='flex flex-col justify-around items-center h-1/2 w-full'>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                                className='h-10 border-2 rounded-md w-5/6 p-1 bg-[#f5f8f7]'
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='h-10 border-2 rounded-md p-1 w-5/6 bg-[#f5f8f7]'
                                placeholder='Contraseña'
                            />
                        </div>

                        <div className='text-center'>
                            <h3>¿No tenés una cuenta? <Link to={'/register'}> <span className='underline hover:cursor-pointer'>Registrate</span> </Link></h3>
                        </div>
                        <div className='flex flex-col justify-center items-center h-10 w-full'>
                            {loading ?
                                <div className='flex text-center justify-center'>
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

                                <input
                                    type='submit'
                                    onClick={handleLogin}
                                    value="Iniciar sesión"
                                    className='w-5/6 bg-[#188C7C] text-[#f5f8f7] h-full rounded-md hover:cursor-pointer hover:scale-105 transition duration-150 ease-in-out'
                                />
                            }
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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </div>
    );
}