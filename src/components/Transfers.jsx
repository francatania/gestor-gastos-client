import { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

export function Transfers({ transfers }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);



    useEffect(() => {
        if (transfers && transfers.list) {
            setData(transfers.list);
            setLoading(false);
        }
    }, [transfers]);

    useEffect(()=>{console.log(data, transfers)}, [data])

    return (
        <>
        <article className='flex flex-col py-1 h-4/6 overflow-scroll overflow-x-hidden bg-[#EAF2EF]'>

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

            </div> :
                    data.map((transfer, index) => {
                        const date = new Date(transfer.date);
                        const utcDate = new Date(date.toISOString().split('T')[0]);

                        const day = utcDate.getUTCDate();
                        const month = utcDate.getUTCMonth() + 1; 
                        const year = utcDate.getUTCFullYear();

                        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
                        return (
                            <div key={index} className='flex my-1 ml-2 bg-[#c8e6db] rounded-sm mx-0.5'>
                                <div className='w-1/4 text-[0.9rem] sm:text-[1rem]'>{formattedDate}</div>
                                <div className='w-1/4 text-center text-[0.9rem] sm:text-[1rem]'>De {transfer.fromName}</div>
                                <div className='w-1/4 text-center text-[0.9rem] sm:text-[1rem]'>A {transfer.toName}</div>
                                <div className='w-1/4 text-right px-1 text-[0.9rem] sm:text-[1rem]'>${transfer.amount}</div>
                            </div>
                        );
                    })
                }
        </article>

        </>
    );
}