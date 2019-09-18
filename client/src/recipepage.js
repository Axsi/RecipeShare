import React from 'react';
import Header from './header_components/header';
import { Link } from 'react-router-dom';
import './style/homepage.css';
import './style/recipepage.css';

class RecipePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            recipeDetails: {},
            recipeIngredients:[],
            recipeDirections:[]
        };
        this.addToFavorites = this.addToFavorites.bind(this);

    }
    componentDidMount() {
        let recipeid = this.props.match.params.recipeid;
        fetch('/getRecipe/' + recipeid)
            .then(response=> response.json())
            .then(data=>{
                data.rows[0].ingredients = data.rows[0].ingredients.split('**');
                data.rows[0].directions = data.rows[0].directions.split('**');
                data.rows[0].ingredients = data.rows[0].ingredients.filter(i => i !== "");
                data.rows[0].directions = data.rows[0].directions.filter(d => d !== "");
                this.setState({recipeDetails: data.rows[0], recipeIngredients: data.rows[0].ingredients,
                    recipeDirections: data.rows[0].directions});
            })
            .catch(err=>{
                console.log(err);
            });
    }
    addToFavorites(event) {
        event.preventDefault();
        let data = {recipeid: this.props.match.params.recipeid, accountid: sessionStorage.userID};

        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        };

        fetch('/addFavorite', fetchData)
            .then(response=> response.json())
            .then(data=>{
                // console.log("Getting a response back from /addFavorite fetch on client side");
                // console.log(data);
            }).catch(error=>{
            console.log(error);
        })
    }
    render(){
        return(
            <div className="Site-Content">
                <Header />
                <div className="Recipe-Page-Container">
                    <div className="Recipe-Summary-Container">
                        <section className="Recipe-Summary">
                            <div className="Title-Container">
                                <h1 className="Recipe-Page-Title">{this.state.recipeDetails.recipetitle}</h1>
                                {sessionStorage.username ?
                                    <img className="Registered-User-Options"
                                         onClick={this.addToFavorites}
                                         title="Add to favorites"
                                         src="https://firebasestorage.googleapis.com/v0/b/recipeshare-c27e5.appspot.com/o/icons8-plus-24.png?alt=media&token=dbddc595-5dd4-43d2-9e6e-9bb227552361"
                                    />
                                    : null}
                                {sessionStorage.username === this.state.recipeDetails.username ?
                                    <Link to={{
                                        pathname:"/editpage",
                                        username: sessionStorage.username,
                                        userID: sessionStorage.userID,
                                        recipeDetails: this.state.recipeDetails
                                    }}>
                                        <img className="Registered-User-Options"
                                             id="Edit-Your-Recipe"
                                             title="Edit your recipe"
                                             src={"https://firebasestorage.googleapis.com/v0/b/recipeshare-c27e5.appspot.com/o/icons8-edit-40.png?alt=media&token=8b38d508-1011-4c65-b017-2ca5248bfdd6"}
                                        />
                                    </Link>
                                    : null}
                            </div>
                            <p>
                                <span className="Recipe-By">Recipe by </span>
                                <span className="Recipe-Page-Creator">{this.state.recipeDetails.username}</span>
                            </p>
                            <div className="Recipe-Page-Description">{this.state.recipeDetails.description}</div>
                        </section>
                        <section className="Recipe-Image-Container">
                            <img className="Recipe-Page-Image" src={this.state.recipeDetails.image}/>
                        </section>
                    </div>
                    <div className="Recipe-Ingredients-Container">
                        <h2 className="Recipe-Section-Title">Ingredients</h2>
                        <ul className="Recipe-Section-Text">
                            {this.state.recipeIngredients.map((ingredient, i)=>(
                                <li className="Recipe-Section-li" key={ingredient+ (i+1)}>
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="Recipe-Directions-Container">
                        <h2 className="Recipe-Section-Title">Directions</h2>
                        <ul className="Recipe-Section-Text" id="Recipe-Page-Directions">
                            <ul className="Information-Tab">
                                <li className="Info-Tab-PrepTime">
                                    <p className="Info-Tab-Label">Prep Time</p>
                                    <span>{this.state.recipeDetails.preptime}</span>
                                </li>
                                <li className="Info-Tab-CookTime">
                                    <p className="Info-Tab-Label">Cook Time</p>
                                    <span>{this.state.recipeDetails.cooktime}</span>
                                </li>
                                <li className="Info-Tab-Servings">
                                    <p className="Info-Tab-Label">Servings</p>
                                    <span>{this.state.recipeDetails.servings}</span>
                                </li>
                            </ul>
                            {this.state.recipeDirections.map((direction, i)=>(
                                <li className="Recipe-Section-li" key={direction+ (i+1)}>
                                    {direction}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default RecipePage;