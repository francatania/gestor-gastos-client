import { useState, useEffect, useContext } from 'react';
import { decodeToken } from 'react-jwt';
import { ThreeDots } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';
import { SelectedAccountContext } from '../App.jsx';

export function CategoriesForm() {
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState('');
    const [category, setCategory] = useState('');
    const { selectedAccount } = useContext(SelectedAccountContext);
    const [userId, setUserId] = useState('');
    const urlPost = `https://gestor-gastos-backend.onrender.com/api/spents-categories`;
    const urlPostLocalHost = `http://localhost:8080/api/spents-categories`;

    const showSwalSuccess = () => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¡Categoria agregada!',
            icon: "success",
            confirmButtonColor: '#F4A615'
        }).then(() => {
            window.location.href = '/spents-form';
        });
    };

    const showSwalError = () => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Hubo un error al registrar el ingreso.',
            text: 'Recuerde que se debe completar todos los campos.',
            icon: "error",
            confirmButtonColor: '#F4A615'
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        const formData = {
            category: category,
            userId: userId
        };

        try {
            if(formData.category == '' || formData.userId == ''){
                setTimeout(() => {
                    showSwalError();
                    console.error('Error al agregar la categoría');
                    setLoading(false);
                }, 1000);
            }else{
                const response = await fetch(urlPost, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
    
                const result = await response.json();
                console.log(result);
    
                if (response.ok) {
                    setTimeout(() => {
                        showSwalSuccess();
                        console.log('Categoria agregada exitosamente');
                        setLoading(false);
                    }, 1000);
    
                } else {
                    setTimeout(() => {
                        showSwalError();
                        console.error('Error al agregar la categoría');
                        setLoading(false);
                    }, 1000);
                }
            }

        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const payload = decodeToken(token);
        setUserId(payload._id);
    }, []);

    return (
        <div className='bg-black h-lvh w-full flex align-middle'>
            <div className='bg-[#EAF2EF] h-5/6 w-[95%] md:w-3/6 m-auto rounded-lg'>
                <form action="POST" className='w-full h-full '>
                    <div className='flex flex-col p-2 md:p-5 justify-around h-1/6 w-full  '>
                        <Link className='hover:cursor-pointer' to={'/spents-form'}>
                            <h5 className='text-[0.8rem]'><i className="fa-solid fa-arrow-left"></i> Volver</h5>
                        </Link>
                        <h2 className='text-[1.5rem]'>Formulario de categoria</h2>
                    </div>
                    <div className='flex flex-col p-2 md:p-5 justify-center h-2/6 w-full '>
                        <label htmlFor="">Categoria</label>
                        <div className='shadow-sm'>
                            <input className='w-full rounded-sm p-1 shadow-sm bg-[#f5f8f7]' type="text" onChange={(e) => setCategory(e.target.value)} />
                        </div>
                    </div>
                    <div className='flex flex-col p-2 md:p-5 justify-end h-3/6 w-full '>
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
                                </div> :
                                <input onClick={handleSubmit} type="submit" value='Agregar Categoria' className='text center w-full rounded-sm p-1 bg-[#F4A615] text-[#071013] hover:cursor-pointer hover:scale-105 duration-75' />
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
