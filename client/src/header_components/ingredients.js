import React from 'react';
import '../style/menu.css';
import { Link, withRouter } from 'react-router-dom';

class Ingredients extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    //will have to change <a> to <Link>

    handleClick(event){
        event.preventDefault();
        // console.log("Do we get into ingredient handleclick?");
        // console.log(event.target.name);
        let selection = {searchInput: event.target.name};
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(selection),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        };
        // console.log(fetchData);

        fetch('/search', fetchData)
            .then(response=> response.json())
            .then(data=>{
                console.log("Received data back from search in Ingredients");
                // console.log(data);
                // console.log(data.rows);
                this.props.history.push({pathname:"/", searchResult: data.rows, username:this.props.location.username,
                    userID: this.props.location.userID});
            }).catch(err=>{
                console.log("Error occurred in fetch request within browseRecipe at Ingredients page /search");
                console.log(err);
            })
    }
    render(){
        return(
            <li className="Browse-Categories">
                <h3>Ingredient</h3>
                <ul className="Browse-SubCategories">
                    <li>
                        <a className="Beef" name="Beef" onClick={this.handleClick}>Beef</a>
                    </li>
                    <li>
                        <a className="Chicken" name="Chicken" onClick={this.handleClick}>Chicken</a>
                    </li>
                    <li>
                        <a className="Pork" name="Pork" onClick={this.handleClick}>Pork</a>
                    </li>
                    <li>
                        <a className="Salmon" name="Salmon" onClick={this.handleClick}>Salmon</a>
                    </li>
                </ul>
            </li>
        )
    }
}

export default withRouter(Ingredients);