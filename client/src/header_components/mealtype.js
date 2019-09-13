import React from 'react';
import '../style/menu.css';
import { Link, withRouter } from 'react-router-dom';
import Right from '../assets/icons8-windows-metro-26.png';

class MealType extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        event.preventDefault();
        fetch('/mealType/' + event.target.name)
            .then(response=> response.json())
            .then(data=>{
                console.log("Received data back from browseRecipe in MealType");
                // console.log(data);
                // console.log(data.rows);
                this.props.history.push({pathname:"/", searchResult: data.rows, username:this.props.location.username,
                    userID: this.props.location.userID});
            }).catch(err=>{
                console.log("Error occurred in fetch request within browseRecipe at mealtype");
                console.log(err);
            })
    }
    //will have to change <a> to <Link>
    render(){
        return(
            <li className="Browse-Categories">
                <h3>Meal Type</h3>
                <ul className="Browse-SubCategories">
                    <li>
                        <a className="Breakfast" name="Breakfast" onClick={this.handleClick}>Breakfast</a>
                    </li>
                    <li>
                        <a className="Lunch" name="Lunch" onClick={this.handleClick}>Lunch</a>
                    </li>
                    <li>
                        <a className="Dinner" name="Dinner" onClick={this.handleClick}>Dinner</a>
                    </li>
                    <li>
                        <a className="Dessert" name="Dessert" onClick={this.handleClick}>Dessert</a>
                    </li>
                </ul>
            </li>
        )
    }
}

export default withRouter(MealType);