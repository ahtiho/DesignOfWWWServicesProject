import { useState, useEffect, useRef } from 'react'
import './App.css'
import React from 'react';
import nuoli from "/src/photos/nuoli.png"
import ClickOutside from './ClickOutside';


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

  // --------------- ok jutut

  const [open, setOpen] = useState(false);

 let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }
      
    };
    document.addEventListener("mousedown", handler);

    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });

  // return -------------------------------------------->
  return (
    <div className = "FilterSection">
      <div className="image">
        <img src={img} alt="Image" />
      </div>

      <div className="FBox" ref={menuRef}>
          <button id="FilterLabel" onClick={()=>{setOpen(!open)}}>
          <div>{name}</div><div id="dropdownNuoli">
            <img src={nuoli} alt="arrow-down"  />
          </div>
          </button>

      <div className={`FilterVeto ${open ? 'active' : 'inactive'}`}>
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
      </div> {/* FilterVeto päättyy tähän */}

   {/* showmore päättyy tähän */}


  </div> {/* FBox päättyy tähän */}
  </div> // FilterSection päättyy tähän
  
  )} // koko const + return() päättyy tähän
      
    

export default FilterComponent;
