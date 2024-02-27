import { useState, useEffect } from 'react';
import { Chart as ChartJS, scales } from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import { Colors } from 'chart.js';
import { SpentsStats } from './SpentsStats.jsx';
import {IncomesStats} from './IncomesStats.jsx';



export function Stats({ incomes, spents }) {
    const [isLoading, setLoading] = useState(true);
    const [spentsDonutData, setSpentsDonutData] = useState([]);
    const [spentsBarData, setSpentsBarData] = useState([]);
    const [incomesDonutData, setIncomesDonutData] = useState([]);
    const [incomesBarData, setIncomesBarData] = useState([]);
    const [graphChoice, setGraphChoice] = useState('donut');
    const [dataChoice, setDataChoice] = useState('spents')
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

            setSpentsDonutData(dataArray);
            setLoading(false)
            
            
        }
    }, [spents]);

    useEffect(() => {
        if (incomes && incomes.list) {
            const groupedData = incomes.list.reduce((acc, income) => {
                if (acc[income.category]) {
                    acc[income.category] += income.amount;
                } else {
                    acc[income.category] = income.amount;
                }
                return acc;
            }, {});


            const dataArray = Object.keys(groupedData).map(category => ({
                category,
                amount: groupedData[category]
            }));

            setIncomesDonutData(dataArray);
            setLoading(false)
            
            
        }
    }, [incomes]);

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
    
            setSpentsBarData(dataArray);
            setLoading(false)
            
        }
    }, [spents]);

    useEffect(() => {
        if (incomes && incomes.list) {
            const groupedData = incomes.list.reduce((acc, income) => {
                const date = new Date(income.date);
                const year = date.getUTCFullYear();
                const month = date.getUTCMonth() + 1;
                const key = `${year}-${month}`;
    
                if (acc[key]) {
                    acc[key] += income.amount;
                } else {
                    acc[key] = income.amount;
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
    
            setIncomesBarData(dataArray);
            setLoading(false)
            
        }
    }, [incomes]);

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


const handleGraph = (value) => {
        setGraphChoice(value)
    }  

const handleChoice = (value) => {
    setDataChoice(value);
}    
   

    return (
        <>
        <section className='flex flex-col py-1 h-[73.5%] md:h-4/6 overflow-scroll bg-white'>
            <article className='flex justify-around md:justify-start'>

                    <div>
                        <select name="" id="" onChange={(e) => handleChoice(e.target.value)}>
                            <option value="spents" >Gastos</option>
                            <option value="incomes">Ingresos</option>
                        </select>
                    </div>
                    {isMobile ? dataChoice == 'spents' ? 
                                <div>
                                    <select name="" id="" onChange={(e) => handleGraph(e.target.value)}>
                                        <option value="bars" selected={graphChoice === 'bars'}>Gastos por Mes</option>
                                        <option value="donut"selected={graphChoice === 'donut'}>Gastos por Categoría</option>
                                    </select>
                                </div>
                    :      
                    
                                <div>
                                    <select name="" id="" onChange={(e) => handleGraph(e.target.value)}>
                                        <option value="bars" selected={graphChoice === 'bars'} >Ingresos por Mes</option>
                                        <option value="donut" selected={graphChoice === 'donut'}>Ingresos por Categoría</option>
                                    </select>
                                </div>
                    : null
                            }


            </article>
            {dataChoice == 'spents' ? 
            
            <SpentsStats data = {spentsDonutData} dataBarGraphic = {spentsBarData} textCenter={textCenter} graphChoice={graphChoice} isMobile={isMobile}/> 
            
            :

            <IncomesStats data = {incomesDonutData} dataBarGraphic = {incomesBarData} textCenter={textCenter} graphChoice={graphChoice} isMobile={isMobile}/> }               

        </section>
        </>
    );
}