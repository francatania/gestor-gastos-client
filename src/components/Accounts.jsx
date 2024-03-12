import { useState, useEffect, useContext } from "react"
import { SelectedAccountContext } from '../App.jsx';


export function Accounts({accounts, handleAccount, flag}){
    const { selectedAccount,arrayAccounts, setArrayAccounts } = useContext(SelectedAccountContext);
    const [totalSpents, setTotalSpents] = useState(0)
    const [totalIncomes, setTotalIncomes] = useState(0)
    const [totalOutgoingTransfers, setTotalOutgoingTransfers] = useState(0);
    const [totalIncomingTransfers, setTotalIncomingTransfers] = useState(0);
    const [total, setTotal] = useState(0);


    useEffect(()=>{
        setArrayAccounts(accounts)
        
    }, [accounts])

    useEffect(()=>{
        console.log(arrayAccounts)
    }, [arrayAccounts])

    useEffect(()=>{
        const token = localStorage.getItem('token');
        let id = ''
        if (selectedAccount === '' && arrayAccounts.length > 0 && arrayAccounts[0]._id) {
            id = arrayAccounts[0]._id;
        } else {
            id = selectedAccount;
        }

        console.log('EL ID', id)

        const fetchData = async () =>{
            const response = await fetch(`http://localhost:8080/api/accounts/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
            }})

            if (!response.ok) {
                throw new Error('Hubo un error al hacer el fetch');
              }
        
            const result = await response.json();

            const totalAmountSpents = result.spents.reduce((accumulator, spent) => {
                return accumulator + spent.amount;
            }, 0);

            const totalAmountIncomes = result.incomes.reduce((accumulator, income) => {
                return accumulator + income.amount;
            }, 0);

            const totalAmountOutTransfers = result.transfers ? result.transfers.reduce((accumulator, transfer) => {
                if (transfer.accountId == id) {
                    return accumulator + transfer.amount;
                } else {
                    return accumulator;
                }
            }, 0) : 0;
            
            const totalAmountInTransfers = result.transfers ? result.transfers.reduce((accumulator, transfer) => {
                if (transfer.accountId != id) {
                    return accumulator + transfer.amount;
                } else {
                    return accumulator;
                }
            }, 0) : 0;
              
            setTotalSpents(totalAmountSpents)
            setTotalIncomes(totalAmountIncomes)
            setTotalOutgoingTransfers(totalAmountOutTransfers);
            setTotalIncomingTransfers(totalAmountInTransfers);
            console.log(arrayAccounts)
        }

        fetchData();
    }, [selectedAccount, arrayAccounts, flag])

    useEffect(()=>{
        const calc = totalIncomes - totalSpents + totalIncomingTransfers - totalOutgoingTransfers
        setTotal(calc); 
    }, [selectedAccount, arrayAccounts, flag, totalSpents, totalIncomes, totalOutgoingTransfers, totalIncomingTransfers])

    useEffect(()=>{console.log(totalSpents, "TOTAL DE GASTOS", totalIncomes, "TOTAL INCOMES", totalIncomingTransfers,"total INCOMING" , totalOutgoingTransfers, "total OUTGOING")}, [totalSpents, totalIncomes, totalOutgoingTransfers, totalIncomingTransfers])

    return <>
        <section className='h-1/2 bg-black grid grid-cols-3 mt-4 '>
            <div className='col-span-1 flex justify-start items-center text-white'>
                        </div>
            <div className='col-span-1 flex justify-center flex-col items-center text-white'>
              <select name="" id="" className="bg-black" value={selectedAccount} onChange={(e) => handleAccount(e.target.value)}>
                {arrayAccounts.map((account, index) => (
                    <option key={index} value={account._id}>
                        Cuenta {account.accountName}
                    </option>
                    ))}
              </select>
              <h3 className='text-xl'>${total}</h3>
            </div>
            <div className='col-span-1'></div>
        </section>
    </>
}