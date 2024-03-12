import { useState, useEffect } from 'react';

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

            {isLoading ? <div>Cargando...</div> :
                    data.map((transfer, index) => {
                        const date = new Date(transfer.date);
                        const utcDate = new Date(date.toISOString().split('T')[0]);

                        const day = utcDate.getUTCDate();
                        const month = utcDate.getUTCMonth() + 1; 
                        const year = utcDate.getUTCFullYear();

                        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
                        return (
                            <div key={index} className='flex my-1 ml-2 bg-[#c8e6db] rounded-sm mx-0.5'>
                                <div className='w-1/4'>{formattedDate}</div>
                                <div className='w-1/4 text-center'>De {transfer.fromName}</div>
                                <div className='w-1/4 text-center'>A {transfer.toName}</div>
                                <div className='w-1/4 text-right px-1'>${transfer.amount}</div>
                            </div>
                        );
                    })
                }
        </article>

        </>
    );
}