import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import '../style/favorite.css';
// import Heart from "../assets/icons8-heart-96.png";

class Favorite extends React.Component{
    constructor(props){
        super(props);

    }
//will have to make it so when logged in clicking favorite links to favorite list instead of sign in page
    componentDidMount() {
        console.log("componetDidMount for favorite button");
        console.log(this.props.location.username);
        console.log(this.props.location.userID);
    }

    render(){
        return(
            <li className="Favorite-Button">
                <Link to={{pathname:"/favoritepage",username: this.props.location.username,
                    userID: this.props.location.userID}} className="Favorite-Tab">
                    <img className="Heart-Icon" title="Your favorite recipes"
                         src='https://firebasestorage.googleapis.com/v0/b/recipeshare-c27e5.appspot.com/o/icons8-heart-96.png?alt=media&token=52792857-9c9f-40a4-878d-8884322854ab'/>
                </Link>
            </li>
        )
    }
}

export default withRouter(Favorite);