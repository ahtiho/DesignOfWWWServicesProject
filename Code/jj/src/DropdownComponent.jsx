import { useState } from 'react'
import './App.css'
import React from 'react';


const Dropdown = ({ name, values, img }) => {
    return (
      <div className = "container">
        <div className="image">
          <img src={img} alt="Image" />
        </div>
        <div className="Fbox">
          <select>
           <button value="" disabled selected>{name}</button>
            {values.map((value, index) => (
              <button key={index} value={value}>
                {value}
              </button>
            ))}
          </select>
        </div>
      </div>            
    );
  }

export default Dropdown;
