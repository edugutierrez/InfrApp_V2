import { useEffect, useState } from "react";
import { Selector } from "../../components/Selector";
import { getDB } from "../../dbConnect";

export function MakeSite({ sites, upSite }){
    
    return (<form className="card text-center m-auto w-50 align-items-center pt-4" onSubmit={(e)=>upSite(e,'upSite')}>
                { sites ? <Selector values={Object.keys(sites)} name='site'/> : <></>}
                <input className="w-75" placeholder="alertas: mail1@mail&mail2@mail" required/>
                <input className="w-75" placeholder="telegram chat id" required/>
                <button className="btn btn-secondary m-3 w-25" type="submit" disabled={ sites ? false:true}>crear!</button>
    </form>)
}

export function MakeRoom({ sites, upSite }){

    const [ rooms, setRooms ] = useState(null)

    const onBlurSite = ( e )=>{
        if(!Object.keys(sites).includes(e.value)){
            e.value = ''; setRooms(null)
        }
        document.querySelector('[placeholder=oficina]').value = '';
        document.querySelector('[placeholder=puestos]').value = null
    }
    const onSelectSite = ({ value })=>{
        setRooms( Object.keys(sites[value].rooms ?? {}) )
    }
    
    return (   
        <form className="card text-center m-auto w-50 align-items-center pt-4" onSubmit={(e)=>upSite(e,'upRoom')}>
            { sites ? <Selector values={Object.keys(sites)} name='site' blur={onBlurSite} onSelect={onSelectSite}/> : <></>}
            { rooms ? <Selector values={rooms} name='oficina' /> : <>seleccione el site</>}
            <input className="w-25" type='number' placeholder="puestos" required/>
            <button className="btn btn-secondary m-3 w-25" type="submit">crear!</button>
        </form>)
}

export function Booking({ sites }){
    
    const [ rooms, setRooms ] = useState(null)
    const [ book, setBook ]   = useState(null)

    const onBlurSite = ( e )=>{
        if(!Object.keys(sites).includes(e.value)){
            e.value = ''; setRooms(null)
        }
    }
    const onSelectSite = ({ value })=>{
        setRooms( Object.keys(sites[value].rooms ?? {}) )
    }
    const onSelectRoom = function(){
        const [ site, room ] = ['site','room'].map( r=> document.querySelector(`[placeholder=${r}]`).value)
        getDB({ action: 'getBook', data:{ site, room }}).then( r => setBook(r) )
    }
    
    return(<div className="container w-100 text-center p-5">
                <div className="card bg-light align-items-center m-3" >
                    { sites ? <Selector values={Object.keys(sites)} name='site' blur={onBlurSite} onSelect={onSelectSite}/> : <></>}
                    { rooms ? <Selector values={rooms} name='room' onSelect={onSelectRoom}/> : <>seleccione el site</>}
                    <div className="row justify-content-center m-1 w-100 p-1">
                        {( book ?? []).map( (r, n)=>(
                            <form key={n} className="card col-md m-1 p-2">
                                <h6>{r.date}</h6>
                                { r.available ? <button type="submit" className="btn btn-info m-1">RESERVAR</button>:<div>COMPLETO</div>}
                            </form>
                        ))}
                    </div>
                </div>
        </div>)
}
