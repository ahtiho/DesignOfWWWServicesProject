import React, { Component } from 'react';
import './InfoBox.css'

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