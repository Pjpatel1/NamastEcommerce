import React, { useState } from 'react';
import SerchIcon from "../../Images/SearchIcon.png"
import "./Searchbar.css"
const SearchBar = ({handleSearch}) => {
  return (
    <div className="search-bar">
      <img src={SerchIcon} className='SearchIcon'/>
      <input
        type="text"
        className='searchInput'
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;