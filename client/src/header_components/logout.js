import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import '../style/logout.css';
import'../style/user_features_menu.css'

class LogOut extends React.Component{
    constructor(props){
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut(event){
        event.preventDefault();
        fetch('/logout')
            .then(data=>{
                this.props.history.push({pathname: "/", data: 'guest'});
            })
    }


    render(){
        return(
            <li id="LogOut-Button">
                <a className="LogOut" href="" onClick={this.handleSignOut}>Sign out</a>
            </li>
        )
    }
}


export default withRouter(LogOut);