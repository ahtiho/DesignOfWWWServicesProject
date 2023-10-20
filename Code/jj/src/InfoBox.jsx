import React, { Component } from 'react';
import jsonData from './unidata.json';
import './InfoBox.css'
class InfoComponent extends Component {
    render() {
        const firstItem = jsonData[0];
        return (
            <div className = 'InfoBox'>
                <h1>Country: {firstItem.Country}</h1>
                <h2>University: {firstItem.UNIVERSITY}</h2>
                <p>City: {firstItem.City}</p>
                <p>Continent: {firstItem.Continent}</p>
                
            </div>
        );
    }
}

export default InfoComponent;