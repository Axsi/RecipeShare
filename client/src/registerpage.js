import React from 'react';
import Header from './header_components/header';
import RegisterForm from './registerform';
import './style/homepage.css';

class RegisterPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="Site-Content">
                <Header />
                <RegisterForm />
            </div>
        )
    }
}
export default RegisterPage;