import { useState, useEffect } from 'react'
import './App.css'
import React from 'react';


const FilterComponent = ({ name, values, img }) => {
  const toggleShowMore = () => {
    setShowMore(!showMore);
    };
  const [showMore, setShowMore] = useState(false)

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
                
                <>
                <input type="checkbox" name={name} value={value} id={index} />
                <label for={index}>{value}</label>
                <br></br></>
            ))}

            </div>
          )}
        
  </div>   
      </div>         
    );
  }

export default FilterComponent;
