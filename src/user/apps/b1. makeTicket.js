import { getSwal } from "../../components/getSwal";
import { getLocalDB, getDB, setLocalDB } from "../../dbConnect";

export async function makeTicket({ e, user, perfil, setArrays }){
    console.log(perfil)
    const sites  = Object.keys(await getLocalDB({ col:'cfg', doc:'sites'}))
    const mySite = JSON.parse(localStorage.user).mySite
    const { tickets:{ actions, lists } } = await getLocalDB({ col: 'cfg', doc: 'apps' })

    const changeCat = function( {target:{value}} ){
        document.getElementById('moreData').innerHTML = ''
        document.querySelector('select[name=sub]').innerHTML = Object.keys(lists[value]).map(r=>`<option>${r}</option>`)
    }
    const changeSub = async function( {target:{value}} ){
        
        const [ cat, site ] = ['cat','site'].map( r => document.querySelector(`select[name=${r}]`).value )
        const qr = lists[cat][value]?.qr || e.qr ? (await getLocalDB({ col:'apps' , doc:'monitoreo'})).values : null
        
        document.getElementById('moreData').innerHTML = !qr ? '' :
            `<select name= "qr" class="m-2" ${ e.qr ? 'disabled':'' }>
                ${qr.filter( r => r.site === site).map( r => `<option ${ r.id === e.qr ? 'selected' : ''}>${r.id}</option>`)}
            </select><br/>
            <select name='op' className="m-1" >
                ${ ['OPERATIVO','OUT SERVICE'].map( r => `<option>${r}</option>`) }
            </select>`;

    }
    
    const options = [
        <button className="m-3 btn upper"  disabled>{ `GESTION DE TICKET ${ e?.id ?? e?.qr ?? '' }` }</button>,
        <select name='action' className="m-1" disabled={ actions[e.progress].length === 1 }>
            { ( actions[e.progress]  ).map( (r,n)=>(<option selected={ r === mySite } >{r}</option>) ) }
        </select>,
        <select name='site' className="m-1" disabled={ e.site ? true : false }>
            { ( e.site ? [e.site] : sites  ).map( (r,n)=>(<option selected={ r === mySite } >{r}</option>) ) }
        </select>,
        <select name='cat' className="m-1" disabled={ e.cat ? true : false } onChange={changeCat}>
            { ( e.cat ? [e.cat] : Object.keys( lists ) ).map( (r,n)=>(<option >{r}</option>) ) }
        </select>,
        <select name='sub' className="m-1" disabled={ e.sub ? true : false } onChange={changeSub}>
            { ( e.sub ? [e.sub] : Object.keys( lists[ e.cat ?? Object.keys(lists)[0] ] ) ).map( (r,n)=>(<option >{r}</option>) ) }
        </select>,
        perfil === 'user' ? <input name='time' type='number' placeholder="time" required/> : <></> ,
        <div id='moreData'></div>,
    ]
    
    await getSwal( { options, file:'jpg', open:changeSub } ).then( ({ site, cat, sub, qr, op, time, action, file, obs }) =>{
        const data = { data: { site, cat, sub, qr, op, id: e.id, time}, log: { action, file, obs, user} }
        getDB({action:'upTicket', data }).then( ({ tickets }) =>{ 
            setLocalDB({ col:'apps', docs:{ tickets } })
            if(setArrays){ setArrays( tickets ) }
        })
    })
     
}
