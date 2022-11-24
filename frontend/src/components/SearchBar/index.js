import React from 'react'

function SearchBar( {placeholder, data})
{
    return(
        <div className='search'>
            <div className='searchData'></div>
                <input type='text' placeholder={placeholder} ></input>
                <div className='searchIcon'></div>
        </div>
    )
}

export default SearchBar;