import { useEffect, useState } from "react"

export function Table({ head, title, arrays, notSearch }, timer ) {
    
    const [ dataTable, setDataTable ]  = useState(null)

    useEffect( ()=>{ onChange() },[arrays])
    
    const onChange = async(e)=>{
        clearTimeout(timer)
        timer = setTimeout(async () => {
            const values = Object.fromEntries([...document.querySelectorAll('thead tr th input')].map(r => [r.placeholder, r.value.toLowerCase()]))
            const data   = arrays.filter(res => {
                const control = Object.entries(values).map(([key, value]) => {
                    return (res?.[key]?.toString() ?? '').toLowerCase().includes(value)
                })
                return !control.includes(false)
            })
            setDataTable([...data])
        }, 300)
    }
    
    return (<div>
        <h4 className="bg-white w-100 text-center a" style={{position: 'sticky', top: '0'}}>{title}</h4>
        <table className="table table-striped table-responsive table-condensed">
            <thead style={{ position: 'sticky', top: '3%' }} className='bg-white'>
                <tr {...{onChange}}>
                    {Object.entries(head).map(([key, value], n) => 
                        <th key={n}>
                            <input className="border-bottom" placeholder={key} style={value.style} disabled={notSearch}/>
                        </th>
                    )}
                </tr>
            </thead>
            {<tbody>
                {   dataTable?.length ?
                    dataTable.map( (res, n) =>(
                        <tr key={n}>
                            {Object.entries(head).map(([key, value], i) =>
                                <td key={i} style={ value.tdStyle ?? {} }>
                                    { value?.action?.(res) ?? <small>{res[key]}</small> }
                                </td>
                            )}
                        </tr>
                    )) :
                    <td colSpan={ Object.keys(head).length }><h4 className="bg-white w-100 text-center a">SIN DATOS</h4></td>
                }
            </tbody>}
        </table>
    </div>
    )
}