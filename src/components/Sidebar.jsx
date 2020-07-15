import React from 'react';
import Dropdown from './common/Dropdown'

function Sidebar({label,status,filter,handleFilterChange}) {
    return (
      <React.Fragment>
      <p className="mt-sm-4 mb-sm-4">Filter By</p>
      <div className="row">
          <Dropdown title="status" data={status} handleFilterChange={handleFilterChange} filter={filter}/>
          <Dropdown title="label" data={label} handleFilterChange={handleFilterChange} filter={filter}/>
      </div>
      </React.Fragment>
    );
}

export default Sidebar;