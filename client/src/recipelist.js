import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './style/recipelist.css';

class RecipeList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            searchResult: [],
            propResult: null,
        };
        this.renderArticles = this.renderArticles.bind(this);
        this.renderFavorites = this.renderFavorites.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.renderCreations = this.renderCreations.bind(this);
    }

    componentDidMount() {
        if((this.props.location.pathname === "/favoritepage") && (this.state.searchResult.length === 0)){
            this.renderFavorites();
        }else if((this.props.location.pathname === "/createdpage") && (this.state.searchResult.length === 0)){
            this.renderCreations();
        }else{
            this.renderArticles();
        }
    }

    componentDidUpdate() {
        this.renderArticles();
    }

    renderArticles(){
        if(((this.props.location.searchResult !== null) && (this.props.location.searchResult !== undefined))&&
            (this.props.location.searchResult !== this.state.searchResult)){
            this.setState({searchResult: this.props.location.searchResult,
                propResult: this.props.location.searchResult});
        }
        // if(this.state.propResult !== this.props.location.searchResult){
        //     fetch('/recentRecipes')
        //         .then(response => response.json())
        //         .then(data => {
        //             this.setState({searchResult: data.rows, propResult: this.props.location.searchResult});
        //         }).catch(err => {
        //         console.log(err);
        //     })
        // }
    }

    renderFavorites(){
        let userID = sessionStorage.userID;
        fetch('/getFavorites/' + userID)
            .then(response=> response.json())
            .then(data=>{
                this.setState({searchResult: data.rows, propResult: undefined});
            }).catch(err=>{
            console.log(err);
        })
    }

    renderCreations(){
        let userID = sessionStorage.userID;
        fetch('/getCreations/' + userID)
            .then(response=> response.json())
            .then(data=>{
                this.setState({searchResult: data.rows, propResult: undefined});
            }).catch(err=>{
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