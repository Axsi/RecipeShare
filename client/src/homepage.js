import React from 'react';
import Header from './header_components/header';
import RecipeList from './recipelist';
import './style/homepage.css';
import './can';

class HomePage extends React.Component{
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

export default HomePage;