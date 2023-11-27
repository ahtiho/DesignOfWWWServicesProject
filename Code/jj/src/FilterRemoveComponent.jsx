import { useState } from 'react'
import './App.css'
import React from 'react';
import HeaderComponent from './Header.jsx'
import MapComponent from './Kartta.jsx'



const RemoveFiltersButton= () => {
    return (
        <div className='btn'>
            <button onClick={removefilters}>
                Remove Filters
            </button>
        </div>
    );
}

const removefilters = () => {
    // tyhjennä filtterit
};

export default RemoveFiltersComponent