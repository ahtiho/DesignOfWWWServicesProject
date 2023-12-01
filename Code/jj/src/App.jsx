import { useState, useEffect } from 'react'
import './App.css'
// kuvat
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
import Search from './SearchComponent'
import { languagefilter, countryfilter, regionfilter, monthfilter } from "./filterit_toim.jsx"
import {FilterFunction} from './filterit_toim.jsx'
import Summary from './Summary';
import FilterComponent from './FilterComponent';
import ScrollComponent from './ScrollComponent';
import Info from "/src/photos/Info.png";



const App = () => {
  const sortvalues = ["Alphabetical order", "Sort by Price Level ", "Sort by Safety", "Sort by Population"]

  const [selectedProperty, setSelectedProperty] = useState("Country");
  //const [sortedData, setSortedData] = useState([]);


  // FILTEREIHIN LIITTYVII JUTTUJAAAA -----------------------------------------
  const [filters, setFilters] = useState({
    Country: [],
    "Study Language": [],
    Region: [],
    "Starting month": [],
    "Ending month": [],
    Level: [],
    Price: [],
    Population: [],
    Gpa: [],
    Safety: []

  });



const [newFilteredData, setFilteredData] = useState(jsonData); // Tila suodatetulle datalle





  useEffect(() => {
    // Kutsu FilterFunction-funktiota aina, kun filters-tila päivittyy
    // Varmista, että filters sisältää jonkin filtterin ennen filtteröinnin suorittamista
    const areFiltersSet = Object.values(filters).some(filter => filter.length > 0);
    if (areFiltersSet) {
     
      const newFilteredData = FilterFunction(filters, jsonData);

      setFilteredData(newFilteredData);
    } else {
      
      setFilteredData(jsonData)
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
  var level_list = ["UG", "G"];
  var region_list = regionfilter;

  var month_list = monthfilter;
  var language_list = languagefilter;
  var gpa_list = ["Yes", "No"];

  var price_list = [1, 2, 3, 4, 5];
  var country_list = countryfilter;
  // tee population
  var population_list = 
  ["10k - 500k", "500k - 1 mil", "1 mil - 5 mil", "5 mil +"];
  var safety_list = [1, 2, 3, 4,5];


  // määrittää asetusten perustilat
  const [showMore, setShowMore] = useState(false)
  const [searchInput, setSearchInput] = useState("");

  const toggleShowMore = () => {
    setShowMore(!showMore);
    };

   const searchResult = newFilteredData.filter((data) =>
    data.Country.toLowerCase().includes(searchInput.toLowerCase()) ||
    data.City.toLowerCase().includes(searchInput.toLowerCase()) ||
    data.University.toLowerCase().includes(searchInput.toLowerCase())||
    data.Region.toLowerCase().includes(searchInput.toLowerCase()));


  useEffect(() => {
    const sorted = sortByProperty(searchResult, selectedProperty);
    setFilteredData(sorted);
    }, [selectedProperty]);
  
  const regionvalues = searchResult.map(item => item["Region"]);
  const distinctRegions = new Set(regionvalues).size;

  const countryvalues = searchResult.map(item => item["Country"]);
  const distinctCountries = new Set(countryvalues).size;

  const universityvalues = searchResult.map(item => item["University"]);
  const distinctUniversities = new Set(universityvalues).size;
  const sortByProperty = (arr, property) => {
    return arr.slice().sort((a, b) => {
        if (property === 'Sort by Price Level ') {
          const property = 'Price'
          const propA = a[property];
          const propB = b[property];
          if (propA < propB) return -1;
          if (propA > propB) return 1;
          return 0;}
        else if (property === 'Sort by Population'){
          const property = 'CityPop'
          const propA = a[property];
          const propB = b[property];
          console.log(propA, propB)
          if (propA < propB) return -1;
          if (propA > propB) return 1;
          return 0;}
        else if (property === 'Sort by Safety'){
            const property = 'Safety'
            const propA = a[property];
            const propB = b[property];
            if (propA < propB) return -1;
            if (propA > propB) return 1;
            return 0;
      } else  {
            const property = 'Country'
            const propA = a[property].toLowerCase();
            const propB = b[property].toLowerCase();
            if (propA < propB) return -1;
            if (propA > propB) return 1;
            return 0;}
        }

        )
      };

  return (
     
    <div>
        {/* Header -> erillinen tiedosto */}
        <div>
          <HeaderComponent />
        </div>

        <div>
          <ScrollComponent/>
        </div>

        {/* Filteriosio */}
        <div id="filterBox">
          <h2 id="filter-title">Filters</h2>


            <div className="dropdown-group"> {/* 1st line of filters*/}
              <Search className="app-dropdown" name="Text Search" img={imageSearch} searchInput={searchInput} handleSearchChange={(event) => setSearchInput(event.target.value)} />
              <FilterComponent filters = {filters} name="Level" values={level_list} img={imageLevel} className="app-dropdown" onFilterChange={handleFiltersChange} />
              <FilterComponent filters = {filters} name="Region" values={region_list} img={imageRegion} className="app-dropdown" onFilterChange={handleFiltersChange} />
              <FilterComponent filters = {filters} name="Starting month" values={month_list} img={imageDates} className="app-dropdown"onFilterChange={handleFiltersChange} />
              <FilterComponent filters = {filters} name="Ending month" values={month_list} img={imageDates} className="app-dropdown" onFilterChange={handleFiltersChange}/>
              <FilterComponent filters = {filters} name="Study Language" values={language_list} img={imageLang} className="study_language_dropdown" onFilterChange={handleFiltersChange}/>
      
            </div>

            {showMore && (
             <div className="dropdown-group"> {/* 3rd line of filters*/}
                  <FilterComponent filters = {filters} name="Price" values={price_list} img={imagePrice} className="app-dropdown"onFilterChange={handleFiltersChange} />
                  <FilterComponent filters = {filters} name="Country" values={country_list} img={imageCountry} className="app-dropdown"onFilterChange={handleFiltersChange} />
                  <FilterComponent filters = {filters} name="Population" values={population_list} img={imagePop} className="app-dropdown" onFilterChange={handleFiltersChange}/>
              
                  <FilterComponent filters = {filters} name="Safety" values={safety_list} img={imageSafety} className="app-dropdown" onFilterChange={handleFiltersChange} />
                  <div id="gpabox">
                  <FilterComponent filters = {filters} name="Gpa" values={gpa_list} img={imageGpa} className="app-dropdown" onFilterChange={handleFiltersChange} />
                  <div> 
                  <img src={Info} alt="infocircle" height="20px" width="20px" id="infocircle"/>
                  <p id="gpaboxshow">GPA refers to the possible additional requirements from the receiving university, eg. GPA, work experience.</p>
                  </div>
                  
                  </div>

            </div>
            )}

          
          <div id="showmoreButtonWrap">
            <div className='showmoreButton'>
            <button onClick={toggleShowMore}>
              {showMore ? 'Show Less' : 'More Filters (4+)'}
            </button>
        </div></div>

        <div className="clear"></div>
        
        </div>  {/* Filteriosio päättyy !*/}

        <div className='Summaryofdest'>
          <Summary continents = {distinctRegions} universities = {distinctUniversities}  countries = {distinctCountries}/>

        </div>

        
        {/* Kartta, erillisestä tiedostosta */}
        <div className="leaflet_container">
          <MapComponent data = {searchResult}/>
        </div>

        <div id="ResultsAndSort">
          <div className='results '>
            <p>All results: {searchResult.length}</p>
          </div>
         <div className='btn'>
          <SortButton
            values={sortvalues}
            handleChange={(event) => setSelectedProperty(event.target.value)} /> 
            </div>
       

        </div> {/* ResultsAndSort päättyy*/}



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

  
  export default App;