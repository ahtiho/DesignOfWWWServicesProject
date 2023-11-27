// SearchComponent

import { useState } from 'react'
import './App.css'
import React from 'react';



  const Search = ({ name, img, searchInput, handleSearchChange }) => {
    return (
      <div className="container2">
        <div className="image">
          <img src={img} alt="Image" />
        </div>

        <div className="Fbox">
        <div className="searchbar">
          <input
           type="text" 
           placeholder={name}
           value = {searchInput}
           onChange = {handleSearchChange} />
        </div></div>
      </div>
    );
  };

export default Search;
