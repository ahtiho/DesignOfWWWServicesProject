import React from "react";
import './App.css';

const SortButton = ({ name, values, handleChange }) => {
  return (
    <div className="sortbutton">
      <select onChange={handleChange}>
        <option value="" disabled defaultValue>{"Sort by..."}</option>
        {values.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortButton;
