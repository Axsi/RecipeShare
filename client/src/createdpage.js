import React from 'react';
import Header from './header_components/header';
import './style/homepage.css';
import RecipeList from './recipelist';

class CreatedPage extends React.Component{
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

export default CreatedPage;