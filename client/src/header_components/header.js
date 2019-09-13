import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import Browse from './browse';
import SearchBar from './searchbar';
import Favorite from './favorite';
import SignIn from './signIn';
import UserFeatures from './user_features';
import '../style/header.css';
// import utensils from '../assets/utensils.png';
import Can from '../can';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            role: '',
            username:'',
            userID: null
        };
        this.goHomePage = this.goHomePage.bind(this);
    }

    componentDidMount() {
        console.log("what is role? " + this.state.role);
        console.log(this.state.role);
        console.log(this.props.location.username);
        console.log(this.props.location.userID);
        fetch('/authenticate')
            .then(response=> response.json())
            .then(data=>{
                // console.log(data.authenticate);
                // console.log(data.username);
                console.log('if fetch had no errors it would go here');

                // this.setState({role:'guest'});

                if(data){
                    // console.log("jsut got true for data");
                    // console.log(this.state.username);
                    // console.log(this.state.userID);
                    //on initially loadup of header we setup the states here
                    this.setState({role: 'user', username: this.props.location.username,
                        userID: this.props.location.userID});
                    // console.log("lets find out what the username is for location and state");
                    console.log("should turn role into user here");
                    // console.log(this.state.username);
                    // console.log(this.state.userID);
                    // console.log(this.props.location.username);
                    // console.log(this.props.location.userID);
                    // console.log("SEPERATE");
                    // console.log(this.props.history);
                    // console.log(this.props.location);
                }else{
                    console.log("should turn role into guest here");
                    this.setState({role:'guest'});
                }
                console.log(this.state.role);
            }).catch(error=>{
                console.log('Error: ' + error);
            })
    }
    //when logout is clicked this.props.location.data is compared to the current this.state.role, if different
    //the this.state.role is changed. This also changes the rendering of user-button to sign-in button
    componentDidUpdate() {
        console.log("are we inside componentdidupdate for header?");
        // console.log(this.state.role);
        // console.log(this.props.location);
        // console.log("undefined below is cause logout");
        // console.log(this.props.location.data);
        if(this.props.location.data != null && this.props.location.data !== this.state.role){
            console.log("componentdidupdate do we see inside the conditiponal?");
            this.setState({role: this.props.location.data})
        }
        //on subsequent loads of header we update and setup the states here
    }

    goHomePage(event){
        event.preventDefault();
        console.log("goHomePage");
        // console.log(this.props.location.username);
        // console.log(this.props.location.userID);
        this.props.history.push({pathname:"/", username:this.props.location.username, userID:this.props.location.userID});
    }

    render(){
        // console.log("are we in render?");
        // console.log(this.props.location.data);
        return(
            <div className="Header-Container">
                {/*change the can and insert the role state*/}
                <Can
                    role={this.state.role}
                    perform="private-home-page:visit"
                    yes={()=> (
                        <ul className="Header-Nav">
                            <li className="Logo-Tab">
                                <a className="Title" href="" onClick={this.goHomePage}>
                                    <img className="Logo-Img" src='https://firebasestorage.googleapis.com/v0/b/recipeshare-c27e5.appspot.com/o/utensils.png?alt=media&token=c08cf7d2-264e-40e7-a89f-973a6289c0a6'/>
                                </a>
                            </li>
                            <Browse />
                            <SearchBar />
                            <Favorite />
                            <UserFeatures username={this.state.username} userID={this.state.userID}/>
                        </ul>
                    )}
                />
                <Can
                    role={this.state.role}
                    perform="public-home-page:visit"
                    yes={()=> (
                        <ul className="Header-Nav">
                            <li className="Logo-Tab">
                                <Link to="/" className="Title">
                                    <img className="Logo-Img" src='https://firebasestorage.googleapis.com/v0/b/recipeshare-c27e5.appspot.com/o/utensils.png?alt=media&token=c08cf7d2-264e-40e7-a89f-973a6289c0a6'/>
                                </Link>
                            </li>
                            <Browse />
                            <SearchBar />
                            <Favorite />
                            <SignIn />
                        </ul>
                    )}
                    />
            </div>
        )
    }
}

export default withRouter(Header);