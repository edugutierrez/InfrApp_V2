import React, {useEffect, useState} from "react";

export function Selector({ name, values, onSelect, blur, style }){
    
    const [list, setList ]  = useState(null)
    useEffect(()=>{
        setList(values)
    },[values])
    
        
    const selection  = function ({target:{innerHTML}}){
        document.querySelector(`[placeholder=${name}]`).value = innerHTML
        if(onSelect){onSelect(document.querySelector(`[placeholder=${name}]`))}
    }
    const onChange = function({ target }){
        setList(values.filter(r=>r.includes(target.value)))
    }
    const onBlur = function({ target }){
        if(blur){blur(document.querySelector(`[placeholder=${name}]`))}
    }
    
    return(<div className="dropdown w-100">
            <input type='text' placeholder={name} data-bs-toggle="dropdown" className="w-75 upper" {...{onChange, onBlur, style}} required/>
            <ul className="dropdown-menu text-center w-75">
                {(list ?? []).map((r,n)=>(
                    <li key={n} onClick={selection}><p>{r}</p></li>
                ))}
            </ul>
        </div>)
        
}