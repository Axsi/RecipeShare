import React from 'react';
import Browse from './browse';
import SearchBar from './searchbar';
import Favorite from './favorite';
import SignIn from './signIn';
import './style/header.css';
import utensils from './assets/utensils.png';

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="Header-Container">
                <ul className="Header-Nav">
                    <li className="Logo-Tab">
                        <a className="Title" href="">
                            <img className="Logo-Img" src={utensils}/>
                        </a>
                    </li>
                    <Browse />
                    <SearchBar />
                    <Favorite />
                    <SignIn />
                </ul>
            </div>
        )
    }
}

export default Header;