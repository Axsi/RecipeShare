import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import HomePage from './homepage';
import LoginPage from './loginpage';
import RegisterPage from './registerpage';
import FavoritePage from './favoritepage';
import CreateRecipePage from './create_recipe_page';
import RecipePage from './recipepage';
import CreatedPage from './createdpage'
import EditPage from './editpage';
import * as serviceWorker from './serviceWorker';
import PrivateRoute from './privateroute';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/loginpage" component={LoginPage}/>
            <Route path="/registerpage" component={RegisterPage}/>
            <Route path="/recipepage/:recipeid" component={RecipePage}/>
            <PrivateRoute path="/favoritepage" component={FavoritePage}/>
            <PrivateRoute path="/createrecipe" component={CreateRecipePage}/>
            <PrivateRoute path="/createdpage" component={CreatedPage}/>
            <PrivateRoute path="/editpage" component={EditPage}/>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
