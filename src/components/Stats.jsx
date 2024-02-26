import { useState, useEffect } from 'react';
import { Chart as ChartJS, scales } from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import { Colors } from 'chart.js';



export function Stats({ incomes, spents }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataBarGraphic, setDataBarGraphic] = useState([])
    const [graphChoice, setGraphChoice] = useState('bars');
    const [isMobile, setIsMobile] = useState(false);

    ChartJS.register(Colors);

    useEffect(() => {
        if (spents && spents.list) {
            const groupedData = spents.list.reduce((acc, spent) => {
                if (acc[spent.category]) {
                    acc[spent.category] += spent.amount;
                } else {
                    acc[spent.category] = spent.amount;
                }
                return acc;
            }, {});


            const dataArray = Object.keys(groupedData).map(category => ({
                category,
                amount: groupedData[category]
            }));

            setData(dataArray);
            setLoading(false)
            
            
        }
    }, [spents]);

    useEffect(() => {
        if (spents && spents.list) {
            const groupedData = spents.list.reduce((acc, spent) => {
                const date = new Date(spent.date);
                const year = date.getUTCFullYear();
                const month = date.getUTCMonth() + 1;
                const key = `${year}-${month}`;
    
                if (acc[key]) {
                    acc[key] += spent.amount;
                } else {
                    acc[key] = spent.amount;
                }
    
                return acc;
            }, {});
    
            const dataArray = Object.keys(groupedData)
                .map(key => ({
                    date: key,
                    amount: groupedData[key]
                }))
                .sort((a, b) => {
                    const [aYear, aMonth] = a.date.split('-').map(Number);
                    const [bYear, bMonth] = b.date.split('-').map(Number);
                    if (aYear !== bYear) {
                        return aYear - bYear;
                    } else {
                        return aMonth - bMonth;
                    }
                });
    
            setDataBarGraphic(dataArray);
            setLoading(false)
            
        }
    }, [spents]);

    const textCenter = {
        id: 'textCenter',
        beforeDatasetDraw(chart, args, pluginOptions) {
            const {ctx, data, chartArea } = chart;

            const list = data.datasets[0].data
            // console.log("hola",list)
            const suma = Object.values(list).reduce((acc, currentValue) => acc + currentValue, 0);

            console.log(suma)

            ctx.save();

            const screenWidth = window.innerWidth;
            if (screenWidth < 768) {
                ctx.font = '15px sans-serif';
            } else if (screenWidth < 1024) {
                ctx.font = '20px sans-serif';
            } else {
                ctx.font = '20px sans-serif';
            }
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;
    
            ctx.fillText(`$${suma}`, centerX, centerY);
            
        }
    }

    useEffect(() => {
        const handleResize = () => {
          const screenWidth = window.innerWidth;
          setIsMobile(screenWidth < 1000);
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []); 
      
   

    return (
        <>
        <div className='flex flex-col py-1 h-[73.5%] overflow-scroll bg-white'>

            {isLoading ? <div>Cargando...</div> :

            !isMobile ? 
            <div className='flex flex-col md:flex-row justify-center align-middle h-full w-full'>
                
                <div className='w-full h-1/2 md:w-1/2 md:h-full'>
                    <Doughnut
                        data={{
                            labels: data.map((i) => i.category),
                            datasets: [
                                {
                                    label: "Monto",
                                    data: data.map((i) => i.amount)
                                }
                                
                            ]
                        }}
                        plugins={[textCenter]}

                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: false,
                                    display: false
                                }
                            },

                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Gastos por Categoría'
                                },
                                colors: {
                                    enabled: true
                                  }
                            }  
                        }}
                    />
                </div>

                <div className='w-full h-1/2 md:w-1/2 md:h-full flex justify-center align-middle'>
                    <Bar
                        data={{
                            labels: dataBarGraphic.map((i) => i.date),
                            datasets: [
                                {
                                    label: "Monto",
                                    data: dataBarGraphic.map((i) => i.amount)
                                } 
                            ]
                        }}
                        
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                        

                              plugins: {
                                title: {
                                    display: true,
                                    text: 'Gastos por Año'
                                }
                            }  
                        }}
        

                    />
                </div>
            
            </div>
            : graphChoice == 'donut' ?

                <div  className={isMobile ? 'w-full h-full' : 'w-full h-1/2 md:w-1/2 md:h-full'}>
            <Doughnut
                data={{
                    labels: data.map((i) => i.category),
                    datasets: [
                        {
                            label: "Monto",
                            data: data.map((i) => i.amount)
                        }
                        
                    ]
                }}
                plugins={[textCenter]}

                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            display: false
                        }
                    },

                    plugins: {
                        title: {
                            display: true,
                            text: 'Gastos por Categoría'
                        },
                        colors: {
                            enabled: true
                          }
                    }  
                }}
            />
                </div>
            :
            
                <div className='w-full h-full  flex justify-center align-middle'>
            <Bar
                data={{
                    labels: dataBarGraphic.map((i) => i.date),
                    datasets: [
                        {
                            label: "Monto",
                            data: dataBarGraphic.map((i) => i.amount)
                        } 
                    ]
                }}
                
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                

                      plugins: {
                        title: {
                            display: true,
                            text: 'Gastos por Mes'
                        }
                    }  
                }}


            />
                </div>
        }
        </div>

        </>
    );
}