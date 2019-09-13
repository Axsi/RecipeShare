import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MessageBox from './messagebox';
import './style/authenticationpages.css';
import Menu from "./header_components/menu";

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            username:'',
            password:'',
            usernameMessage: '',
            passwordMessage:'',
            existMessage:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkName = this.checkName.bind(this);
        this.checkPassword = this.checkPassword.bind(this);

        this.usernameRegex = new RegExp("^(?=.*[a-z])(?=.{8,})");
        this.passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
    }
    //HOC could reduce the code here as you will have a similar setup in sign-in page

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        // console.log(name);
        // console.log(value);
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({usernameMessage: ''});
        this.setState({passwordMessage: ''});
        console.log("do we go inside handlesubmit?");
        let data = this.state;
        // console.log(data);

        if((this.checkName(data.username) && this.checkPassword(data.password)) === true){
            let fetchData = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            };
            console.log("do we get past fetchdata?");
            fetch('/registerAccount', fetchData)
                .then(response=> response.json())
                .then(data => {
                    // console.log("HEYO BITCHES");
                    // console.log(data);
                    if(data.message){
                        // console.log(data.message);
                        this.setState({existMessage: data.message});
                    }
                    if(data.url){
                        // console.log(data.url);
                        this.props.history.push(data.url);
                    }
                }).catch(error=>{
                    console.log('Error: ' + error);
                })
        }

        if(this.checkName(data.username) == false){
            this.setState({usernameMessage: "Your username is too short, please use a longer name"});
        }
        if(this.checkPassword(data.password) == false){
            this.setState({passwordMessage: "Your password is not strong enough, please use a stronger password"})
        }
    }

    checkName(username){
        return this.usernameRegex.test(username);
    }

    checkPassword(password){
        return this.passwordRegex.test(password);
    }

    render(){
        return(
            <div className="Site-Content">
                <div className="Form-Page">
                    <div className="Form-Container">
                        <h1 className="Sign-In-Title">
                            Register an account
                        </h1>
                        <form className="User-Info-Form" onSubmit={this.handleSubmit}>
                            <div className="Form-Group">
                                <input id="Register-User-Name" type="text" name="username" placeholder="Username"
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="Form-Group">
                                <input id="Register-User-Password" type="password" name="password" placeholder="Password"
                                       onChange={this.handleChange}/>
                            </div>
                            <input className="Register-Button" type="submit" value="Create my account"/>
                        </form>
                    </div>
                    <MessageBox usernameMessage={this.state.usernameMessage}
                                passwordMessage={this.state.passwordMessage}
                                existMessage={this.state.existMessage}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterForm);