import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { getLocalDB } from "../../dbConnect";

import { Table } from "../../components/Table";
import { makeTicket } from "./b1. makeTicket";

export function MyMonitor({ perfil, user, config:{ apps: {tickets}} }) {

    const [ arrays, setArrays ] = useState(null)
    useEffect(()=>{
        getLocalDB({ col: 'apps', doc: 'monitoreo' }).then( r=>{ setArrays(r?.values) })
    },[])

    const cats = (e)=>({ACO:'climatizacion', UPS:'backup energetico', GE:'backup energetico'}[e])

    const head = {
        id: {
            style: { width: '75%' },
            action: ({id})=>
                <small className="click" data-toggle="tooltip" title="bitacora"
                    onClick={()=>window.open(`https://infrapp.web.app?idqr=${id}`, '_blank')}>{id}</small>
        },
        progress:{
            action: ({progress, id, site, equipo})=> <small className="click" data-toggle="tooltip" title="gestionar"
                onClick={()=>makeTicket({ e:{ qr:id, op: progress, progress:'start', site, cat: cats(equipo) }, user, tickets})}>{progress}</small>
        },
        equipo: {
            style: { width: '75%' },
        },
        site: {}, sector: {}, tipo:{}
    }
    
    return(<Routes>
        <Route path="admin"/>
        <Route path="panel" element={ arrays ? <Table {...{title:'MONITOR PANEL', arrays, head }}/> : <div>SIN DATOS</div> }/>
    </Routes>)
}