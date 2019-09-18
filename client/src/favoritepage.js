import React from 'react';
import Header from './header_components/header';
import RecipeList from './recipelist';
import './style/favoritepage.css';
import './style/homepage.css';


class FavoritePage extends React.Component{

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