import { useState, useEffect } from 'react'
import './App.css'

import imageCountry from "/src/photos/country_icon.png"
import imageGpa from "/src/photos/gpa-icon.png"
import imageLevel from "/src/photos/level-icon.png"
import imageRegion from "/src/photos/region-icon.png"
import imageSafety from "/src/photos/safety-icon.png"
import imageLang from "/src/photos/study-language-icon.png"
import imageSearch from "/src/photos/text-search-icon.png"
import imagePop from "/src/photos/population-icon.png"
import imageDates from "/src/photos/dates-icon.png"
import imagePrice from "/src/photos/price-icon.png"
import React from 'react';
import HeaderComponent from './Header.jsx'
import MapComponent from './Kartta'
import jsonData from './unidata.json';
import InfoComponent from './InfoBox'
import SortButton from './SortButton'

const Search = ({ name, img, searchInput, handleSearchChange }) => {
  return (
    <div className="container">
      <div className="image">
        <img src={img} alt="Image" />
      </div>
      <div className="searchbar">
        <input
         type="text" 
         placeholder={name}
         value = {searchInput}
         onChange = {handleSearchChange} />
      </div>
    </div>
  );
};

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
};


const App = () => {
  const sortvalues = ["Country", "Hintataso", "crimeIndex", "Pop/City2"]
  const values_list = ["UG", "G"];
  const [selectedProperty, setSelectedProperty] = useState("Country");
  const [sortedData, setSortedData] = useState([]);
  const [showMore, setShowMore] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const searchResult = jsonData.filter((data) =>
    data.Country.toLowerCase().includes(searchInput.toLowerCase()) ||
    data.City.toLowerCase().includes(searchInput.toLowerCase()) ||
    data.University.toLowerCase().includes(searchInput.toLowerCase())||
    data.Region.toLowerCase().includes(searchInput.toLowerCase()));

  useEffect(() => {

    const sorted = sortByProperty(jsonData, selectedProperty);
    setSortedData(sorted);
    }, [selectedProperty]);

  const sortByProperty = (arr, property) => {
    return arr.slice().sort((a, b) => {
        if (property === 'Country'){
          const propA = a[property].toLowerCase();
          const propB = b[property].toLowerCase();
          if (propA < propB) return -1;
          if (propA > propB) return 1;
          return 0;}
        else if (property === 'Hintataso') {
          const propA = a[property];
          const propB = b[property];
          if (propA < propB) return -1;
          if (propA > propB) return 1;
          return 0;}
        else if (property === 'Pop/City2'){
          console.log(a[property])
          const propA = a[property];
          const propB = b[property];
          if (propA < propB) return -1;
          if (propA > propB) return 1;
          return 0;}
          else if (property === 'crimeIndex'){
            const propA = a[property];
            const propB = b[property];
            if (propA < propB) return -1;
            if (propA > propB) return 1;
            return 0;
          }
        }

        )
      };

  return (
  <div>
    <div>
      <HeaderComponent/>
    </div>  
  <div id = "filterBox">
    <div className="dropdown-group">
    <Search
      name="Text Search"
      img={imageSearch}
      searchInput={searchInput}
      handleSearchChange={(event) => setSearchInput(event.target.value)}/>
      <Dropdown name="Level" values={values_list} img={imageLevel} className="app-dropdown" />
      <Dropdown name="Region" values={values_list} img={imageRegion} className="app-dropdown" />
    </div>
    <div className="dropdown-group">
      <Dropdown name="Dates" values={values_list} img={imageDates} className="app-dropdown" /> 
      <Dropdown name="Study Language" values={values_list} img={imageLang} className="study_language_dropdown" />
      <Dropdown name="GPA" values={values_list} img={imageGpa} className="app-dropdown" />
    </div>
    {showMore && (
      <div>
        <div className="dropdown-group">
          <Dropdown name="Price" values={values_list} img={imagePrice} className="app-dropdown" />
          <Dropdown name="Country" values={values_list} img={imageCountry} className="app-dropdown" />
          <Dropdown name="Population" values={values_list} img={imagePop} className="app-dropdown" />
        </div>
        <div className="dropdown-group">
        <Dropdown name="Safety" values={values_list} img={imageSafety} className="app-dropdown" />
        </div>
      </div> 
      )}
      </div>
    <div className='btn'>
    <button onClick={toggleShowMore}>
        {showMore ? 'Show Less' : 'More Filters (4+)'}
    </button>
    </div>
    <div className = "leaflet_container">
      <MapComponent/>
    </div>
    <div className='results '>
      <p>All results: {searchResult.length}</p>
    </div>
    <div className='btn'>
    <SortButton
        values={sortvalues}
        handleChange={(event) => setSelectedProperty(event.target.value)}
      /> </div>
    <div className="info-container">
      {sortedData.map((item, index) => (
          <div key={index}>
            <InfoComponent data={item} />
      </div>))}
    </div>
    
    </div>
  )
}
export default App;






