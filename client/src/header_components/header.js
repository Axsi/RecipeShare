import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import SearchBar from './searchbar';
import Favorite from './favorite';
import SignIn from './signIn';
import MealType from './mealtype';
import Ingredients from './ingredients';
import LogOut from './logout';
import '../style/header.css';
import '../style/browse.css';
import '../style/user_features.css';
import '../style/menu.css';
import '../style/user_features_menu.css';
import Can from '../can';
import menuButtons from './menubuttons';
import menus from './menus';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            role: '',
            username:'',
            userID: null
        };
    }

    componentDidMount() {
        fetch('/authenticate')
            .then(response=> response.json())
            .then(data=>{
                if(data){
                    this.setState({role: 'user', username: sessionStorage.username,
                        userID: sessionStorage.userID});
                }else{
                    this.setState({role:'guest'});
                }
            }).catch(error=>{
            console.log('Error: ' + error);
        })
    }
    //when logout is clicked this.props.location.data is compared to the current this.state.role, if different
    //the this.state.role is changed. This also changes the rendering of user-button to sign-in button
    componentDidUpdate() {
        if(this.props.location.data != null && this.props.location.data !== this.state.role){
            this.setState({role: this.props.location.data})
        }
    }

    render(){
        const browseComp = (props)=>{
            return (
                <li className="Browse-Button">
                    <a className="Browse-Tab" onClick={props.showMenu}>
                        <span>BROWSE</span>
                        <span> </span>
                        <img className="Chevron-Down-Icon-Browse" src='https://firebasestorage.googleapis.com/v0/b/recipeshare-c27e5.appspot.com/o/icons8-chevron-down-26_browse.png?alt=media&token=aa6718c2-d6d7-487f-91e7-ee79eeb510d9'/>
                    </a>
                    {props.menuVisible ? <BrowseMenu onOutsideClick={props.hideMenu}/> : null}
                </li>
            )
        };
        const userComp = (props)=>{
            return (
                <li className="Account-Button">
                    <a className="User-Tab" onClick={props.showMenu}>
                        <div className="Account-User-Name">{this.state.username}</div>
                        <span className="Account-Chevron-Side">
                        <img className="Chevron-Down-Icon-Account" src='https://firebasestorage.googleapis.com/v0/b/recipeshare-c27e5.appspot.com/o/icons8-chevron-down-26.png?alt=media&token=9d3ad168-6235-4d8b-80f6-debbbba9ac5b'/>
                    </span>
                    </a>
                    {props.menuVisible ? <UserMenu onOutsideClick={props.hideMenu}/> : null}
                </li>
            )
        };
        const browseMenuComp = (props)=>{
            return(
                <div className="Menu-Container" ref={props.setWrapperRef}>
                    <section className="Menu">
                        <ul className="Categories">
                            <MealType />
                            <Ingredients />
                        </ul>
                    </section>
                </div>
            )
        };
        const userMenuComp = (props)=>{
            return(
                <div className="User-Menu-Container" ref={props.setWrapperRef}>
                    <section className="User-Menu">
                        <ul className="User-Categories">
                            <li>
                                <Link className="Create-Recipe-link" to={{
                                    pathname:"/createrecipe",
                                    username:this.state.username,
                                    userID:this.state.userID
                                }}
                                >Create Recipe</Link>
                            </li>
                            <li>
                                <Link className="Created-link" to={{
                                    pathname:"/createdpage",
                                    username:this.state.username,
                                    userID:this.state.userID
                                }}
                                >Your Recipes</Link>
                            </li>
                            <li>
                                <Link className="Favorites-link" to={{
                                    pathname:"/favoritepage",
                                    username: this.state.username,
                                    userID: this.state.userID
                                }}
                                >Favorite Recipes</Link>
                            </li>
                            <LogOut />
                        </ul>
                    </section>
                </div>
            )
        };
        const Browse = menuButtons(browseComp);
        const UserButton = menuButtons(userComp);
        const BrowseMenu = menus(browseMenuComp);
        const UserMenu = menus(userMenuComp);
        return(
            <div className="Header-Container">
                <Can
                    role={this.state.role}
                    perform="private-home-page:visit"
                    yes={()=> (
                        <ul className="Header-Nav">
                            <li className="Logo-Tab">
                                <Link to={{
                                    pathname:"/",
                                    username:this.state.username,
                                    userID:this.state.userID}} className="Title">
                                    <img className="Logo-Img" src='https://firebasestorage.googleapis.com/v0/b/recipeshare-c27e5.appspot.com/o/utensils.png?alt=media&token=c08cf7d2-264e-40e7-a89f-973a6289c0a6'/>
                                </Link>
                            </li>
                            <Browse />
                            <SearchBar />
                            <Favorite />
                            <UserButton />
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