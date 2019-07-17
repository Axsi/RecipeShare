import React from 'react';
import './style/authenticationpages.css';

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="Site-Content">
                <div className="Form-Page">
                    <div className="Form-Container">
                        <h1 className="Sign-In-Title">
                            Register an account
                        </h1>
                        <form className="User-Info-Form">
                            <div className="Form-Group">
                                <input id="Register-User-Name" type="text" name="username" placeholder="Username"/>
                            </div>
                            <div className="Form-Group">
                                <input id="Register-User-Password" type="password" name="password" placeholder="Password"/>
                            </div>
                            <input className="Register-Button" type="submit" value="Create my account"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterForm;