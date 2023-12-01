import React, { Component } from 'react';
import './InfoBox.css'


//Change the formatting of the populations shown in the InfoBoxes
const PopulationChanger = (props) => {
    const population = parseInt(props.pop, 10); // Convert pop string to an integer
  
    if (!isNaN(population)) {
      const formattedPopulation = population.toLocaleString();
  
      return (
        <div>
          <p>{formattedPopulation}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Invalid population</p>
        </div>
      );
    }
  };

export default PopulationChanger;