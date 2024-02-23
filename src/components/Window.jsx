import { useState, useEffect } from 'react'
import { Spents } from './Spents'
import {decodeToken} from 'react-jwt';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export function Window(){

    const [spents, setSpents] = useState(null);
    const [incomes, setIncomes] = useState([]);
    let [choice, setChoice] = useState('Spents');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            const payload = decodeToken(token);
            const userId = payload._id;
  
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
      
            setSpents(result);
          } catch (error) {
            console.error('Error al obtener los datos', error);
            navigate('/login');
          }
        };
      
        fetchData();
      }, []);

      const showIncomes = async () =>{
        try {
          const token = localStorage.getItem('token');
          const payload = decodeToken(token);
          const userId = payload._id;

          const response = await fetch(`http://localhost:8080/api/incomes/${userId}`, {
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
    
          setIncomes(result);
        } catch (error) {
          console.error('Error al obtener los datos', error);
          navigate('/login');
        }
      };

      const handleSpentsButton = () =>{
        setChoice('Spents');
      }

      const handleIncomesButton = () =>{
        setChoice('Incomes');
      }
      
      const handleStatsButton = () =>{
        setChoice('Stats');
      }
      

    return <>
      <section className=' h-5/6 w-5/6 md:w-4/6 m-auto rounded-lg '>
        
        <article className='h-1/6  '>

          <section className='h-1/2 bg-black grid grid-cols-3'>
            <div className='col-span-1 flex justify-start items-center text-white'>
                        </div>
            <div className='col-span-1 flex justify-center flex-col items-center text-white'>
              <h4>Total</h4>
              <h3 className='text-xl'>$180000</h3>
            </div>
            <div className='col-span-1'></div>
          </section>

          <section className='h-1/2  rounded-t-lg text-center flex justify-center items-center'>

            <article onClick={handleSpentsButton} className={choice == 'Spents' ? ' bg-[#DFBE99] w-1/3 flex justify-around h-full border-r-2  border-r-black ' : ' bg-[#9c7d58] w-1/3 flex justify-around h-full border-r-1 border-b-1 ' } >
              <div className='text-[1.2rem] md:text-[1.5rem] text-center flex items-center'>
                <h2 className="inline-block">Gastos</h2>
              </div>
              <div className='text-[1rem] text-center w-[1rem] flex justify-center items-center hover:cursor-pointer hover:scale-125 duration-75'>
                <Link to={'/spents-form'} className='w-full'>
                  <i className="fa-solid fa-plus rounded-full w-full h-2/3 flex items-center justify-center"></i>
                </Link>
              </div>
            </article>

            <article  className={choice == 'Incomes' ? ' bg-[#DFBE99] w-1/3 flex justify-around h-full border-r-2 border-b-2 border-r-black border-b-black' : ' bg-[#9c7d58] w-1/3 flex justify-around h-full border-r-1 border-b-1 ' }>
              <div onClick={handleIncomesButton} className='text-[1.2rem] md:text-[1.5rem] text-center flex items-center'>
                <h2 className="inline-block">Ingresos</h2>
              </div>
              <div className='text-[1rem] text-center w-[1rem] flex justify-center items-center hover:cursor-pointer hover:scale-125 duration-75'>
                <Link to={'/spents-form'} className='w-full'>
                  <i className="fa-solid fa-plus rounded-full w-full h-2/3 flex items-center justify-center"></i>
                </Link>
              </div>
            </article>

            <article className={choice == 'Stats' ? ' bg-[#DFBE99] w-1/3 flex justify-around h-full border-r-2 border-b-2 border-r-black border-b-black' : ' bg-[#9c7d58] w-1/3 flex justify-around h-full border-r-1 border-b-1 ' }>
              <div onClick={handleStatsButton} className='text-[1.2rem] md:text-[1.5rem] text-center flex items-center'>
                <h2 className="inline-block">Estadísticas</h2>
              </div>
            </article>

          </section>
        </article>


        {choice == 'Spents' ? <Spents spents={spents}></Spents> :
        choice == 'Incomes' ? <div>Incomes</div> :
        choice == 'Stats' ? <div>Nada</div> : null }
      </section>
    </>
}