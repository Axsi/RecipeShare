import React from 'react';
import '../style/menu.css';
import { withRouter } from 'react-router-dom';

class Ingredients extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event){
        event.preventDefault();
        let selection = {searchInput: event.target.name};
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(selection),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        };

        fetch('/search', fetchData)
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
                <h3>Ingredient</h3>
                <ul className="Browse-SubCategories">
                    <li>
                        <a name="Beef" onClick={this.handleClick}>Beef</a>
                    </li>
                    <li>
                        <a name="Chicken" onClick={this.handleClick}>Chicken</a>
                    </li>
                    <li>
                        <a name="Pork" onClick={this.handleClick}>Pork</a>
                    </li>
                    <li>
                        <a name="Salmon" onClick={this.handleClick}>Salmon</a>
                    </li>
                </ul>
            </li>
        )
    }
}

export default withRouter(Ingredients);