import React from 'react'
import TypeWriter from './components/TypeWriter/TypeWriter'
import SearchBar from './components/SearchBar/SearchBar'

export default function Home() {
    return(
        <React.Fragment>
            <div className="title">
                <div className="static-title">
                Seach For Notes In<br/>
                </div>
                <TypeWriter
                textArray={["Science","Engineering","Commerce", "Design", "Architecture", "Law", "Medicine"]}
                />
            </div>
            <SearchBar />
        </React.Fragment>
    )
}