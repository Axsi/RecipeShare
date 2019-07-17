import React from 'react';
import './style/authenticationpages.css';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="Form-Page">
                <div className="Form-Container">
                        <h1 className="Sign-In-Title">
                            Sign in with username
                        </h1>
                        <form className="User-Info-Form">
                            <div className="Form-Group">
                                <input id="User-Name" type="text" name="username" placeholder="Username"/>
                            </div>
                            <div className="Form-Group">
                                <input id="User-Password" type="password" name="password" placeholder="Password"/>
                            </div>
                            <input className="Submit-Button" type="submit" value="Sign-In"/>
                            <a className="Create-User" href="">
                                <span>New to RecipeShare? </span>
                                Join now!
                            </a>
                        </form>
                </div>
            </div>
        )
    }
}

export default LoginForm;