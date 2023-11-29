import React, { Component } from 'react';
import './InfoBox.css'

class InfoComponent extends Component {
    
    render() {
        const item = this.props.data;
        const UG = "Level of studies: UG"
        const G = "Level of studies: G"
        const firstItem = item
        if (firstItem["ADDITIONAL_REQUIREMENTS"].length > 2){
            firstItem["ADDITIONAL_REQUIREMENTS"] = "Yes"
        } else {
            firstItem["ADDITIONAL_REQUIREMENTS"] = "No"
        }
        return (
            <div className = 'InfoBox'>
                <div className= 'info-contents'>
                    <div className= 'details-left'>
                        <h3>{firstItem.Country}</h3>
                        <h2>{firstItem.University}</h2>
                        <p>City: {firstItem.City}</p>
                        <p>Level: {firstItem[UG]} {firstItem[G]}</p>
                        <p>Fall term: {firstItem["Fall term"]}</p>
                        <p>Spring term: {firstItem["Spring term"]}</p>  
                    </div>
                    <div className='details-right'>
                            <div className="DetailsRightRow"><p className="FilterInfoRow"><img className="InfoImage" src={'/src/photos/study-language-icon.png'} alt="Image" /> {firstItem["Language of\ninstruction"]} </p>
                            <p className="infoboxshow">Language of studies</p></div>

                            <div className="DetailsRightRow"><p className="FilterInfoRow"><img className="InfoImage" src={'/src/photos/price-icon.png'} alt="Image" /> {firstItem["Price"]} </p>
                            <p className="infoboxshow">Price Level</p></div>

                            <div className="DetailsRightRow"><p className="FilterInfoRow"><img className="InfoImage" src={'/src/photos/safety-icon.png'} alt="Image" /> {firstItem["Safety"]} </p>
                            <p className="infoboxshow">Safety Level</p></div>

                            <div className="DetailsRightRow"><p className="FilterInfoRow"><img className="InfoImage" src={'/src/photos/population-icon.png'} alt="Image" /> {firstItem["CityPop"]} </p>
                            <p className="infoboxshow">Population</p></div>

                            <div className="DetailsRightRow"><p className="FilterInfoRow"><img className="InfoImage" src={'/src/photos/gpa-icon.png'} alt="Image" /> {firstItem["ADDITIONAL_REQUIREMENTS"]} </p>
                            <p className="infoboxshow">GPA Requirements</p></div>
                    </div>

                    </div>
                        <div className='btndetails'>
                            <button>
                                <a href= {firstItem["AaltoLink"]} target="_blank" className = 'linkki'> More details</a>
                            </button>  
                        </div>
                
           </div> 
        );
    }
}

export default InfoComponent;