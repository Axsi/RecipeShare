import React from 'react';

function menus(Component){
    return class Menus extends React.Component{
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
            const props = {
                setWrapperRef: this.setWrapperRef
            };
            return(
                <Component {...props}/>
            )
        }
    }
}

export default menus