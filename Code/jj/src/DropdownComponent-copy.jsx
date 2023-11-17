import { useState } from 'react'
import './ilmoncss.css'
import React from 'react';
import MultiselectDropdown from './MultiCheckboxDropdown';

<MultiselectDropdown options="" title="Moi"/>

const Dropdown2 = ({ name, values, img }) => {
    return (
      <div className = "container">
        <div className="image">
          <img src={img} alt="Image" />
        </div>

        <div className="box">
        <p>{name}</p>

        {/* tee tähän kaks eri polkuu riippuen halutaaks multiselect-search vai ei */}
        <form>
            <select name="select" multiple  className="multiselect" multiselect-search="true" multiselect-select-all="true">
              
        
        {/* <option value=""  disabled="disabled">{name}</option> */}
        
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
