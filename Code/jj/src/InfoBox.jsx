import React, { Component } from 'react';
import './InfoBox.css'
class InfoComponent extends Component {
    
    render() {
        const item = this.props.data;
        const UG = "Level of studies: UG"
        const G = "Level of studies: G"
        const firstItem = item
        if (firstItem["ADDITIONAL REQUIREMENTS"].length > 0){
            firstItem["ADDITIONAL REQUIREMENTS"] = "Yes"
        } else {
            firstItem["ADDITIONAL REQUIREMENTS"] = "No"
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
                            <p><img src={'/src/photos/study-language-icon.png'} alt="Image" />: {firstItem["Language of\ninstruction"]} </p>
                            <p><img src={'/src/photos/price-icon.png'} alt="Image" />: {firstItem["Price"]} </p>
                            <p><img src={'/src/photos/safety-icon.png'} alt="Image" />: {firstItem["Safety"]} </p>
                            <p><img src={'/src/photos/population-icon.png'} alt="Image" />: {firstItem["Pop/City2"]} </p>
                            <p><img src={'/src/photos/gpa-icon.png'} alt="Image" />: {firstItem["ADDITIONAL REQUIREMENTS"]} </p>
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