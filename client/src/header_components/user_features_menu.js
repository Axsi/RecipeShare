import React from 'react';
import LogOut from './logout';
import '../style/menu.css';
import '../style/user_features_menu.css';
import { Link, withRouter } from 'react-router-dom';
import CreateRecipePage from '../create_recipe_page';



class UserFeaturesMenu extends React.Component{
    constructor(props){
        super(props);

        // this.state={
        //     username: false
        // };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        // this.goCreateRecipe = this.goCreateRecipe.bind(this);
    }

    componentDidMount() {
        console.log("inside componentdidmount for user_features_menu");
        console.log(this.props.location.username);
        console.log(this.props.location.userID);
        document.addEventListener('click', this.handleClickOutside);
        // if((this.props.username !== '') || (this.props.username !== null)){
        //     this.setState({username: true});
        // }else{
        //     this.setState({username: false});
        // }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    setWrapperRef(node){
        this.wrapperRef = node;
    }

    handleClickOutside(event){
        //Node.contains() returns a boolean value indicating whether a node is a descendant of a given node.
        //handleClickOutside determines if a mouse click outside the specified node(set as ref) occurred
        if(this.wrapperRef && !this.wrapperRef.contains(event.target)){
            this.props.onOutsideClick(false);
        }
    }
    // goCreateRecipe(event){
    //     event.preventDefault();
    //     console.log(this.props.username);
    //     this.props.history.push({pathname:"/createrecipe", username:this.props.username, userID:this.props.userID});
    // }
    render(){
        return(
            <div className="User-Menu-Container" ref={this.setWrapperRef}>
                <section className="User-Menu">
                    <ul className="User-Categories">
                        <li>
                            <Link to={{
                                pathname:"/createrecipe",
                                username:this.props.username,
                                userID:this.props.userID
                            }}
                            >Create Recipe</Link>
                        </li>
                        <li>
                            <Link to={{
                                pathname:"/createdpage",
                                username:this.props.location.username,
                                userID:this.props.location.userID
                            }}
                            >Your Recipes</Link>
                        </li>
                        <li>
                            <Link to={{
                                pathname:"/favoritepage",
                                username: this.props.location.username,
                                userID: this.props.location.userID
                            }}
                            >Favorite Recipes</Link>
                        </li>
                        <LogOut />
                    </ul>
                </section>
            </div>
        )
    }
}

export default withRouter(UserFeaturesMenu);