import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../style/browse.css';
import Menu from './menu';
// import Down_Browse from '../assets/icons8-chevron-down-26_browse.png';

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
                <a className="Browse-Tab" onClick={this.showMenu}>
                    <span>BROWSE</span>
                    <span> </span>
                    <img className="Chevron-Down-Icon-Browse" src='https://firebasestorage.googleapis.com/v0/b/recipeshare-c27e5.appspot.com/o/icons8-chevron-down-26_browse.png?alt=media&token=aa6718c2-d6d7-487f-91e7-ee79eeb510d9'/>
                </a>
                {this.state.menuVisible ? <Menu onOutsideClick={this.hideMenu}/> : null}
            </li>
            )
    }
}

export default Browse;