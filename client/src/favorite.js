import React from 'react';
import './style/favorite.css';
import Heart from "./assets/icons8-heart-96.png";

class Favorite extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="Favorite-Button">
                <a className="Favorite-Tab" href="">
                    <img className="Heart-Icon" src={Heart}/>
                </a>
            </li>
        )
    }
}

export default Favorite;