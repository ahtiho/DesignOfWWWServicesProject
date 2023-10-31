import { useState } from 'react'
import './App.css'
import React from 'react';


const Dropdown2 = ({ name, values, img }) => {
    return (
      <div className = "container">
        <div className="image">
          <img src={img} alt="Image" />
        </div>

        <div className="box">
        <form>
            <select name="select" multiple className="multiselect" multiselect-search="true" multiselect-select-all="true" multiselect-max-items="10">
        <option value="" disabled selected>{name}</option>
        {values.map((value, index) => (
          value == name ? <option key={index} disabled>{value}</option> :
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
         
         {/*} <select name="select" multiple className="multiselect" multiselect-search="true" multiselect-select-all="true" multiselect-max-items="10">
          <option value="" disabled selected>{name}</option>
            {values.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
            </select> */}
        </form>

            {/*}
          <select>
           <option value="" disabled selected>{name}</option>
            {values.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
            </select> */}
        </div>
      </div>            
    );
  }

export default Dropdown2;

<div>
<form>
  <select name="select" multiple className="multiselect" multiselect-search="true" multiselect-select-all="true" multiselect-max-items="1">
    {/*<option>First</option>
    <option>Second</option>
    <option>Third</option>*/}
    
  </select>
</form>
</div>
