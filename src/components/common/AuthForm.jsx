import React from 'react';
import Input from './Input';

function AuthForm(props) {
    let width=""
    if(window.innerWidth>=576) width = "w-25"
    else width = "w-75"
    let copy=[...Object.keys(props.item)]
    copy = copy.filter(each=>(each!=="errors" && each!=="credentialError"))
    return (
        <div className={`container ${width}`}>
            {props.item.credentialError && <p className="error-alert rounded p-2 w-100">{props.item.credentialError}</p>}
            <form onSubmit={(e)=>{e.preventDefault();props.handleSubmit(props.item,props.active)}}>
                {copy.map((each)=>
                <Input
                key={each} 
                title={each} 
                placeholder={each} 
                item={props.item} 
                handleNewTaskUpdate={props.handleNewTaskUpdate}
                stateObj={props.active}
                />)}
                <button type="submit" className="btn btn-dark" disabled={Object.keys(props.item.errors).length===0?false:true}>Submit</button>
            </form>
        </div>
    );
}

export default AuthForm;