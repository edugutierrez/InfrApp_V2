import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { getDB, getLocalDB, setLocalDB } from "../../dbConnect";
import { MakeSite, MakeRoom, Booking } from "./b. CoworkFunctions";

export function Cowork(){
    
    const [ sites, setSites ] = useState(null)
    useState(()=>{ getLocalDB({ col: 'cfg', doc: 'sites'}).then( r => setSites(r)) },[])

    const upSite = ( e, action )=>{
        e.preventDefault()
        const [{value: site},{value: value1},{value: value2}] = e.target
        getDB({ action, data:{ site, value1, value2 }}).then(res =>{
            if(res){
                setLocalDB({ col: 'cfg', docs:{ sites: res }})
                setSites(res)
                e.target.reset()
            }
        })
    }
    
    return (
        <div className="container m-0 h-75 m-auto">
            <div className="row h-100 text-center">
                <Routes>
                    <Route path="sites" element={<MakeSite {...{ sites, upSite }} />} />
                    <Route path="rooms" element={<MakeRoom {...{ sites, upSite }} />} />
                    <Route path="reservar" element={<Booking {...{ sites }} /> } />
                </Routes>
            </div>
        </div>
    )
}