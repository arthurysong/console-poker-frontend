import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css';

function SearchBar() {
    const [focused, setFocused] = useState(false);

    return <div 
        onBlur={() => setFocused(false)} 
        onFocus={() => setFocused(true)} 
        className={`searchBar ${focused ? '--focused' : ''}`}>
        <input className="searchBar__input" type="text"/>
        {/* <button className="searchBar__button"></button> */}
        <span className="searchBar__button nes-btn"><SearchIcon /></span>
    </div>
}

export default SearchBar
