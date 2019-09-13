import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../style/signIn.css';

class SignIn extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="Sign-In-Button">
                <Link to="/loginpage" className="Sign-In">
                    <span>Sign In</span>
                </Link>
            </li>
        )
    }
}

export default SignIn;