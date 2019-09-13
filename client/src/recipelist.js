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
    }

    componentDidMount() {
        //so it does work but now you have to think what about if user is not logged in?
        //also same issue as before where recipeList does not mount again
        console.log("inside recipelist componentdidMount");
        console.log(this.props.location.searchResult);
        console.log(this.props.location.username);
        console.log(this.props.location.userID);
        console.log("whats pathname?");
        console.log(this.props.location.pathname);

        //************************
        //this way if there hasnt been a search it should stay null, if there has been a search and your coming from another page and have done a search state gets updated
        //componentDidUpdate will get the situations where you search while your still on homepage
        //************************
        // this.setState({searchResult: this.props.location.searchResult});
        // console.log(this.state.searchResult);
        this.renderArticles();
        // console.log(this.state.searchResult);
    }

    componentDidUpdate() {
        console.log("reciepList componentDidUpdate");
        // console.log(this.state.searchResult);
        this.renderArticles();
        // console.log(this.state.searchResult);

    }

    renderArticles(){
        console.log("right inside renderArticles");
        // console.log(this.props.location.searchResult);
        // console.log(this.state.propResult);
        //if this.props.location.searchResult is not null or undefined then we know a search was submitted by the user

        //********************if pathname !== favoritepage? or make the key also searchResult over on favorite page?******
        if((this.props.location.pathname === "/favoritepage") && (this.state.searchResult.length === 0)){
            console.log("HEHEHEHEE");
            console.log(this.state.searchResult);
            console.log(this.state.propResult);
        }else{
            if(((this.props.location.searchResult !== null) && (this.props.location.searchResult !== undefined))&&
                (this.props.location.searchResult !== this.state.searchResult)){
                this.setState({searchResult: this.props.location.searchResult,
                    propResult: this.props.location.searchResult});
                console.log("setting of searchResult inside renderArticles() is done");
            }
            //propResult initially is undefined, if a search is done it will be set with the search result from props.location.searchResult
            //if there is no search but we are going back to homepage through another page, we can check the difference between state.propResult and props.location.searchResult to see if they are different
            //if so we set propResult to this.props.location.searchResult (this is so we can keep track to see if a move from one page to homepage is done as if that happens prop.searchResult should be undefined and changed
            //from the previous search result
            console.log("What is this.props.location.searchResult?");
            console.log(this.props.location.searchResult);
            if(this.state.propResult !== this.props.location.searchResult){
                console.log("either initial loadout or a return to homepage");
                //this fetch is for recentRecipes (last 8)
                fetch('/recentRecipes')
                    .then(response => response.json())
                    .then(data => {
                        console.log("Received data from /recentRecipes get request");
                        // console.log(data);
                        // console.log(data.rows);
                        // console.log(this.props.location.username);
                        // console.log(this.props.location.userID);
                        this.setState({searchResult: data.rows, propResult: this.props.location.searchResult}); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! set propResult state here?
                        // this.props.history.push({pathname:"/", searchResult: data.rows,
                        //     username: this.props.location.username, userID: this.props.location.userID});
                    }).catch(err => {
                    console.log("error for recentRecipes query fetch");
                    console.log(err);
                })
            }
        }
        // console.log(this.state.searchResult);
    }

    renderFavorites(){

    }

    render(){
        return(
            <div id="Search-Results">
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