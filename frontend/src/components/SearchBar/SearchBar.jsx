import React from 'react'
import './SearchBar.css'

export default function SearchBar() {
    const [inputText, setInputText] = React.useState('');

    function handleChange(event) {
        setInputText(preText => {
            event.preventDefault();
            return event.target.value
        })
    }
    return(
        <div className="searchbar-holder">
            <input type="text" className="inputfield" placeholder='Start typing your course number' onChange={handleChange}/>
            <button>Search</button>

        </div>
    )
}