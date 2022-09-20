import Swal from "sweetalert2";

import Localbase from 'localbase'
const myLocalBase = new Localbase('db')
myLocalBase.config.debug = false

export async function getDB( { action, data, mix } ){

    const url = 'https://script.google.com/macros/s/AKfycby0g022WX5HHM62L_aWpgwhHzMJdzMz0GvupwSdi5B2qvoG6FxuA3-9ZJN6HL0UEtmS9w/exec';
    const { user, token } = JSON.parse(localStorage.user ?? '{}')
    
    const body = JSON.stringify({ action, data, user, token })
    console.log(body)
    Swal.fire({
        title: mix ? '':`... ${ action } ...`,
        allowOutsideClick: false,
        icon: 'question',
        toast: mix ?? false,
        showConfirmButton: false,
        position: mix ? 'top-end':'center',
        width: mix ? 100 : 300
    })
    Swal.showLoading();
    
    const res = await fetch(url, {  credentials: 'same-origin', method: 'POST', body, headers: { 'Content-Type': 'text/plain;charset=utf-8'}})
                        .then(r => r.json())
                        .then(r => r )
    
    Swal.fire(Object.assign({showConfirmButton: false, toast: mix ?? false, timer:1000, position:'top-end', width: mix ? 100 : 300 },res.swal))

    if(res.swal.title !== 'error de validacion'){
        return res.data
    } else {
        //Swal.fire(res.swal).then(()=>window.location.href = 'http://localhost:3000/logout')
    }
}

export async function getLocalDB({ col, doc }){
    return await myLocalBase.collection(col).doc(doc).get()
}

export async function setLocalDB({ col, docs }){
    Object.entries(docs).forEach(([key, values])=>{
        const data = values.length ? {values} : values
        myLocalBase.collection(col).doc(key).set(data)
    })
}

