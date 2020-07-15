import React from 'react';
import "../../index.css"

function Addfilter(props) {
    return (
        <button className="btn btn-warning add-task rounded-circle" 
        style={{boxShadow:"1px 2px 20px"}} onClick={props.handleNewTask}> 
        <h2 className="p-0 m-0">+</h2>
        </button> 
    );
}

export default Addfilter;