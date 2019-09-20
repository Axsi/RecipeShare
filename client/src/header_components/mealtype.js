import React from 'react';
import '../style/menu.css';
import { withRouter } from 'react-router-dom';

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
                this.props.history.push({pathname:"/", searchResult: data.rows, username:this.props.location.username,
                    userID: this.props.location.userID});
            }).catch(err=>{
            console.log(err);
        })
    }
    render(){
        return(
            <li className="Browse-Categories">
                <h3>Meal Type</h3>
                <ul className="Browse-SubCategories">
                    <li>
                        <a name="Breakfast" onClick={this.handleClick}>Breakfast</a>
                    </li>
                    <li>
                        <a name="Lunch" onClick={this.handleClick}>Lunch</a>
                    </li>
                    <li>
                        <a name="Dinner" onClick={this.handleClick}>Dinner</a>
                    </li>
                    <li>
                        <a name="Dessert" onClick={this.handleClick}>Dessert</a>
                    </li>
                </ul>
            </li>
        )
    }
}
export default withRouter(MealType);