import { useState, useEffect } from 'react'
import './App.css'
import React from 'react';


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

        <div className="box">
        <button id="FilterLabel" onClick={toggleShowMore}>
        {showMore ? name : name}
        </button>

        {showMore && (
            <div className="FilterVeto">
              {values.map((value, index) => (
                <React.Fragment key={index}>
                <input type="checkbox" 
                name={name} 
                value={value} 
                id={`${name}-checkbox-${index}`}
                onChange = {() => handleCheckboxChange(value)}
                checked={selectedValues[value] || false} 
                />
                <label htmlFor={`${name}-checkbox-${index}`}>{value}</label>
                <br/>
             </React.Fragment>))}
      </div> 
    )} </div> </div>)

              }

export default FilterComponent;
