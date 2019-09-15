import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './style/recipelist.css';

class RecipeList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            searchResult: [],
            propResult: null
        };
        this.renderArticles = this.renderArticles.bind(this);
        this.renderFavorites = this.renderFavorites.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.renderCreations = this.renderCreations.bind(this);
    }

    componentDidMount() {
        console.log("inside recipelist componentdidMount");
        console.log(this.props.location.searchResult);
        console.log(this.props.location.username);
        console.log(this.props.location.userID);
        console.log("whats pathname?");
        console.log(this.props.location.pathname);

        if((this.props.location.pathname === "/favoritepage") && (this.state.searchResult.length === 0)){
            this.renderFavorites();
        }else if((this.props.location.pathname === "/createdpage") && (this.state.searchResult.length === 0)){
            this.renderCreations();
        }else{
            this.renderArticles();
        }
    }

    componentDidUpdate() {
        console.log("reciepList componentDidUpdate");
        this.renderArticles();
    }

    renderArticles(){
        console.log("inside renderArticles");
        // console.log(this.props.location.searchResult);
        // console.log(this.state.propResult);
        //if this.props.location.searchResult is not null or undefined then we know a search was submitted by the user

        if(((this.props.location.searchResult !== null) && (this.props.location.searchResult !== undefined))&&
            (this.props.location.searchResult !== this.state.searchResult)){
            this.setState({searchResult: this.props.location.searchResult,
                propResult: this.props.location.searchResult});
            console.log("setting of searchResult inside renderArticles() is done");
        }
        if(this.state.propResult !== this.props.location.searchResult){
            console.log("either initial loadout or a return to homepage");
            fetch('/recentRecipes')
                .then(response => response.json())
                .then(data => {
                    console.log("Received data from /recentRecipes get request");

                    this.setState({searchResult: data.rows, propResult: this.props.location.searchResult});
                }).catch(err => {
                console.log("error for recentRecipes query fetch");
                console.log(err);
            })
        }
    }

    renderFavorites(){
        console.log("inside renderFavorites");
        let userID = this.props.location.userID;
        fetch('/getFavorites/' + userID)
            .then(response=> response.json())
            .then(data=>{
                console.log("Received data from /addFavorite/");
                this.setState({searchResult: data.rows, propResult: undefined});
            }).catch(err=>{
                console.log("Error for renderFavorites query fetch");
                console.log(err);
        })
    }

    renderCreations(){
        console.log("inside renderCreations");
        console.log(this.props.location.userID);
        let userID = this.props.location.userID;
        console.log(typeof userID);
        fetch('/getCreations/' + userID)
            .then(response=> response.json())
            .then(data=>{
                console.log("Received data from /getCreations/");
                // console.log(data);
                this.setState({searchResult: data.rows, propResult: undefined});
            }).catch(err=>{
                console.log("Error for renderCreations query fetch");
                console.log(err);
        })
    }

    renderTitle(){
        if(this.props.location.pathname === "/favoritepage"){
            return "Favorite Recipes"
        }
        if((this.props.location.pathname === "/") && (this.props.location.searchResult === undefined)){
            return "Recently Added"
        }
        if((this.props.location.pathname === "/createdpage") && (this.props.location.searchResult === undefined)){
            return "Your Recipes"
        }
    }

    render(){
        return(
            <div id="Search-Results">
                {/*{this.props.location.searchResult !== undefined ? <textarea className="TEST1" type="text" value={this.props.location.searchResult[0].directions}/>: null}*/}
                <h2 className="Recipe-List-Subject-Title">{this.renderTitle()}</h2>
                <section id="Grid-Selection">
                    {this.state.searchResult.length > 0 ? this.state.searchResult.map((recipe)=>(
                        <article className="Recipe-Article" key={recipe.recipeid.toString()}>
                            <Link to={{pathname:"/recipepage/" + recipe.recipeid, username: this.props.location.username,
                            userID: this.props.location.userID}} className="Recipe-Link">
                            <img className="Recipe-Image" src={recipe.image}/>
                            <div className="Recipe-Article-Info">
                                <h3 className="Recipe-Title">{recipe.recipetitle}</h3>
                                <div className="Recipe-Description">{recipe.description}</div>
                            </div>
                            <div className="Recipe-Creator">
                                <span className="By">By </span>
                                {recipe.username}</div>
                            </Link>
                        </article>
                        )
                    ):null}
                </section>
            </div>
        )
    }
}

export default withRouter(RecipeList);