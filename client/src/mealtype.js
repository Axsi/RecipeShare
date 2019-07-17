import React from 'react';
import './style/menu.css';
import Right from './assets/icons8-windows-metro-26.png';

class MealType extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="Browse-Categories">
                <h3>Meal Type</h3>
                <ul className="Browse-SubCategories">
                    <li>
                        <a className="Breakfast" href="">Breakfast</a>
                    </li>
                    <li>
                        <a className="Lunch" href="">Lunch</a>
                    </li>
                    <li>
                        <a className="Dinner" href="">Dinner</a>
                    </li>
                    <li>
                        <a className="Dessert" href="">Dessert</a>
                    </li>
                </ul>
            </li>
        )
    }
}

export default MealType;