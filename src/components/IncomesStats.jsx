import { useState, useEffect } from 'react'
import { Chart as ChartJS, scales } from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import { Colors } from 'chart.js';

export function IncomesStats({data, dataBarGraphic, textCenter, graphChoice, isMobile}){

    
    ChartJS.register(Colors);

    const [isLoading, setLoading] = useState(true);
    const [donutData, setDonutData] = useState([]);
    const [barData, setBarData] = useState([])

    useEffect(()=>{
        if(data && dataBarGraphic){
            setDonutData(data);
            setBarData(dataBarGraphic);
            setLoading(false)
        }
    
        
    },[data, dataBarGraphic])


              




    return <>

            {isLoading ? <div>Cargando...</div> :

            !isMobile ? 
            <div className='flex flex-col md:flex-row justify-center align-middle h-full w-full'>
                
                <div className='w-full h-1/2 md:w-1/2 md:h-full'>
                    <Doughnut
                        data={{
                            labels: donutData.map((i) => i.category),
                            datasets: [
                                {
                                    label: "Monto",
                                    data: donutData.map((i) => i.amount)
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
                                    text: 'Ingresos por Categoría'
                                },
                                colors: {
                                    enabled: true,
                                    forceOverride: true
                                }
                            }  
                        }}
                    />
                </div>

                <div className='w-full h-1/2 md:w-1/2 md:h-full flex justify-center align-middle'>
                    <Bar
                        data={{
                            labels: barData.map((i) => i.date),
                            datasets: [
                                {
                                    label: "Monto",
                                    data: barData.map((i) => i.amount)
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
                                    text: 'Ingresos por Mes'
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
                    labels: donutData.map((i) => i.category),
                    datasets: [
                        {
                            label: "Monto",
                            data: donutData.map((i) => i.amount)
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
                            text: 'Ingresos por Categoría'
                        },
                        colors: {
                            enabled: true,
                            forceOverride: true
                        }
                    }  
                }}
            />
                </div>
            :

                <div className='w-full h-full  flex justify-center align-middle'>
            <Bar
                data={{
                    labels: barData.map((i) => i.date),
                    datasets: [
                        {
                            label: "Monto",
                            data: barData.map((i) => i.amount)
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
                            text: 'Ingresos por Mes'
                        }
                    }  
                }}


            />
                </div>
            }
            
    </>
}