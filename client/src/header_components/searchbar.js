import React from 'react';
import '../style/searchbar.css';
import { Link, withRouter } from 'react-router-dom';
// import Magnify from '../assets/icons8-search-30.png';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchInput: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        // console.log(name);
        // console.log(value);

        this.setState({
            [name]: value
        });
    }

    handleSearch(event){
        event.preventDefault();
        console.log("inside handleSearch");
        // console.log(event);
        if((this.state.searchInput !== '')&&(this.state.searchInput !== null)&&(this.state.searchInput !== undefined)){
            console.log("inside handlesearch conditional");
            let data = this.state;
            let fetchData = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            };
            console.log(fetchData);
            fetch('/search', fetchData)
                .then(response=> response.json())
                .then(data =>{
                    console.log("back in searchbar.js");
                    // console.log(data);
                    console.log(data.rows);
                    console.log(this.props.location.username);
                    console.log(this.props.location.userID);
                    //this push is not doing anything, maybe try link? redirect?
                    this.props.history.push({pathname:"/", searchResult: data.rows,
                        username: this.props.location.username, userID: this.props.location.userID});
                }).catch(err=>{
                    console.log("error for searchbar's handleSubmit fetch");
                    console.log(err);
                })
        }
    }

    checkEnter(event){
        if(event.keyCode === 13){
            console.log("enter was pressed");
            // console.log(event);
            this.handleSearch(event);

        }
    }

    render(){
        return(
            <li className="Search-Bar">
                <div className="Search">
                    <input className="Search-Input" placeholder="Find a recipe" name="searchInput"
                           onKeyDown={this.checkEnter} onChange={this.handleChange}/>
                    <button className="Search-Button" onClick={this.handleSearch}>
                        <img className="Magnify-Icon" src='https://firebasestorage.googleapis.com/v0/b/recipeshare-c27e5.appspot.com/o/icons8-search-30.png?alt=media&token=4860d078-e8be-46e1-acae-e50e0f6efa4a'/>
                    </button>
                </div>
            </li>
        )
    }
}

export default withRouter(SearchBar);