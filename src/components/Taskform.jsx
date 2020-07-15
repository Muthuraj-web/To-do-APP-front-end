import React from 'react';
import Input from './common/Input'
import '../index.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes,faToggleOn, faToggleOff} from '@fortawesome/free-solid-svg-icons'

function Taskform({form,handleNewTaskUpdate,handleNewTaskSubmit,handleToggle,handleNewTaskDelete}){
        return(            
                <div className="shadow rounded">
                {form.map(item=>
                    <form className="border p-3 mb-2 shadow" key={item.id}  style={{position:"relative"}} onSubmit={(e)=>{handleNewTaskSubmit(e,item)}}>
                        <Input item={item} title="task" placeholder={"task"} handleNewTaskUpdate={handleNewTaskUpdate}/>
                        <Input item={item} title="due" placeholder={"due"} handleNewTaskUpdate={handleNewTaskUpdate}/>
                        <Input item={item} title="label" placeholder={"label"} handleNewTaskUpdate={handleNewTaskUpdate}/>
                        <p>Mark as Important
                            {item.important?
                            <FontAwesomeIcon className="ml-3 cursor" icon={faToggleOn} onClick={()=>{handleToggle("important",item,"form")}}></FontAwesomeIcon>:
                            <FontAwesomeIcon className="ml-3 cursor" icon={faToggleOff} onClick={()=>{handleToggle("important",item,"form")}}></FontAwesomeIcon>}
                        </p>
                        <button className="btn btn-primary" disabled={Object.keys(item.errors).length===0?false:true}>Add</button>
                        <FontAwesomeIcon 
                        icon={faTimes} className="x cursor"
                        onClick={()=>{handleNewTaskDelete(item)}}>
                        </FontAwesomeIcon>
                    </form>)}
            </div>
        )
    }

export default Taskform;