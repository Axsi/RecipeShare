import React from 'react';
import './style/browse.css';
import Menu from './menu';
import Down from './assets/icons8-chevron-down-26.png'

class Browse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuVisible: false
        };
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }
    //showMenu and hideMenu add and remove an eventListener that determines the visiblity of the browse menu
    showMenu(event){
        event.preventDefault();
        this.setState({menuVisible: true}, () => {
            document.addEventListener('click', this.hideMenu);
        });
    }

    hideMenu(boolean){
        this.setState({menuVisible: boolean}, () => {
            document.removeEventListener('click', this.hideMenu);
        });
    }

    render(){
        return(
            <li className="Browse-Button">
                <a className="Browse-Tab" href="" onClick={this.showMenu}>
                    <span>BROWSE</span>
                    <span> </span>
                    <img className="Chevron-Down-Icon" src={Down}/>
                </a>
                {this.state.menuVisible ? <Menu onOutsideClick={this.hideMenu}/> : null}
            </li>
            )
    }
}

export default Browse;