import { useState, useEffect } from 'react'
import './App.css'
import { Helmet } from 'react-helmet';
// kuvat
import MultiRangeSlider from "multi-range-slider-react";
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
import jsonData from './unidata.json';
import InfoComponent from './InfoBox'
import SortButton from './SortButton'
//erilliset komponentit
import HeaderComponent from './Header.jsx';
import Footer from './Footer.jsx'
import MapComponent from './Kartta'
import Dropdown from './DropdownComponent.jsx'
import Search from './SearchComponent'
import { languagefilter, countryfilter, regionfilter, monthfilter } from "./Filterit.js"
import FilterFunction from './Filterit.js'
import { components } from "react-select";
import MultiCheckboxDropdown from './MultiCheckboxDropdown'
//checkbox juttuun importteja
import { useLocalStore } from "mobx-react-lite";
//import "bootstrap/dist/css/bootstrap.min.css"; muotoilee kaiken väärin ;D
import { CheckboxDropdown } from "./CheckboxDropdown.jsx";
import MultiselectDropdown from './MultiCheckboxDropdown'
import PopulationRange from './populationRange'

import Summary from './Summary';
import Dropdown2 from './DropdownComponent-copy';
//import 'bootstrap/dist/css/bootstrap.min.css';
import FilterComponent from './FilterComponent';
import ScrollComponent from './ScrollComponent';
import Info from "/src/photos/Info.png";
import GPAInfo from './GPAInfo';


const App = () => {
  const sortvalues = ["Country", "Hintataso", "crimeIndex", "Pop/City2"]

  const [selectedProperty, setSelectedProperty] = useState("Country");
  //const [sortedData, setSortedData] = useState([]);


  // FILTEREIHIN LIITTYVII JUTTUJAAAA -----------------------------------------
  const [filters, setFilters] = useState({
    Country: [],
    Language: [],
    Region: [],
    Start_Month: [],
    End_Month: [],
    Level: [],
    Price: [],
    Population: [],
    Gpa: [],
    Safety: []

  });

var [newFilteredData, setFilteredData] = useState(jsonData); // Tila suodatetulle datalle


console.log("yks:", newFilteredData);
//newFilteredData.forEach(item => console.log(item.Country));


  useEffect(() => {
    // Kutsu FilterFunction-funktiota aina, kun filters-tila päivittyy
    // Varmista, että filters sisältää jonkin filtterin ennen filtteröinnin suorittamista
    const areFiltersSet = Object.values(filters).some(filter => filter.length > 0);
    if (areFiltersSet) {
      const newFilteredData = <FilterFunction filterdata="filters" data="newFilteredData" />;
      setFilteredData(newFilteredData);
    }
  }, [filters]);


const handleFiltersChange = (name, selectedValues) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: selectedValues
    }) )
  };



// -----------------------------------------------------------------
  

  //filterien dropdown-valikot
  var values_list = ["UG", "G"];


  var level_list = ["UG", "G"];
  var region_list = regionfilter;

  var month_list = monthfilter;
  var language_list = languagefilter;
  var gpa_list = ["Yes", "No"];

  var price_list = [1, 2, 3, 4, 5];
  var country_list = countryfilter;
  // tee population
  var population_list = [""];
  var safety_list = [1, 2, 3, 4,5];


  // määrittää asetusten perustilat
  const [showMore, setShowMore] = useState(false)
  const [searchInput, setSearchInput] = useState("");

  const toggleShowMore = () => {
    setShowMore(!showMore);
    };
  
  /*const [filters, setFilters] = useState({
      Country: [],
      Language: [],
      Region: [],
      Start_Month: [],
      End_Month: [],
      Level: [],
      Price: [],
      Population: [],
      Gpa: [],
      Safety: []
    })
*/

  //Checkbox: todennäköisesti turhia :) ----------------------------------------------------------
  const [checked, setChecked] = useState(false);

  const [minValue, setMinValue] = useState(25);
  const [maxValue, setMaxValue] = useState(75);
  const [minValue2, setMinValue2] = useState(0);
  const [maxValue2, setMaxValue2] = useState(0);

  const handleChange = () => {
    setChecked(!checked);
  };


  const searchResult = newFilteredData.filter((data) =>
    data.Country.toLowerCase().includes(searchInput.toLowerCase()) ||
    data.City.toLowerCase().includes(searchInput.toLowerCase()) ||
    data.University.toLowerCase().includes(searchInput.toLowerCase())||
data.Region.toLowerCase().includes(searchInput.toLowerCase()));


  useEffect(() => {
    const sorted = sortByProperty(newFilteredData, selectedProperty);
    setFilteredData(sorted);
    }, [selectedProperty]);
  
  const regionvalues = newFilteredData.map(item => item["Region"]);
  const distinctRegions = new Set(regionvalues).size;

  const countryvalues = newFilteredData.map(item => item["Country"]);
  const distinctCountries = new Set(countryvalues).size;

  const universityvalues = newFilteredData.map(item => item["University"]);
  const distinctUniversities = new Set(universityvalues).size;
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

  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };


// -------------------------------------------------------------------------------------------

  return (
     
    <div>
        {/* Header -> erillinen tiedosto */}
        <div>
          <HeaderComponent />
        </div>

        <div>
          <ScrollComponent/>
        </div>

    

     {/* <div> {/* STICKY BAR
                <div class="container">
          <a href="#filterBox"> <div className="sticky-div">Back to filters</div> </a>
        </div>
        </div>*/}

        {/* Filteriosio */}
        <div id="filterBox">
          <h2 id="filter-title">Filters</h2><br></br>
          <div id="filterLine"></div> {/* tähän jos halutaan joku hieno koristeviiva vielä*/}


            <div className="dropdown-group"> {/* 1st line of filters*/}
              <Search className="app-dropdown" name="Text Search" img={imageSearch} searchInput={searchInput} handleSearchChange={(event) => setSearchInput(event.target.value)} />
              <FilterComponent name="Level" values={level_list} img={imageLevel} className="app-dropdown" onFilterChange={handleFiltersChange} />
              <FilterComponent name="Region" values={region_list} img={imageRegion} className="app-dropdown" onFilterChange={handleFiltersChange} />
              <FilterComponent name="Starting month" values={month_list} img={imageDates} className="app-dropdown"onFilterChange={handleFiltersChange} />
              <FilterComponent name="Ending month" values={month_list} img={imageDates} className="app-dropdown" onFilterChange={handleFiltersChange}/>
              <FilterComponent name="Study Language" values={language_list} img={imageLang} className="study_language_dropdown" onFilterChange={handleFiltersChange}/>
      
            </div>

            {showMore && (
             <div className="dropdown-group"> {/* 3rd line of filters*/}
                  <FilterComponent name="Price" values={price_list} img={imagePrice} className="app-dropdown"onFilterChange={handleFiltersChange} />
                  <FilterComponent name="Country" values={country_list} img={imageCountry} className="app-dropdown"onFilterChange={handleFiltersChange} />
                  <Dropdown name="Population" values={population_list} img={imagePop} className="app-dropdown" />
                  <FilterComponent name="Safety" values={safety_list} img={imageSafety} className="app-dropdown" onFilterChange={handleFiltersChange} />
                  <div id="gpabox"><Dropdown name="GPA" values={gpa_list} img={imageGpa} className="app-dropdown" />
                  <div> 
                  <img src={Info} alt="infocircle" height="20px" width="20px" id="infocircle"/>
                  <p id="gpaboxshow">GPA refers to the requirements from the receiving university, which is different from Aalto's index.</p>
                  </div>
                  
                  </div>

            </div>
                
                
      
            )}

          <div className='showmoreButton'>
          <button onClick={toggleShowMore}>
            {showMore ? 'Show Less' : 'More Filters (4+)'}
          </button>
        </div>
        
        </div>  {/* Filteriosio päättyy !*/}

        

        {/* Kartta, erillisestä tiedostosta */}
        <div className="leaflet_container">
          <MapComponent />
        </div>
        <div className='results '>
          <p>All results: {searchResult.length}</p>
        </div>
        <div className='btn'>
          <SortButton
            values={sortvalues}
            handleChange={(event) => setSelectedProperty(event.target.value)} /> </div>



        {/* tähän tulee kaikki hakutulokset */}
        <div className="info-container">
          {searchResult.map((item, index) => (
            <div key={index}>
              <InfoComponent data={item} />
          </div>))}
        </div>
        <div><Footer /></div>

      </div> /* Sisältö päättyy tähän*/


  )
      }


  export default App ;