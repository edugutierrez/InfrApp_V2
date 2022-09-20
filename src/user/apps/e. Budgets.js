import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { getLocalDB } from "../../dbConnect";

import { Table } from "../../components/Table";
import { makeBudget } from "./e1. makeBudget"

export function Budgets({ perfil, user, config:{ apps:{ budget }, sites } }){

    const [ arrays, setArrays ] = useState(null)
    useEffect(()=>{ getLocalDB({ col: 'apps', doc: 'budgets' }).then( r=>{ setArrays(r?.values) }) },[budget])
    
    const head = {
        id: {
            style: { width: '100%' },
            action: ({id})=> <small className="click" onClick={()=>window.open(`https://infrapp.web.app?getBud=${id}`, '_blank')}>{id}</small>
        },
        progress: {
            style: { width: '100%'},
            action:(e)=><small {... budget.actions[e.progress]? { className:'click', onClick: ()=> budgetSet({...e }) }:{} }>{e.progress}</small>
        },
        site: {}, time: {}, cat: {}, obs: {},
    }
    
    const NewBudget = () =>{
        useEffect(()=>{ budgetSet( { progress:'start' } ) },[])
        return <Navigate to="/home/budget/panel"/>
    }
    const budgetSet = (e) =>{
        makeBudget( {...{ e, user, perfil, setArrays }} )
    }

    return (
        <Routes>
            <Route path="/nuevo" element={<NewBudget />}/>
            <Route path="/panel/" element={ <Table {...{title:'BUDGETS PANEL', arrays, head }}/> }/>
            <Route path="/history/" />
        </Routes>
    )
}