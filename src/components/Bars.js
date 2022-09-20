import { Link } from 'react-router-dom';

export function SideBar({ nav, title, titlePath, second, secondPath }) {

    const Element= ({ keys, values }) =>(
        <li className='dropend w-100'>
            <a href="/" class="nav-link py-3 border-bottom myToolTip" data-bs-toggle="dropdown" >
                 { <i className={`far fa-${values.icon} fa-xl m-1 nav-link py-3 a`}/> }
                <span class="tooltiptext">{keys}</span>
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {values.list.map((r, n) => (
                        <li className='dropdown-item' key={n}>
                            <Link className='nav-link' to={`${keys}/${r}`.replace(/ /g, '-')}>{r}</Link>
                        </li>
                    ))}
            </ul>
        </li>
    )
        
    return(<>
        <div className="d-flex flex-column flex-shrink-0 bg-light text-center" style={{ width: '6rem', height: '100vh' }}>
            <Link to={titlePath} style={{ textDecoration: 'none' }} ><h3 className="navbar-brand m-3 border-bottom a">{title}</h3></Link>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                { nav.map( (r,key)=> <Element {...{ key, keys: Object.keys(r)[0], values: Object.values(r)[0] ?? null }} />)}
                { second ? <a href="/" className='mt-5'><Link to={secondPath} className='a'>{second}</Link></a> : '' }
            </ul>
        </div>
        <div class="b-example-divider"></div>
    </>)

}