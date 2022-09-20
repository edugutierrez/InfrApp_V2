import { createContext, useContext, useState } from "react";

import Localbase from 'localbase'
const myLocalBase = new Localbase('db')

const TaskContext = createContext({});

export const useTasks = () => useContext(TaskContext)

export const TasksProvider = ({children}) => {
    
    const [tasks, setTasks] = useState({});
    
    const getTask = async ()=>{
        const col = await myLocalBase.collection('cfg')
        return col
    }

    const upTask = async ({col, doc})=>{

    }

    return (
        <TaskContext.Provider value={ { tasks, upTask, getTask } }>
            {children}
        </TaskContext.Provider>
    );
}

/* export const TasksProvider = ({ children }) => {
    
    const [tasks, setTasks] = useState({});

    const upTasks = (data) => {
        
        const thisObject = tasks;
        Object.entries(data).forEach(( [key, value] )=>{
            thisObject[key] = value
        })
        
        setTasks({...thisObject})
    }
    
    return (
        <TaskContext.Provider value={ { tasks, upTasks } }>
            {children}
        </TaskContext.Provider>
    );
}; */