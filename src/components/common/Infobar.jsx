import React from 'react';
import { faCheckCircle, faCalendarAlt, faCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../../index.css'


function Infobar({item,handleToggle}) {
    const {task,status,due,created,important,label} = item

    const handleNew=(date)=>{
        const c= new Date()
        if(c.getDate()===created.dd && c.getMonth()===(created.mm-1) && c.getFullYear()===created.yy){
            return <small><mark className="text-light bg-info rounded-pill pb-1 pl-2 pr-2 ml-2">new</mark></small>
        }

    }

    const handleImportant =(impt)=>{

        return <FontAwesomeIcon icon={faStar}  
        className={`ml-2 cursor text-${impt?"warning":"lightgray"}`} 
        onClick={()=>{handleToggle("important",item,"data")}} />    
    }
    
    return (
        <React.Fragment>
            <div className="col p-0 m-0 m">

                <FontAwesomeIcon 
                className={`text-light m-0 p-0 mt-1 text-light cursor ${status?"":"border border-dark rounded-circle"}`} 
                icon={status?faCheckCircle:faCircle} 
                onClick={()=>{handleToggle("status",item,"data")}} />

            </div>
            <div className="col-11 m-0 p-0 pl-3">
                <h6 style={{fontSize:"16px"}}>{task}{handleNew(created)}{handleImportant(important)}</h6>
                  <FontAwesomeIcon className="text-dark m-0 p-0" icon={faCalendarAlt} />
                  <small className="ml-1 mr-2 courier">{due.dd}-{due.mm}-{due.yy}
                  <mark className="pb-1 pl-2 pr-2 ml-3 border rounded-pill">{label}</mark></small>
            </div>
        </React.Fragment>
    );
}

export default Infobar;

