import React from 'react';
import './style/menu.css';

class Ingredients extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="Browse-Categories">
                <h3>Ingredient</h3>
                <ul className="Browse-SubCategories">
                    <li>
                        <a className="Beef" href="">Beef</a>
                    </li>
                    <li>
                        <a className="Chicken" href="">Chicken</a>
                    </li>
                    <li>
                        <a className="Pork" href="">Pork</a>
                    </li>
                    <li>
                        <a className="Salmon" href="">Salmon</a>
                    </li>
                </ul>
            </li>
        )
    }
}

export default Ingredients;