import { useState, useEffect } from 'react'
import { Spents } from './Spents'
import {decodeToken} from 'react-jwt';

export function Window(){

    const [spents, setSpents] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            const payload = decodeToken(token);
            const userId = payload._id;
  
            // console.log("PAYLOAD",payload);
            const response = await fetch(`http://localhost:8080/api/spents/${userId}`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            });
      
            if (!response.ok) {
              throw new Error('Hubo un error al hacer el fetch');
            }
      
            const result = await response.json();
            // console.log("PAYLOAD",result); // Aquí podrías manipular los datos recibidos
      
            setSpents(result);
          } catch (error) {
            console.error('Error al obtener los datos', error);
            // navigate('/login');
          }
        };
      
        fetchData();
      }, []);

    return <>
    <div className='bg-white h-5/6 w-5/6 md:w-4/6 m-auto rounded-lg'>
        <div className='h-20 bg-[#DFBE99] rounded-t-lg text-center flex justify-center items-center'>
            <div className='w-1/3'></div>
            <div className='w-1/3 text-[2rem]'>Gastos</div>
            <div className='w-1/3 text-[1rem] text-center h-[2rem]  flex justify-center items-center hover:cursor-pointer hover:scale-125 duration-75 '>
                <i className="fa-solid fa-plus rounded-full bg-[#4DAA57] w-[2rem] h-full flex items-center justify-center "></i>
            </div>
        </div>
        <Spents spents={spents}></Spents>
    </div>
    </>
}