import React from 'react';
import Infobar from './common/Infobar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../index.css'

function Tasklist({data,stateDataLength,handleImportantToggle,handleDeleteTask,handleToggle}){
    
    const handleAlert=(due,status)=>{
        const c= new Date()
        if(c.getDate()===due.dd && c.getMonth()===(due.mm-1) && c.getFullYear()===due.yy && !status){
            return "alert"
        }
        else{
            if(status) return "bg bg-success"
            else return ""            
        }
    }

        return (
            <div> 
                <p>Showing {data.length} results of {stateDataLength}</p>
                {data.map((item)=>
                <div className={`border row shadow rounded position-relative p-3 m-0 mb-1 ${handleAlert(item.due,item.status)}`} 
                key={item._id}>
                            <Infobar 
                            item={item}
                            handleToggle={handleToggle}
                            handleImportantToggle={handleImportantToggle}/>
                            <FontAwesomeIcon icon={faTimes} className="x cursor" 
                            onClick={()=>{handleDeleteTask(item)}}/>
                </div>)}
            </div>
        );
}
export default Tasklist;