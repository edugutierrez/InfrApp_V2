import { getLocalDB } from "../dbConnect";
import { useEffect, useState } from "react";
import { MyChartPolar, MyChartLine } from "../components/Charts";

export function MyDashBoard() {
    
    const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
    const [ myBoard, setMyBoard ] = useState(null)
    const [ mySite, setMySite ]   = useState('todos')

    useEffect(()=>{
        (async function(){
            setMyBoard({
                sites: ['todos'].concat( Object.keys( await getLocalDB({ col:'cfg', doc:'sites' }) ) ),
                tickets: myFilter( (await getLocalDB({ col: 'apps', doc: 'tickets' })).values, 'progress' ),
                matriz: myFilter( (await getLocalDB({ col: 'apps', doc: 'matriz'})).data, 'progress' ),
                aco: myFilter( (await getLocalDB({ col: 'apps', doc: 'monitoreo'})).values.filter( r => r.equipo === 'ACO'), 'progress' ),
                ge: myFilter( (await getLocalDB({ col: 'apps', doc: 'monitoreo'})).values.filter( r => r.equipo === 'GE'), 'progress' ),
                ups: myFilter( (await getLocalDB({ col: 'apps', doc: 'monitoreo'})).values.filter( r => r.equipo === 'UPS'), 'progress' ),
            })
        })()
    },[mySite])
    
    const myFilter = (data, index)=>{
        const  res = {}
        data.filter(({site})=> site === mySite || mySite === 'todos').forEach(e => {
            res[e[index]] = (res[e[index]] ?? 0 ) + 1
        });
        return res
    }

    if(myBoard){
        
        return (<div className="container m-auto text-center">
        <div className="row text-center m-2" >
            <div style={{'text-align':'-webkit-center'}}>
                <select className="w-50 form-select" onChange={ ({target}) => setMySite(target.value) }>
                    { myBoard.sites.map( (r, n) => <option key={n}>{r}</option> ) }
                </select>
            </div>
        </div>
        <div className="row text-center m-4" >
            <div className="col-3"><small>Tickets by Progress</small>
                <MyChartPolar myData={ myBoard.tickets } />
            </div>
            <div className="col-3"><small>Matriz Status</small>
                <MyChartPolar myData={ myBoard.matriz } />
            </div>
            <div className="col-2"><small>ACO Monitor</small>
                <MyChartPolar myData={ myBoard.aco } />
            </div>
            <div className="col-2"><small>GE Monitor</small>
                <MyChartPolar myData={ myBoard.ge } />
            </div>
            <div className="col-2"><small>UPS Monitor</small>
                <MyChartPolar myData={ myBoard.ups } />
            </div>
        </div>
        <div className="row text-center m-3" >
            <div className="col-3"><small>Eficiencia Energia</small>    
            </div>
            <div className="col-6"><small>Horas de Gestion</small>
                {/* <MyChartLine labels={['D', 'L', 'M', 'X', 'J', 'V', 'S']} myData={tracker}/> */}
            </div>
        </div>
    </div>)
    }
    
}