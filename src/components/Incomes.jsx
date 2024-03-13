import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Oval } from 'react-loader-spinner';
import {decodeToken} from 'react-jwt';


export function Incomes({ incomes,account, flag }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('')


    useEffect(() => {
        if (incomes && incomes.list) {
            setData(incomes.list);
            setLoading(false);
        }
    }, [incomes]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const payload = decodeToken(token);
        if(account == ''){
           setSelectedAccount(payload.accounts[0]);
        }else{
            setSelectedAccount(account);
        }
    }, [account]);

    const showSwalConfirmation = (id) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Borrar el ingreso?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#F4A615',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrarlo',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
            }
        });
    };

    const handleDelete = async (id)=>{
        try {
            const response = await fetch(`https://gestor-gastos-backend.onrender.com/api/incomes/${id}?account=${selectedAccount}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if(response.ok){
                toast.success('¡Ingreso eliminado!')
                flag();
            }else{
                toast.error('Hubo un error al eliminar el ingreso.')
                throw new Error(error)
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
        <div className='flex flex-col py-1 h-4/6 overflow-scroll overflow-x-hidden bg-[#EAF2EF]'>
            {isLoading ? 
            <div className='h-full flex justify-center items-center'>
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#188C7C"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />

            </div>  :
                    data.map((income, index) => {
                        const date = new Date(income.date);
                        const utcDate = new Date(date.toISOString().split('T')[0]);

                        const day = utcDate.getUTCDate();
                        const month = utcDate.getUTCMonth() + 1; 
                        const year = utcDate.getUTCFullYear();
                        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
                        return (
                            <div key={index} className='flex my-1 ml-2 bg-[#c8e6db] rounded-sm mx-0.5'>
                                <div className='w-[20%] text-start text-[0.9rem] sm:text-[1rem]'>{formattedDate}</div>
                                <div className='w-[50%] text-center text-[0.9rem] sm:text-[1rem]'>{income.description}</div>
                                <div className='w-[23.5%] text-center px-1 text-[0.9rem] sm:text-[1rem]'>${income.amount}</div>
                                <div className='w-[6.5%] text-end px-1 text-[0.9rem] sm:text-[1rem]'><i onClick={()=>showSwalConfirmation(income._id)} className="fa-solid fa-trash hover:cursor-pointer hover:text-red-500 transition all "></i></div>
                            </div>
                        );
                    })
                }

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

        </>
    );
}