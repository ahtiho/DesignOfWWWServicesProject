import { useState } from 'react'
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
import InfoComponent from './InfoBox';
//erilliset komponentit
import HeaderComponent from './Header.jsx';
import FilterComponent from './filterit'
import MapComponent from './Kartta'
/*import App from 'AppComponent'*/
import Dropdown from './DropdownComponent.jsx'
import Search from './SearchComponent'
import { languagefilter, countryfilter, regionfilter, monthfilter } from "./filterit.js"
import FilterFunction from './filterit.js'
import { components } from "react-select";
import MultiCheckboxDropdown from './MultiCheckboxDropdown'
//checkbox juttuun importteja
import { useLocalStore } from "mobx-react-lite";
//import "bootstrap/dist/css/bootstrap.min.css"; muotoilee kaiken väärin ;D
import { CheckboxDropdown } from "./CheckboxDropdown.jsx";


/* SEARCH JA DROPDOWN OMISSA FILEISSÄÄN
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
};*/

// nää on testejä, poistan salee myöhemmin
/*const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};*/




// ---------------------------------------------------------------------------------------------------------------------------------------------------------------



const App = () => {
  /*
  
  useEffect = (() => {
    const updatedFilteredData = FilterFunction(jsonData, filters);
    setFilteredData(updatedFilteredData);
  }, [filters]);

  const handleFilterChange = (filterName, values) => {
    setFilters({
      ...filters,
      [filterName]: values,

    });

  }
*/
  


  //filterien dropdown-valikot
  var values_list = ["UG", "G"];

  var level_list = ["UG", "G"];
  var region_list = regionfilter;

    // splittaa kahteen eriin nämä!!
  var month_list = monthfilter;
  var language_list = languagefilter;
  var gpa_list = ["Yes", "No"];

  var price_list = [1, 2, 3, 4, 5];
  var country_list = countryfilter;
  var population_list = [""];
  var safety_list = [1, 2, 3, 4];

  

  //languagefilter, countryfilter, regionfilter, monthfilter 



  const [showMore, setShowMore] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  const toggleShowMore = () => {
    setShowMore(!showMore);
    };


  //Checkbox
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  const [filters, setFilters] =useState({
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


  return (
  <div> 
     {/* Header -> erillinen tiedosto */}
    <div>
      <HeaderComponent/>
    </div>  


    {/* Filteriosio */}
    <div id = "filterBox">

      <div className="dropdown-group"> {/* 1st line of filters*/}
      <Search
        name="Text Search"
        img={imageSearch}
        searchInput={searchInput}
        handleSearchChange={(event) => setSearchInput(event.target.value)}/>

        <Dropdown name="Level" values={level_list} img={imageLevel} className="app-dropdown" />
        

        {/* TÄÄÄÄÄ!!!!!!! -----------------
        
        ---------------------
        
        ----------------
        
        */}
             

        <CheckboxDropdown name="Level" items={level_list} img={imageLevel} className="app-dropdown" onChange={(value) => handleFilterChange('Level', value)}/>
        <CheckboxDropdown name="Region" items={region_list} img={imageRegion} className="app-dropdown"/>

        <Dropdown name="Region" values={region_list} img={imageRegion} className="app-dropdown" />
      </div>

      <div className="dropdown-group"> {/* 2nd line of filters*/}
        <Dropdown name="Starting month" values={month_list} img={imageDates} className="app-dropdown" /> 
        <Dropdown name="Ending month" values={month_list} img={imageDates} className="app-dropdown" /> 

        <Dropdown name="Study Language" values={language_list} img={imageLang} className="study_language_dropdown" onChange={1}/>

      </div>
        

      {showMore && (
        <div>
          <div className="dropdown-group"> {/* 3rd line of filters*/}
            <Dropdown name="Price" values={price_list} img={imagePrice} className="app-dropdown" />
            <Dropdown name="Country" values={country_list} img={imageCountry} className="app-dropdown" />
            <Dropdown name="Population" values={population_list} img={imagePop} className="app-dropdown" />
          </div>
          <div id="4th_line_wrap"> {/* koodaa tämä CSS*/}
          <div className="dropdown-group"> {/* 4th line of filters*/}
          <Dropdown name="Safety" values={safety_list} img={imageSafety} className="app-dropdown" />
          <Dropdown name="GPA" values={gpa_list} img={imageGpa} className="app-dropdown" />
          </div>
          </div>
        </div> 
        )}
        </div>  {/* Filteriosio päättyy !*/}

    <div className='btn'>
    <button onClick={toggleShowMore}>
        {showMore ? 'Show Less' : 'More Filters (4+)'}
    </button>
    </div> 

    {/* Kartta, erillisestä tiedostosta */}
    <div className = "leaflet_container">
      <MapComponent/>
    </div>
        
    
        <div className="CheckBox"> {/* CHECKBOX----------------------------------*/}
           
        <p>moii</p>
  
        <CheckboxDropdown items={region_list} />
      </div>

        {/* tänne kaikkee paskaa */}





    
    {/* tähän tulee kaikki hakutulokset */}
    <div className="info-container">
      {jsonData.map((item, index) => (
        <div key = {index}>
          <InfoComponent data={item} />
      </div>
))}
    </div>
    
    </div> /* Sisältö päättyy tähän*/
  )
      }


  export default App ;