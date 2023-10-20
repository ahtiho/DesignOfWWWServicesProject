import React, { Component } from 'react';

import './InfoBox.css'
class InfoComponent extends Component {
    render() {

        const item = this.props.data;
        console.log(item)
        const firstItem = item
        return (
            <div className = 'InfoBox'>
                <h3>{firstItem.Country}</h3>
                <h2>{firstItem.UNIVERSITY}</h2>
                <p>City: {firstItem.City}</p>
                <p>Continent: {firstItem.Continent}</p>   
            </div>
        );
    }
}

export default InfoComponent;