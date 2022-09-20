import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getDB, getLocalDB } from "../../dbConnect";

export function Users( ) {
    
    const [ data, setData ] = useState({ profiles:[], sites:[] })
    const { perfil, mySite } = JSON.parse(localStorage.user)
    
    useEffect(()=>{
        (async function(){
            const profiles = (await getLocalDB({ col: 'cfg', doc: 'apps'})).user[perfil].create
            const sites    = Object.keys(await getLocalDB({ col: 'cfg', doc: 'sites'}))
            setData({ profiles, sites })
        })()
    },[])
    
    return (
        <div className="container m-0 h-75 m-auto">
            <div className="row h-100 text-center">
                <Routes>
                    <Route path="admin" element={<Brew {...{mySite, sites:data.sites}} />} />
                    <Route path="nuevo" element={<NewUser profiles={data.profiles} />} />
                </Routes>
            </div>
        </div>
    )
    
}

function Brew({ sites, mySite }){
    
    const onChange = ({ target:{value} })=>{
        const lcSt = JSON.parse(localStorage.user)
        localStorage.user = JSON.stringify({...lcSt,mySite:value})
    }

    return(
        <div className="m-5">
            <button className="btn btn-secondary m-4 w-25">cambiar password</button>
            <h5>SELECCIONA TU SITE</h5>
            <select className="w-25 m-2" {...{onChange}}>
                { sites.map((r,n)=><option key={n} selected={ mySite === r ? true:false }>{r}</option>) }
            </select><br/>
        </div>
    )
}

function NewUser({profiles}){

    const createUser = async function(e){
        e.preventDefault()
        const [{value: mail}, {value: perfil}] = e.target
        getDB({action:'create user',data:{mail, perfil}}).then(res =>{
            if(res){ e.target.reset() }
        })
    }
 
    return (<form className="card text-center m-auto w-50 align-items-center" onSubmit={createUser}>
                <input className="m-3 w-75" placeholder="email" type="email" minLength={5} required/>
                <select className="m-3 text-center w-50" defaultValue={0}>
                    { profiles.map((r,n)=>(<option key={n}>{r}</option>)) }
                </select>
                <button className="btn btn-secondary m-3 w-25" type="submit">crear!</button>
            </form>)
}