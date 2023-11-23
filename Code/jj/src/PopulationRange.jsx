// population range selector

import React, { Component } from 'react';
import './App.css'

class PopulationRange extends Component {
    componentDidMount() {
        var minSlider = document.getElementById('min');
        var maxSlider = document.getElementById('max');
        var outputMin = document.getElementById('min-value');
        var outputMax = document.getElementById("max-value");
    
        outputMin.innerHTML = minSlider.value;
        outputMax.innerHTML = maxSlider.value;

        minSlider.oninput = function(){
            outputMin.innerHTML=this.value;

        maxSlider.oninput = function(){
            outputMax.innerHTML=this.value;
        }
        }
    }
    render () {
     

        return (
             <div className="priceSlider">
             <h2>testissä</h2>

             <div className="min-max">
                <div className="min">
                    <label>Min</label><span id="min-value"></span>
                </div>

                <div className="max">
                    <label>Max</label><span id="max-value"></span>
                </div>

             </div>


             <div className="min-max-range">
                <input type="range" min="0" max="10000000" defaultValue="20000" className="range" id="min"></input>
                <input type="range" min="10000001" max="200000000" defaultValue="8000" className="range" id="max"></input>

             </div>
             
            <div style={{clear: "both"}}></div>

         
         </div>
        );

    }
};


export default PopulationRange;