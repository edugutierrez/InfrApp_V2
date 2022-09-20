import { useState } from "react";
import { useParams } from "react-router-dom";
import { getDB } from "../dbConnect";
import { Navigate } from "react-router-dom";

export function Register(){
    
    const [user, token] = useParams().id.split('&')
    const [alert, setAlert] = useState('')

    const upData = async function(e){
        e.preventDefault()
        const [{value: name}, {value: cel}, {value: pass}, {value: checkPass}] = e.target
        
        if(pass !== checkPass){
            setAlert("password d'ont match")
        }else{
            await getDB({action:'register', data:{ name, cel, pass }, user, token}).then(res =>{
                setAlert("login")  
            })
        }
    }
    
    if(alert === 'login'){ return (<Navigate to={'/login'}/>) }

    return (<div className="container w-50 text-center p-5">
                <form className='card bg-light align-items-center p-5 mt-5' onSubmit={upData}>
                    <img className="m-2" src='./img/ymk-logo.png' alt=''/>
                    <div className="m-4">
                    <input className="m-1 w-100" placeholder="nombre y apellido" minLength={10} required/>
                    <input className="m-1 w-100" type="number" placeholder="country code + phone nomber" minLength={10} required/>
                    <input className="m-1 w-100" type="password" placeholder="password" minLength={6} required/>
                    <input className="m-1 w-100" type="password" placeholder="confirm password" minLength={6} required/>
                    <span>{alert}</span>
                    </div>
                    <button className="btn btn-secondary m-2 w-25" type="submit">confirmar!</button>
                </form>
            </div>)
}