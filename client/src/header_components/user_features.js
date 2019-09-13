import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import '../style/user_features.css';
import Down_Account from "../assets/icons8-chevron-down-26.png";
import UserFeaturesMenu from "./user_features_menu";

class UserFeatures extends React.Component{
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            menuVisible: false
        };
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    componentDidMount() {
        console.log("inside componentdidMount for user_feature");
        console.log(this.props.location.username);
        console.log(this.props.location.userID);
    }

    showMenu(event){
        event.preventDefault();
        this._isMounted = true;
        this.setState({menuVisible: true}, () => {
            document.addEventListener('click', this.hideMenu);
        });
    }

    hideMenu(boolean){
        console.log("HEYYY WE GOT AN ISSUE OVER HERE?");
        if(this._isMounted){
            this.setState({menuVisible: boolean}, () => {
                document.removeEventListener('click', this.hideMenu);
            });
        }
        console.log("IM WALKING VOER HERE");
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.removeEventListener('click', this.hideMenu)
    }

    render(){
        return(
            <li className="Account-Button">
                <a className="User-Tab" onClick={this.showMenu}>
                    <div className="Account-User-Name">{this.props.username}</div>
                    <span className="Account-Chevron-Side">
                        <img className="Chevron-Down-Icon-Account" src={Down_Account}/>
                    </span>
                </a>
                {this.state.menuVisible ? <UserFeaturesMenu username={this.props.username} userID={this.props.userID}
                                                            onOutsideClick={this.hideMenu}/> : null}
            </li>
        )
    }
}


export default withRouter(UserFeatures);