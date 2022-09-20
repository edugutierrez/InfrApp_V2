import { Navigate } from "react-router-dom";

export function LogOut({ setLog}){
    localStorage.clear()
    setLog(null)
    return(<Navigate to="/login"/>)
}