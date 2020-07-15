import React from 'react';

function Input(props) {
    let {title,item,placeholder,handleNewTaskUpdate,stateObj} = props
    if(!stateObj) stateObj=item

    return (
        <div className="form-group">
            <h6 htmlFor={title} style={{fontVariant:"small-caps"}}>{title}</h6>
            <input type={title!=="email" && title!=="password" ? "text":title} name={title} 
            className="form-control w-100"
            value={item[title]}
            placeholder={placeholder} 
            onChange={(e)=>{if(item)handleNewTaskUpdate(e,stateObj); else handleNewTaskUpdate(e)}}/>
            {item.errors[title] && <small className="pt-2 pb-1 text-danger">{item.errors[title]}</small>}
        </div>
    );
}

export default Input;
