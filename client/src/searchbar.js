import React from 'react';
import './style/searchbar.css';
import Magnify from './assets/icons8-search-30.png';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="Search-Bar">
                <div className="Search">
                    <input className="Search-Input" placeholder="Find a recipe"/>
                    <button className="Search-Button">
                        <img className="Magnify-Icon" src={Magnify}/>
                    </button>
                </div>
            </li>
        )
    }
}

export default SearchBar;