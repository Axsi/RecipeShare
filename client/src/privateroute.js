import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import {Route, Redirect, withRouter} from 'react-router-dom';


function PrivateRoute({component: Component, ...rest}) {
    return(
        <Route
            {...rest}
        render={(props) =>
        userAuth(props) === true ?
            <Component {...props} /> :
            <Redirect to={{pathname: '/loginpage', state: {from: props.location}}}/>
         }
        />
        );
}
 function userAuth(props){
    console.log("inside userAuth");
    console.log(props.location.username);
    return (props.location.username !== '') && (props.location.username !== undefined) &&
        (props.location.username !== null);
}

export default PrivateRoute;