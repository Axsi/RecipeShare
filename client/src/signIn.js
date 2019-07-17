import React from 'react';
import './style/signIn.css';

class SignIn extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="Sign-In-Button">
                <a className="Sign-In" href="">
                    <span>Sign In</span>
                </a>
            </li>
        )
    }
}

export default SignIn;