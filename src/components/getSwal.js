import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

export async function getSwal( { options, file, open }, response){

    const mySwal     = withReactContent(Swal)

    function getResponse( e ){
        e.preventDefault()
        response = {}
        e.target.childNodes.forEach(r=>{
            if( r.name ){ response[r.name] = r.value }
        })
        document.getElementById('moreData').childNodes.forEach(r=>{
            if(r.name ){ response[r.name] = r.value }
        })
        Swal.close()
    }
    const getImage = async function( e ){
        const input = Object.assign( document.createElement('input'), { type: 'file' } )
        input.addEventListener('change',async function(){
            e.target.src  = window.URL.createObjectURL(this.files[0])
            const canvas  = Object.assign( document.createElement('canvas') ,{ width: 500, height: 500 })
            setTimeout(()=>{
                canvas.getContext('2d').drawImage(e.target,0,0,500,500)
                e.target.value = canvas.toDataURL('image/jpeg').replace(/^data:(.*;base64,)?/, '')
            },1000)
        })
        input.click()
    }

    const html = 
        (<form name="myForm" onSubmit={getResponse}>
            { options }
            { file ?  <img name='img' alt='' onClick={getImage} src="/img/camera.jpg" style={{width:'15%', margin:'5%'}}/>:<></>}
            <textarea name="obs" style={{height:'15vh',width:'75%', margin:'2%'}} placeholder='detalles' required></textarea>
            <br/><button className="m-4 btn btn-primary" type="submit">enviar</button>
        </form>)

    await mySwal.fire({ html, confirmButtonText:'vamos!', showCloseButton: true, showConfirmButton: false, didOpen:()=>open({target:{value:null}}) })
    return response
}

/* export async function getSwal({title, select, input, file, obs, moreData}, response){
    
    const mySwal     = withReactContent(Swal)
    
    const getImage = async function( e ){
        const input = Object.assign( document.createElement('input'), { type: 'file' } )
        input.addEventListener('change',async function(){
            e.target.src  = window.URL.createObjectURL(this.files[0])
            const canvas  = Object.assign( document.createElement('canvas') ,{ width: 500, height: 500 })
            setTimeout(()=>{
                canvas.getContext('2d').drawImage(e.target,0,0,500,500)
                e.target.value = canvas.toDataURL('image/jpeg').replace(/^data:(.*;base64,)?/, '')
            },1000)
        })
        input.click()
    }

    const html = (<form name="myForm" onSubmit={getResponse}>
        <button className="m-3 btn upper"  disabled>{title}</button>
        { select.map(( { values, name, onChange, onDefault }, key )=>(
            <select className="m-1" disabled={ values?.length === 1 ?? false} {...{name, onChange, key}}>
                {(values).map((r,n)=>(<option selected={ r === onDefault ?? false }>{r}</option>))}
            </select>
        )) }
        { Object.values( input ?? {} ).filter( r => r.name ).map( ({name, type, onDefault }, i) => (
            <input {...{name, type, placeholder:name, value:onDefault, disabled:onDefault? true:false }} className='m-3' required />
        ) ) }
        <><br/>{ file ? <img name='img' alt='' onClick={getImage} src="/img/camera.jpg" style={{width:'15%', margin:'5%'}}/>:<></>}</>
        <div id="moreData">
            {moreData ? moreData.map( ({ values }) => <>{values}<br/></> ?? <></>) : <></>}
        </div>
        {obs? <textarea name="obs" style={{height:'15vh',width:'75%', margin:'2%'}} placeholder='detalles' required></textarea>:<></> }
        <br/><button className="m-4 btn btn-primary" type="submit">enviar</button>
    </form>)

    function getResponse( e ){
        e.preventDefault()
        response = {}
        e.target.childNodes.forEach(r=>{
            if( r.name ){ response[r.name] = r.value }
        })
        document.getElementById('moreData').childNodes.forEach(r=>{
            if(r.name ){ response[r.name] = r.value }
        })
        Swal.close()
    }

    await mySwal.fire({html, confirmButtonText:'vamos!', showCloseButton: true, showConfirmButton: false})
    return response

} */