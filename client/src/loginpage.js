import React from 'react';
import Header from './header';
import LoginForm from './loginform';
import './style/homepage.css';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="Site-Content">
                <Header />
                <LoginForm />
            </div>
        )
    }
}

export default LoginPage;