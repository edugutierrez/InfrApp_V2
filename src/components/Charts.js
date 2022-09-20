import { Chart as ChartJS, RadialLinearScale, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { PolarArea, Line } from 'react-chartjs-2';
ChartJS.register(RadialLinearScale, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler );

const myColors = ['54, 162, 235', '255, 99, 132', '255, 206, 86', '75, 192, 192', '153, 102, 255', '255, 159, 64'].map( r => `rgba(${r}, 0.5)`)

export function MyChartPolar({ myData }) {
    
    const options = { fill: true, animations: false, responsive: true, plugins: { legend: { display: true } } }
    const data = {
        datasets: [{
            borderColor: "rgb(75, 192, 192)",
            tension: 0.3,
            data: Object.values(myData),
            backgroundColor: myColors,
            borderWidth: 1,
        }],
        labels: Object.keys(myData)
    };

  return (<div className="App"><PolarArea {...{data, options}}/></div>);
}

export function MyChartLine({ myData, labels }){
    
    const options = { fill: true, responsive: true, scales: { y: { min: 0 } }, plugins: { legend: { display: true } } }

    const data = { datasets: myData.map( (r, n) => ({label: r[0], data: r[1], tension: 0.3, borderColor: myColors[n]  })), labels }
    return (<div className="App"><Line {...{data, options}} /></div>)
}