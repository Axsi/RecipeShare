import React from 'react';
import ReactDOM from 'react-dom';
import MessageBox from './messagebox';
import { Link, withRouter } from 'react-router-dom';
import './style/authenticationpages.css';

class LoginForm extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            username:'',
            password:'',
            incorrectMessage:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
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
        // console.log("Inside login submit");
        let data = this.state;
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json;charset=utf-8'}
        };

        fetch('/login', fetchData)
            .then(response=> response.json())
                // {
                // console.log(response);
                // console.log(response.ok);
                // if(response.ok){
                //     this.props.history.push("/");
                // }
            // })
            .then(data=>{
                // console.log("what is data?");
                // console.log(data);
                if(data.message){
                    this.setState({incorrectMessage: data.message});
                }
                if(data.username){
                    // console.log(data.accountId);
                    this.props.history.push({pathname: data.url, username: data.username, userID: data.userID});
                }
            }).catch(error=>{
                console.log('Error: ' + error);
            })
    }
    render(){
        return(
            <div className="Form-Page">
                <div className="Form-Container">
                        <h1 className="Sign-In-Title">
                            Sign in with username
                        </h1>
                        <form className="User-Info-Form" onSubmit={this.handleSubmit}>
                            <div className="Form-Group">
                                <input id="User-Name" type="text" name="username" placeholder="Username"
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="Form-Group">
                                <input id="User-Password" type="password" name="password" placeholder="Password"
                                       onChange={this.handleChange}/>
                            </div>
                            <input className="Submit-Button" type="submit" value="Sign-In"/>
                            <Link to="/registerpage" className="Create-User">
                                <span>New to RecipeShare? </span>
                                Join now!
                            </Link>
                        </form>
                </div>
                <MessageBox incorrectMessage={this.state.incorrectMessage}/>
            </div>
        )
    }
}

export default withRouter(LoginForm);