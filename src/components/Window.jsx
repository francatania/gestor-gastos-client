import { useState, useEffect, useContext } from 'react'
import { Spents } from './Spents'
import { Incomes } from './Incomes';
import { Stats }  from './Stats'
import {Transfers} from './Transfers.jsx'
import {decodeToken} from 'react-jwt';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Accounts } from './Accounts.jsx';
import { SelectedAccountContext } from '../App.jsx';
import { Sidebar } from './Sidebar.jsx';




export function Window(){

    const [spents, setSpents] = useState(null);
    const [incomes, setIncomes] = useState([]);
    const [transfers, setTransfers] = useState([]);
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
    const [selectedFromDate, setSelectedFromDate] = useState('2024-01-01');
    const [selectedToDate, setSelectedToDate] = useState(todayDate);
    const [accounts, setAccounts] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const { selectedAccount, setSelectedAccount } = useContext(SelectedAccountContext);
    const [deleted, setDeleted] = useState(false);

    useEffect(()=>{
      const getUserInfo = async ()=>{
        const token = localStorage.getItem('token');
        const payload = decodeToken(token);
        const userId = payload._id;

        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

          
        if (!response.ok) {
          // navigate('/login');
          throw new Error('Hubo un error al hacer el fetch');
        }

        const result = await response.json();

        setUserInfo(result)
      }

      getUserInfo();
      
    }, [])


    useEffect(() => {
      if (userInfo && userInfo.user && userInfo.user.accounts) {
        const userAccounts = userInfo.user.accounts;

        const newObject = userAccounts.map(account => ({
          _id: account._id,
          accountName: account.accountName
        }));


        setAccounts(newObject)
      }

    }, [userInfo]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            const payload = decodeToken(token);
            let accountId = '';
            if(selectedAccount == ''){
               accountId = payload.accounts[0];
            }else{
              accountId = selectedAccount;
            }
            

            if(choice == 'Spents'){
              showSpents(accountId, token);
            }
            
            if(choice == 'Incomes'){
              showIncomes(accountId, token);
            }

            if(choice == 'Stats'){
              showSpents(accountId, token);
              showIncomes(accountId, token);
            }

            if(choice =='Transfers'){
              showTransfers(accountId, token)
            }

          } catch (error) {
            navigate('/login');
            console.error('Error al obtener los datos', error);

          }
        };
      
        fetchData();
      }, [selectedFromDate, selectedToDate, choice, selectedAccount, deleted]);  

    const handleAccount = (value) => {
      setSelectedAccount(value)
    }  
  
    const deletedFlag = ()=>{
      setDeleted(!deleted);
    }

    const showSpents = async (accountId, token) =>{
        const response = await fetch(`http://localhost:8080/api/spents-range-date/${accountId}?startDate=${selectedFromDate}&endDate=${selectedToDate}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          // navigate('/login');
          throw new Error('Hubo un error al hacer el fetch');
        }
  
        const result = await response.json();
  
        setSpents(result);
      }
    
      
    const showIncomes = async (accountId, token) =>{


          const response = await fetch(`http://localhost:8080/api/incomes-range-date/${accountId}?startDate=${selectedFromDate}&endDate=${selectedToDate}`, {
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

        }

    const showTransfers = async (accountId, token) =>{


          const response = await fetch(`http://localhost:8080/api/transfers-range-date/${accountId}?startDate=${selectedFromDate}&endDate=${selectedToDate}`, {
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
    
          setTransfers(result);

        }
    const handleSpentsButton = () =>{
        setChoice('Spents');
      }

    const handleIncomesButton = () =>{
        setChoice('Incomes');
      }

    const handleTransfersButton = () =>{
        setChoice('Transfers');
      }
      
    const handleStatsButton = () =>{
        setChoice('Stats');
        setChoice('Spents');
        setChoice('Stats');
      }
      

    return <>
      <div className='flex flex-col w-full'>

      <Sidebar user={userInfo}/>

      <section className=' h-[95%] w-[98%] md:w-4/6 m-auto rounded-lg '>
        
        <article className='h-1/6  '>

          <Accounts accounts={accounts} handleAccount={handleAccount} flag={deletedFlag}/>

          <section className='h-1/2  rounded-t-lg text-center flex justify-center items-center'>

            <article onClick={handleSpentsButton} className={choice == 'Spents' ? ' bg-[#188C7C] w-1/3 flex justify-around rounded-tl-lg h-full   hover:cursor-pointer' : ' bg-[#136F63] hover:cursor-pointer rounded-tl-lg w-1/3 flex justify-around h-full border-r-1 ' } >
              <div className='text-[1.2rem] md:text-[1.5rem] text-center text-white flex items-center'>
                <h2 className="inline-block text-[1rem] md:text-[1.5rem]">Gastos</h2>
              </div>
            </article>

            <article  className={choice == 'Incomes' ? ' bg-[#188C7C] w-1/3 flex justify-around h-full   hover:cursor-pointer' : ' bg-[#136F63] w-1/3 flex justify-around h-full hover:cursor-pointer border-r-1  ' }>
              <div onClick={handleIncomesButton} className='text-[1.2rem] md:text-[1.5rem] text-white text-center flex items-center'>
                <h2 className="inline-block text-[1rem] md:text-[1.5rem]">Ingresos</h2>
              </div>
            </article>

            <article onClick={handleTransfersButton} className={choice == 'Transfers' ? ' bg-[#188C7C] w-1/3 flex justify-around  h-full   hover:cursor-pointer' : ' bg-[#136F63] hover:cursor-pointer w-1/3 flex justify-around h-full border-r-1  ' } >
              <div className='text-[1.2rem] md:text-[1.5rem] text-center text-white flex items-center'>
                <h2 className="inline-block text-[1rem] md:text-[1.5rem]"><i class="fa-solid fa-right-left"></i></h2>
              </div>
            </article>

            <article className={choice == 'Stats' ? ' bg-[#188C7C] w-1/3 rounded-tr-lg flex justify-around h-full  hover:cursor-pointer' : ' bg-[#136F63] w-1/3 flex justify-around hover:cursor-pointer h-full border-r-1 rounded-tr-lg  ' }>
              <div onClick={handleStatsButton} className='text-[1.2rem] md:text-[1.5rem] text-white text-center flex items-center'>
                <h2 className="inline-block text-[1rem] md:text-[1.5rem]"><i class="fa-solid fa-chart-simple"></i></h2>
              </div>
            </article>

          </section>

        </article>

        <article className='flex  bg-[#188C7C]'> 
                <div className='flex  justify-around  w-2/3 '>
                    <div className='flex flex-col p-2 justify-start w-1/2 '>
                        <div className='w-full text-white '>
                                <label className='text-[0.8rem] sm:text-[1rem]' htmlFor="">Desde</label>
                            </div>
                            <div className=' shadow-sm'>
                                <input  
                                    type="date" 
                                    value={selectedFromDate} 
                                    onChange={(e) => {
                                        setSelectedFromDate(e.target.value)
                                    }} 
                                    className='text-[0.7rem] sm:text-[1rem] w-full rounded-sm p-1 shadow-sm'
                                />
                            </div>
                    </div>

                    <div className='flex flex-col p-2 justify-around  w-1/2 b'>
                          <div className='w-full text-white'>
                                <label className='text-[0.8rem] sm:text-[1rem]' htmlFor="">Hasta</label>
                            </div>
                            <div className=' shadow-sm'>
                                <input  
                                    type="date" 
                                    value={selectedToDate} 
                                    onChange={(e) => {
                                        setSelectedToDate(e.target.value)
                                    }} 
                                    className='text-[0.7rem] sm:text-[1rem] w-full rounded-sm p-1 shadow-sm'
                                />
                            </div>
                    </div>
                </div>

                <div className='w-1/3  flex justify-center items-center'>
                      {choice == 'Spents' ?                   
                      <div class="flex gap-3">
                        
                          <Link to={'/spents-form'}>
                            <button class="bg-[#F4A615] text-white font-bold py-2 mt-6 px-4 rounded flex items-center hover:bg-[#dba033] duration-75">
                              <i class="fa-solid fa-plus"></i>
                                
                            </button>
                          </Link>
                      </div> :
                      choice == 'Incomes' ? 
                      <div class="flex gap-3">
                          <Link to={'/incomes-form'}>
                            <button class="bg-[#F4A615] text-white font-bold py-2 mt-6 px-4 rounded flex items-center hover:bg-[#dba033] duration-75">
                              <i class="fa-solid fa-plus"></i>
                                
                            </button>
                          </Link>

                      </div>:
                      choice == 'Transfers' ? 
                      <div class="flex gap-3">
                        <Link to={'/transfers-form'}>
                            <button class="bg-[#F4A615] text-white font-bold py-2 mt-6 px-4 rounded flex items-center hover:bg-[#dba033] duration-75">
                              <i class="fa-solid fa-plus"></i>
                                
                            </button>
                        </Link>

                        </div> : null }
                  
                  </div>


        </article>


        {choice == 'Spents' ? <Spents spents={spents} account={selectedAccount} flag={deletedFlag}></Spents> :
        choice == 'Incomes' ? <Incomes incomes={incomes} account={selectedAccount} flag={deletedFlag}></Incomes> :
        choice == 'Stats' ? <Stats spents={spents} incomes={incomes}></Stats> : 
        choice == 'Transfers' ? <Transfers transfers={transfers}></Transfers> : null}
      </section>

      </div>
      
    </>
}