import React from "react";
import './Summary.css'


const Summary = ({ continents, universities, countries }) => {
    return(
        <div className="Summary">
            <div className="element">
            <p>
             {continents} 
            </p>
            <br/>  
            <h2>
                Continents
            </h2>
            </div>

            <div className="element">
            <p>
            {countries} <br/>  
            </p>
            <br/>  
            <h2>
                Countries
            </h2>
            </div>
            <div className="element">
            <p>
            {universities} <br/> 
            </p>
            <br/>  
            <h2>
                Universities
            </h2>
            </div>
        </div>
    )
}

export default Summary