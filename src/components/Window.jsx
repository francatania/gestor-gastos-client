import { useState, useEffect } from 'react'
import { Spents } from './Spents'
import { Incomes } from './Incomes';
import { Stats }  from './Stats'
import {decodeToken} from 'react-jwt';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export function Window(){

    const [spents, setSpents] = useState(null);
    // console.log(spents)
    const [incomes, setIncomes] = useState([]);
    let [choice, setChoice] = useState('Spents');
    const navigate = useNavigate();

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayDate = formatDate(todayDateOnly)
    const [selectedFromDate, setSelectedFromDate] = useState(todayDate);
    const [selectedToDate, setSelectedToDate] = useState(todayDate);
    // console.log(selectedFromDate)
    // console.log(selectedToDate)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            const payload = decodeToken(token);
            const userId = payload._id;

            if(choice == 'Spents'){
              const response = await fetch(`http://localhost:8080/api/spents-range-date/${userId}?startDate=${selectedFromDate}&endDate=${selectedToDate}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });
        
              if (!response.ok) {
                throw new Error('Hubo un error al hacer el fetch');
              }
        
              const result = await response.json();
        
              setSpents(result);
            }
            
            if(choice == 'Incomes'){
              showIncomes();
            }

          } catch (error) {
            console.error('Error al obtener los datos', error);
            navigate('/login');
          }
        };
      
        fetchData();
      }, [selectedFromDate, selectedToDate, choice]);



    const showIncomes = async () =>{
        try {
          const token = localStorage.getItem('token');
          const payload = decodeToken(token);
          const userId = payload._id;

          const response = await fetch(`http://localhost:8080/api/incomes-range-date/${userId}?startDate=${selectedFromDate}&endDate=${selectedToDate}`, {
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
        showIncomes();
      }
      
    const handleStatsButton = () =>{
        setChoice('Stats');
        showIncomes();
      }
      

    return <>
      <section className=' h-[95%] w-[98%] md:w-4/6 m-auto rounded-lg '>
        
        <article className='h-1/6  '>

          <section className='h-1/2 bg-black grid grid-cols-3 '>
            <div className='col-span-1 flex justify-start items-center text-white'>
                        </div>
            <div className='col-span-1 flex justify-center flex-col items-center text-white'>
              <h4 className='text-sm'>Tu saldo</h4>
              <h3 className='text-xl'>$180000</h3>
            </div>
            <div className='col-span-1'></div>
          </section>

          <section className='h-1/2  rounded-t-lg text-center flex justify-center items-center'>

            <article onClick={handleSpentsButton} className={choice == 'Spents' ? ' bg-[#DFBE99] w-1/3 flex justify-around rounded-tl-lg h-full   hover:cursor-pointer' : ' bg-[#9c7d58] hover:cursor-pointer rounded-tl-lg w-1/3 flex justify-around h-full border-r-1 border-b-1 ' } >
              <div className='text-[1.2rem] md:text-[1.5rem] text-center flex items-center'>
                <h2 className="inline-block">Gastos</h2>
              </div>
              <div className='text-[1rem] text-center w-[1rem] flex justify-center items-center hover:cursor-pointer hover:scale-125 duration-75'>
                <Link to={'/spents-form'} className='w-full'>
                  <i className="fa-solid fa-plus rounded-full w-full h-2/3 flex items-center justify-center"></i>
                </Link>
              </div>
            </article>

            <article  className={choice == 'Incomes' ? ' bg-[#DFBE99] w-1/3 flex justify-around h-full   hover:cursor-pointer' : ' bg-[#9c7d58] w-1/3 flex justify-around h-full hover:cursor-pointer border-r-1 border-b-1 ' }>
              <div onClick={handleIncomesButton} className='text-[1.2rem] md:text-[1.5rem] text-center flex items-center'>
                <h2 className="inline-block">Ingresos</h2>
              </div>
              <div className='text-[1rem] text-center w-[1rem] flex justify-center items-center hover:cursor-pointer hover:scale-125 duration-75'>
                <Link to={'/incomes-form'} className='w-full'>
                  <i className="fa-solid fa-plus rounded-full w-full h-2/3 flex items-center justify-center"></i>
                </Link>
              </div>
            </article>

            <article className={choice == 'Stats' ? ' bg-[#DFBE99] w-1/3 rounded-tr-lg flex justify-around h-full  hover:cursor-pointer' : ' bg-[#9c7d58] w-1/3 flex justify-around hover:cursor-pointer h-full border-r-1 rounded-tr-lg border-b-1 ' }>
              <div onClick={handleStatsButton} className='text-[1.2rem] md:text-[1.5rem] text-center flex items-center'>
                <h2 className="inline-block">Estadísticas</h2>
              </div>
            </article>

          </section>

        </article>

        <article className='h-1/12 bg-[#DFBE99]'> 
                <div className='flex  justify-around  w-full '>
                    <div className='flex flex-col p-2 md:p-5 justify-around w-full b'>
                        <div className='w-full '>
                                <label htmlFor="">Desde</label>
                            </div>
                            <div className=' shadow-sm'>
                                <input  
                                    type="date" 
                                    value={selectedFromDate} 
                                    onChange={(e) => {
                                        setSelectedFromDate(e.target.value)
                                    }} 
                                    className='w-full rounded-sm p-1 shadow-sm'
                                />
                            </div>
                    </div>

                    <div className='flex flex-col p-2 md:p-5 justify-around  w-full b'>
                        <div className='w-full '>
                                <label htmlFor="">Hasta</label>
                            </div>
                            <div className=' shadow-sm'>
                                <input  
                                    type="date" 
                                    value={selectedToDate} 
                                    onChange={(e) => {
                                        setSelectedToDate(e.target.value)
                                    }} 
                                    className='w-full rounded-sm p-1 shadow-sm'
                                />
                            </div>
                    </div>
                    </div>
        </article>


        {choice == 'Spents' ? <Spents spents={spents}></Spents> :
        choice == 'Incomes' ? <Incomes incomes={incomes}></Incomes> :
        choice == 'Stats' ? <Stats spents={spents} incomes={incomes}></Stats> : null}
      </section>
    </>
}