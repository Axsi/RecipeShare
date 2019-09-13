import React from 'react';
import Header from './header_components/header';
import RecipeList from './recipelist';
import './style/homepage.css';
import './can';

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }

    // componentDidMount() {
    //     fetch('/authenticate')
    //         .then(response=>{
    //             console.log(response);
    //             console.log(response.ok);
    //             console.log('if fetch had no errors it would go here');
    //
    //             // this.setState({role:'guest'});
    //
    //             if(response){
    //                 console.log("should turn role into user here");
    //                 this.setState({role: 'user'});
    //             }else{
    //                 console.log("should turn role into guest here");
    //                 this.setState({role:'guest'});
    //             }
    //             console.log(this.state.role);
    //         })
    //         .catch(error=>{
    //             console.log('Error: ' + error);
    //         })
    // }


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