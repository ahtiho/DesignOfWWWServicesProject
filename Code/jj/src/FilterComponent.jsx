import { useState, useEffect } from 'react'
import './App.css'
import React from 'react';
import nuoli from "/src/photos/nuoli.png"


const FilterComponent = ({ name, values, img, onFilterChange }) => {
  
  const [showMore, setShowMore] = useState(false)
  const [selectedValues, setSelectedValues] = useState({});

  const toggleShowMore = () => {
    setShowMore(!showMore);
    };

  const handleCheckboxChange = (value) => {
    setSelectedValues((prev) => {
      const newSelection = {
        ...prev,
        [value]: !prev[value],
      };
      onFilterChange(name, Object.keys(newSelection).filter(key => newSelection[key]));
      return newSelection;
    }
    )
  }

  return (
      <div className = "FilterSection">
        <div className="image">
          <img src={img} alt="Image" />
        </div>

        <div className="FBox">
        <button id="FilterLabel" onClick={toggleShowMore}>
        <div>{name}</div><div id="dropdownNuoli">
          <img src={nuoli} alt="arrow-down"  />
        </div>
        </button>

        {showMore && (
            <div className="FilterVeto">
              {values.map((value, index) => (
                <React.Fragment key={index}>
                <span className="checkboxHide">
                <input type="checkbox"
                
                name={name} 
                value={value} 
                id={`${name}-checkbox-${index}`}
                onChange = {() => handleCheckboxChange(value)}
                checked={selectedValues[value] || false}
                /></span>
                <label htmlFor={`${name}-checkbox-${index}`} className="checkboxText">{value}</label>
                <br/>
             </React.Fragment>))}
      </div> 
    )} </div> </div>)

              }

export default FilterComponent;
