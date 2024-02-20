import { useState, useEffect } from 'react'

export function SpentsForm(){
    const [categories, setCategories] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    useEffect(()=>{
        const fetchData = async () => {
            try {

              const response = await fetch(`http://localhost:8080/api/categories`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                },
              });
        
              if (!response.ok) {
                throw new Error('Hubo un error al hacer el fetch');
              }
        
              const result = await response.json();
        
              setCategories(result.categories);
            } catch (error) {
              console.error('Error al obtener los datos', error);
            }
          };
        
          fetchData();
    }, [])


    return <>
        <div className='bg-black h-lvh w-full flex align-middle'>
          <div className='bg-white h-5/6 w-5/6 md:w-4/6 m-auto rounded-lg'>
            <form action="POST" className='w-full'>
                <label htmlFor="">Fecha</label>
                <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)} 
                        pattern="\d{4}-\d{2}-\d{2}" 
                        placeholder="MM/DD/YYYY"
                    />
                <select className="w-full" name="" id="">
                            {categories.map((category, index) => (
                            <option key={index} value={category.category}>{category.category}</option>
                        ))}
                </select>
            </form>
          </div>
        </div>
    </>
}