import { useState, useEffect } from 'react';

export function Spents({ spents }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (spents && spents.list) {
            setData(spents.list);
            setLoading(false);
        }
    }, [spents]);

    return (
        <>
        <div className='flex flex-col py-1 h-5/6 overflow-scroll'>
            {isLoading ? <div>Cargando...</div> :
                    data.map((spent, index) => {
                        // Convertir la fecha a objeto Date
                        const date = new Date(spent.date);
                        const utcDate = new Date(date.toISOString().split('T')[0]);

                        // Obtener los componentes de la fecha
                        const day = utcDate.getUTCDate();
                        const month = utcDate.getUTCMonth() + 1; // Los meses en JavaScript son 0-indexados, por lo que se agrega 1
                        const year = utcDate.getUTCFullYear();
                        // Construir la cadena de fecha en el formato dd/mm/yyyy
                        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
                        return (
                            <div key={index} className='flex my-1 bg-[#FCE0C0] rounded-sm mx-0.5'>
                                <div className='w-1/3'>{formattedDate}</div>
                                <div className='w-1/3 text-center'>{spent.description}</div>
                                <div className='w-1/3 text-right px-1'>${spent.amount}</div>
                            </div>
                        );
                    })
                }
        </div>

        </>
    );
}