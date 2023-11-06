import { useState } from 'react'
import './App.css'
import React from 'react';


const Dropdown = ({ name, values, img }) => {
    return (
      <div className = "container">
        <div className="image">
          <img src={img} alt="Image" />
        </div>
        <div className="box">
          <select>
           <option value="" disabled selected>{name}</option>
            {values.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>            
    );
  }

export default Dropdown;
