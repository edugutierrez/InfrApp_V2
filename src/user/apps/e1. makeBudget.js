import { getSwal } from "../../components/getSwal";
import { getLocalDB, getDB, setLocalDB } from "../../dbConnect";

export async function makeBudget({ e, user, perfil, setArrays }){
    
    const sites = Object.keys(await getLocalDB({ col:'cfg', doc:'sites'}))
    const mySite = JSON.parse(localStorage.user).mySite
    const { budget:{ actions, list } } = await getLocalDB({ col: 'cfg', doc: 'apps' })
    const { blue:{ value_avg : dolar } } = await fetch('https://api.bluelytics.com.ar/v2/latest')
                                                .then( r => r.json())

    const onBlur = function({target:{value}}){
        document.querySelector('[name=us]').value = value !=='' ? `usd$ ${(value / dolar).toFixed(2)}`:``
    }

    const options = [
        <button className="m-3 btn upper"  disabled>{ `GESTION DE PRESUPUESTO ${ e?.id ?? '' }` }</button>,
        e.progress === 'start' ? <input name='title' placeholder="titulo" className="w-75" required/>:'',
        <select name='action' className="m-1" disabled={ actions[e.progress].length === 1 }>
            { ( actions[e.progress]  ).map( (r,n)=>(<option selected={ r === mySite } >{r}</option>) ) }
        </select>,
        <select name='site' className="m-1" disabled={ e.site ? true : false }>
            { ( e.site ? [e.site] : sites  ).map( (r,n)=>(<option selected={ r === mySite } >{r}</option>) ) }
        </select>,
        <select name='cat' className="m-1" disabled={ e.cat ? true : false }>
            { ( e.cat ? [e.cat] :list ).map( (r,n)=>(<option >{r}</option>) ) }
        </select>,
        e.progress === 'start' ? <input name='cost' placeholder="proyeccion ar$" className="w-75" required {...{onBlur}}/>:'',
        e.progress === 'start' ? <input name='us' placeholder={`usd$1 = ar$${ dolar }`} className="w-75" disabled/>:'',
        <div id='moreData'></div>,
    ]
    
    const file = actions[e.progress] === 'budget' ? 'pdf':null

    await getSwal( { options, file } ).then( ({ action, site, cat, title, budget, cost, obs, file }) =>{
        const data = { data: { site, cat, title, id: e.id }, log: { action, file, obs, user} }
        getDB({action:'upBudget', data }).then( ({ budgets }) =>{ 
            setLocalDB({ col:'apps', docs:{ budgets } })
            if(setArrays){ setArrays( budgets ) }
        })
    })
     
}