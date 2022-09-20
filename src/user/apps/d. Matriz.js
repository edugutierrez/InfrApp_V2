import { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import { Table } from "../../components/Table";

import { getLocalDB } from "../../dbConnect"

export function Matriz(){

    const [ arrays, setArrays ] = useState(null)
    useEffect(()=>{ getLocalDB({ col: 'apps', doc: 'matriz'}).then( r => setArrays(r.data)) },[])
    
    const head ={
        site: {}, item: {},
        progress: { tdStyle: { textAlign:'center' } },
        date: {
            action:(e)=>{
            const date = new Date(e.date)
            return <small className="text-cetner ">{ isNaN(date) ? e.date : `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` }</small>
            },
            tdStyle: { textAlign:'center' }
        }
    }

    const Managment = () =>{
        getLocalDB({ col: 'apps', doc: 'matriz'}).then( ({link}) =>{ window.open(link, '_blank') })
        return <Navigate to="/home/matriz/panel"/>
    }

    return (
        <Routes>
            <Route path="/panel/" element={<Table {...{ title: 'MATRIZ PANEL', arrays, head }}/>}/>
            <Route path="/gestionar" element={ <Managment/> }/>
        </Routes>
    )
}