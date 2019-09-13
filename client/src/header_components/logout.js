import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import '../style/logout.css';
import utensils from "../assets/utensils.png";

class LogOut extends React.Component{
    constructor(props){
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut(event){
        event.preventDefault();
        console.log("logout button is clicked");
        fetch('/logout')
            .then(data=>{
                console.log("logout should be successful");
                console.log(data);
                this.props.history.push({pathname: "/", data: 'guest'});
            })
    }


    render(){
        return(
            <li className="LogOut-Button">
                <a className="LogOut" href="" onClick={this.handleSignOut}>Sign out</a>
            </li>
        )
    }
}


export default withRouter(LogOut);