import { useEffect, useState } from "react"

import { getDB } from "../../dbConnect"
import { Selector } from "../../components/Selector"
import { Table } from "../../components/Table"


export function IotDash(){

    const [ config, setConfig ] = useState(null);
    const [ allDevices, setAllDevices ] = useState(null);
    const [ myDevice, setMyDevice ] = useState(null);

    useEffect(()=>{ getDB({ action:'iot', data:{ action: 'getCfg'} }).then( r=> setConfig(r) ) },[])

    const thisTime = (e) => new Date( e * 60000 ).toLocaleString('es-AR', { timeZone: 'UTC' }).split(' ')[1]
    const head = {
        device: {},
        config:{
            action: (e)=> <select name="config">{ config.actions.map( r => <option selected={ r === e.config} >{r}</option> )}</select>
        },
        on:{
            action: (e)=> <input name="on" type="time" value={thisTime(e.on)}/>
        },
        off:{
            action: (e)=> <input name="off" type="time" value={thisTime(e.off)}/>
        },
        days:{
            action: ({days})=> <div name="days" >{['D','L','M','X','J','V','S'].map(( r, n )=> (
                <small className={days[n] === 's' ? 'click':'unClick'} onClick={(e)=> e.target.className = e.target.className != 'click' ? 'click':'unClick'}> {r} </small>
                )) }</div>
        }
    }

    const onSelect = function({value}){ setAllDevices( config.sites[value].devices ) }
    const selectDevice = function({ value }){
        setMyDevice(null)
        getDB({ action:'iot', data:{ action: 'getMyDevice', device: value } }).then( r => {
            r. devices = r.devices.map( ( e, n ) => ( {...e, device: `dev ${n}` } ) )
            setMyDevice( r );
        })
    }
    const onClick = function(){
        const site = document.querySelector(`[placeholder=site]`).value;
        const device = document.querySelector(`[placeholder=device]`).value;

        const getMinutes = ([hour,minutes])=> ( hour * 60 ) + parseInt(minutes)
        const settings = {
            tipo: document.getElementById(`tipo`).value,
            devices: [...document.querySelectorAll(`[name=config]`)].map( ( r, n)=>{
                const config = document.querySelectorAll(`[name=config]`)[n].value;
                const on = getMinutes( document.querySelectorAll(`[name=on]`)[n].value.split(':') );
                let off = getMinutes( document.querySelectorAll(`[name=off]`)[n].value.split(':') );
                off = off > on ? off : 1440 + off
                const days = [...document.querySelectorAll(`[name=days]`)[n].children].map( e => e.className === 'click' ? 's':'n').join('')
                return { config, on, off, days}
            })
        }
        getDB({ action:'iot', data:{ action: 'setDevice', device, site, settings}})
        console.log(settings.devices)
    }
  
    return(
    <div className="container w-100 text-center p-5">
        <div className="card bg-light align-items-center m-3 p-4" >
            { config ? <Selector values={Object.keys(config.sites)} name='site' {...{onSelect, style:{textTransform: 'uppercase'} }} /> :<></>}
            { allDevices ? <Selector values={Object.keys(allDevices)} name='device' onSelect={ selectDevice }/> : <>Seleccione el Site</> }
            { !myDevice ? <></>:<>
                <select onSelect={selectDevice} id="tipo" className="m-3 w-25">{config.types.map( (r, n) => <option key={n} selected={ r === myDevice.tipo }>{r}</option>)}</select>
                <Table {...{ arrays: myDevice.devices, head, notSearch:true }}/>
            <button {...{onClick}} className="btn btn-secondary m-4 w-25 mb-4">guardar!</button>
            </>}

        </div>
    </div>
    )
    
}