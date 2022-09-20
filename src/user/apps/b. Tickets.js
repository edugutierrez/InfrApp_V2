import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { getLocalDB } from "../../dbConnect";

import { Table } from "../../components/Table";
import { makeTicket } from "./b1. makeTicket";

export function Tickets({ perfil, user, config:{ apps:{ tickets }, sites } }) {
    
    const [ arrays, setArrays ] = useState(null)
    useEffect(()=>{
        getLocalDB({ col: 'apps', doc: 'tickets' }).then( r=>{ setArrays(r?.values) })
    },[tickets])
    
    const head = {
        id: {
            style: { width: '100%' },
            action: ({id})=> <small className="click" onClick={()=>window.open(`https://infrapp.web.app?getTK=${id}`, '_blank')}>{id}</small>
        },
        progress: {
            style: { width: '100%'},
            action:(e)=><small {... tickets.actions[e.progress]? { className:'click', onClick: ()=> ticketSet({...e }) }:{} }>{e.progress}</small>
        },
        site: {}, time: {}, cat: {}, obs: {},
    }

    const NewTicket = () =>{
        useEffect(()=>{ ticketSet( { progress:'start' } ) },[])
        return <Navigate to="/home/tickets/panel"/>
    }
    const ticketSet = (e) =>{
        makeTicket( {...{ e, user, perfil, setArrays }} )
    }

    return (
        <Routes>
            <Route path="/nuevo" element={<NewTicket />}/>
            <Route path="/panel/" element={ arrays ? <Table {...{title:'TICKET PANEL', arrays, head }}/> : <div>SIN DATOS</div> }/>
            <Route path="/history/" />
        </Routes>
    )
    
}