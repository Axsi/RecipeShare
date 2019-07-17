import React from 'react';
import Header from './header';
import './style/homepage.css';

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="Site-Content">
                <Header />
            </div>
        )
    }
}

export default HomePage;