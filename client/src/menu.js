import React from 'react';
import './style/menu.css';
import MealType from './mealtype';
import Ingredients from './ingredients';

class Menu extends React.Component{
    constructor(props){
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    setWrapperRef(node){
        this.wrapperRef = node;
    }

    handleClickOutside(event){
        //Node.contains() returns a boolean value indicating whether a node is a descendant of a given node.
        //handleClickOutside determines if a mouse click outside the specified node(set as ref) occurred
        if(this.wrapperRef && !this.wrapperRef.contains(event.target)){
            this.props.onOutsideClick(false);
        }
    }
    render(){
        return(
            <div className="Menu-Container" ref={this.setWrapperRef}>
                <section className="Menu">
                    <ul className="Categories">
                        <MealType />
                        <Ingredients />
                    </ul>
                </section>
            </div>
        )
    }
}

export default Menu;