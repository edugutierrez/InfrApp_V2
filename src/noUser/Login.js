import { getDB } from "../dbConnect";

export function LogIn( { setLog } ){

    const validate = async function (e){

        e.preventDefault()
        const [ {value: user }, {value: pass}] = e.target
        
        await getDB({action:'login',data:{user,pass},user:'',token:''}).then( function( res ){
            if( res ){
                localStorage.user = JSON.stringify( res );
                setLog( res );
            }
        })
    }

    return (<div className="container w-50 text-center p-5">
                <form className='card bg-light align-items-center p-5 mt-5' onSubmit={validate}>
                    <img className="m-4" src='./img/logo.png' alt=''/>
                    <div className="m-4">
                        <input className="m-1 w-100" placeholder="user" type="email" required/>
                        <input className="m-1 w-100" type="password" placeholder="password" minLength={5} required/>
                    </div>
                    <button className="btn btn-secondary m-2 w-25 mb-4" type="submit">log in!</button>
                </form>
            </div>)

}