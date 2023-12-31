
import React from 'react'; // Import React
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





class FilterComponent extends React.Component {
    render() {
      return ( <div>
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

    </div>

    );
}
}


export default FilterComponent ;