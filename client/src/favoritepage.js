import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Header from './header_components/header';
import RecipeList from './recipelist';
import './style/favoritepage.css';
import './style/homepage.css';


class FavoritePage extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="Site-Content">
                <Header />
                <RecipeList />
            </div>
        )
    }
}

export default FavoritePage;