import { useState, useEffect, useRef } from 'react'
import './App.css'
import React from 'react';
import nuoli from "/src/photos/nuoli.png"
import ClickOutside from './ClickOutside';

// Individual filter component which is called from App.jsx

const FilterComponent = ({ name, values, img, onFilterChange, includeSearchBar, filters}) => {
  
  const [showMore, setShowMore] = useState(false)
  const [selectedValues, setSelectedValues] = useState({});
  const [searchTerm, setSearchTerm] = useState("");  // hakupalkin teksti


  const toggleShowMore = () => {
    setShowMore(!showMore);
    };

    const isFilterActive = (name) => {
      return filters[name] && filters[name].length > 0;
  };  

  const handleCheckboxChange = (value) => {
    setSelectedValues((prev) => {
      const newSelection = {
        ...prev,
        [value]: !prev[value],
      };
      onFilterChange(name, Object.keys(newSelection).filter(key => newSelection[key]));
      return newSelection;
    });
  }

  // --------------- ok jutut

  const [open, setOpen] = useState(false);

 let menuRef = useRef();

  if (includeSearchBar) {
  const filteredValues = values.filter((value) => 
    value.toLowerCase().includes(searchTerm.toLowerCase()))
  };

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
    <div className = "container">
      <div className="image">
        <img src={img} alt="Image" />
      </div>

      <div className="FBox" ref={menuRef}>
          <div className="app-dropdown">
          <button className={`FilterLabel ${isFilterActive([name]) ? 'active-filter' : ''}`} onClick={()=>{setOpen(!open)}}>
          <div>{name === "Gpa" ? 'GPA': name}</div><div id="dropdownNuoli">
          
            <img src={nuoli} alt="arrow-down"  />
          </div>
          </button>
          </div>
        {/* Searchbar */}
        {includeSearchBar && (
        <input 
          type="text" 
          placeholder={`Search in ${name}`} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-search-input"
        />
      )}

      <div className={`FilterVeto ${open ? 'active' : 'inactive'}`}>
            {values.map((value, index) => (
              <React.Fragment key={index}>
              <span className="checkboxHide">
              <input 
              type="checkbox"
              name={name} 
              value={value} 
              id={`${name}-checkbox-${index}`}
              onChange = {() => handleCheckboxChange(value)}
              checked={selectedValues[value] || false}
              /></span>
              <label htmlFor={`${name}-checkbox-${index}`} className="checkboxText">
                {value === 1 ? '1 (lowest)' : value === 5 ? '5 (highest)' : value}</label>
              <br/>
           </React.Fragment>))}
      </div> {/* FilterVeto päättyy tähän */}

   {/* showmore päättyy tähän */}


  </div> {/* FBox päättyy tähän */}
  </div> // FilterSection päättyy tähän
  
  )} // koko const + return() päättyy tähän
      
    

export default FilterComponent;
