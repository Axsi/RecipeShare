import React from 'react';
import {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

//essentially if userAuth is true, we put in the component param that was passed into the Component position or get redirected to loginpage
function PrivateRoute({component: Component, ...rest}) {
    return(
        <Route
            {...rest}
        render={(props) =>
         userAuth() === true ?
            <Component {...props} />:
            <Redirect to={{pathname: '/loginpage', state: {from: props.location}}}/>
         }
        />
        );
}
function userAuth(){
    return (sessionStorage.username !== '') && (sessionStorage.username !== undefined) &&
        (sessionStorage.username !== null);

}

export default PrivateRoute;