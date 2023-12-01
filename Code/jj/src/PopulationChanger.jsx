import React, { Component } from 'react';
import './InfoBox.css'

// Changes the population value from string to int and then styles it with commas
const PopulationChanger = (props) => {
    const population = parseInt(props.pop, 10);
  
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