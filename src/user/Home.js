import { Routes, Route, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import { getDB, getLocalDB, setLocalDB } from "../dbConnect";

import { SideBar } from "../components/Bars";
import { MyDashBoard } from "./MyDashBoard";

import { Users } from "./apps/a. Users";
import { Cowork } from "./cowork/a. Cowork";
import { Tickets } from "./apps/b. Tickets";
import { MyMonitor } from "./apps/c. Monitoreo";
import { Budgets } from "./apps/e. Budgets";
import { Matriz } from "./apps/d. Matriz";
import { IotDash } from "./apps/f. Iot";


export function Home({ log:{ perfil, user }, setLog }){
    
    const [ config, setConfig ] = useState(null)
    const upDate = true

    useEffect( ()=>{
        (async function(){
            const nav   = (await getLocalDB({ col:'cfg', doc:'nav'}))?.values
            const sites = await getLocalDB({ col:'cfg', doc:'sites'})
            const apps  = await getLocalDB({ col:'cfg', doc:'apps'})
            if(![ nav, sites, apps ].includes(null)){setConfig({ nav, sites, apps })}
            if(upDate){
            getDB({ action:'getConfig', data:{ perfil, user }, mix: nav ? true : false }).then( res =>{
                if(res){
                    Object.entries(res).forEach(([col,docs])=>{setLocalDB({col,docs})})
                    setConfig(res.cfg)
                }else{
                    localStorage.clear()
                    setLog(null)
                }
            })
            }

        })()
    },[])
    
    if(config){

        const routes = config.nav.map( r => Object.keys(r)[0] )
        const elements = {
            budget: <Budgets {...{ perfil, user, config }}/>,
            cowork: <Cowork/>,
            monitoreo: <MyMonitor {...{ perfil, user, config }}/>,
            tickets: <Tickets {...{ perfil, user, config }}/>,
            user: <Users/>,
            matriz: <Matriz/>,
            iot:<IotDash/>
        }
        
        return (
            <main style={{ position: 'relative', height:'100vh' }}>
                <SideBar {...{ nav: config.nav, title:'InfrApp',titlePath:'/home', second:'logOut!',secondPath:'/logout' } } />
                <Routes>
                    <Route path="/" element={<content className="container overflow-auto m-2"><Outlet/></content>} >
                        <Route path="/" element={<MyDashBoard />} />
                        {routes.map((r, key) => <Route {...{ key, path:`/${r}/*`, element: elements[r] ?? <div>error</div> }} />)}
                    </Route>
                </Routes>
            </main>
        )
    }
}