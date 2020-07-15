import React from 'react';

function Dropdown({data,title,filter,handleFilterChange}) {
  function itemGiver(item){
    if(item==="In-Progress") return false
    if(item==="Completed") return true
    return item
  }
    return (
      <div className="dropdown col-6 pt-4">
         <button 
         className="btn btn-secondary dropdown-toggle w-100 rounded-rounded" 
         type="button" id="dropdownMenuButton" style={{fontVariant:"small-caps"}}
         data-toggle="dropdown" aria-haspopup="true" 
         aria-expanded="false">
           {title} 
          </button>
        <div className="dropdown-menu m-0 p-0" aria-labelledby="dropdownMenuButton">
        <p className={`dropdown-item border m-0 p-2 ${filter[title]===""?"active":""}`} 
        key="All"
        onClick={()=>{handleFilterChange(title,"")}}>All</p>
          {data.map((item)=>
          <p className={`dropdown-item border m-0 p-2 ${filter[title]===itemGiver(item)?"active":""}`} 
          key={item} 
          onClick={()=>{handleFilterChange(title,itemGiver(item))}}>{item}</p>
          )}
        </div>
      </div>
    );
}

export default Dropdown;     
