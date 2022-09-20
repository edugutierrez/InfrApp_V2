import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { LogIn } from './noUser/Login';
import { Home } from './user/Home';

import { Register } from './noUser/Register';
import { LogOut } from './noUser/LogOut';

import './GlobalStyle.css'

export default function App(){
    
    const [ log, setLog ]    = useState( localStorage.user ? JSON.parse(localStorage.user) : null );
    
    return(
        <Routes>
            <Route path='/logout' element={ <LogOut {...{setLog}}/> } />
            <Route path='/login' element={ log ? <Navigate to='/home'/> : <LogIn {...{setLog} } /> }/>
            <Route path='/register/:id' element={ <Register /> }/>
            <Route path='/ticketclient/:id' element={ <Register /> }/>
            <Route path='/home/*' element={ log ? <Home {...{ log, setLog }}/> : <Navigate to='/login'/> } />
            <Route path='*' element={ log ? <Navigate to='/home'/> : <Navigate to='/login'/> } />
        </Routes>)

}