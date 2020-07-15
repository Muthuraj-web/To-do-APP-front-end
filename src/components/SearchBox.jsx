import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import '../index.css'

function SearchBox(props) {
    return (
        <div className="row p-0 m-0 mt-2">
            <div className="col-sm-9 col-7 p-0 m-0">
                <form>
                    <div className="form-group">
                        <input className="form-control shadow rounded-0" value={props.search} 
                        placeholder="search..." 
                        onChange={(e)=>{props.handleSearchUpdate(e)}} autoFocus></input>                    
                    </div> 
                </form>
            </div>
            <div className="col-sm-3 col-5 m-0 p-0 position-relative" >
               <div className="position-absolute mt-2" style={{right:"0px"}} >
                   {props.important===""? 
                   <h6 className="sc">Important <FontAwesomeIcon className="cursor" icon={faToggleOff} onClick={()=>{props.handleFilterChange('important',true)}}/></h6>:
                   <h6 className="sc">Important <FontAwesomeIcon className="cursor" icon={faToggleOn} onClick={()=>{props.handleFilterChange('important',"")}}/></h6>
                   }
               </div>
            </div>
        </div>
    );
}

export default SearchBox;
