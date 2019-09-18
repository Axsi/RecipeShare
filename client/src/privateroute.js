import React from 'react';
import {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';


function PrivateRoute({component: Component, ...rest}) {
    return(
        <Route
            {...rest}
        render={(props) =>
         userAuth(props) === true ?
            <Component {...props} />:
            <Redirect to={{pathname: '/loginpage', state: {from: props.location}}}/>
         }
        />
        );
}
function userAuth(props){
    // console.log(props);
    // console.log(sessionStorage);
    return (sessionStorage.username !== '') && (sessionStorage.username !== undefined) &&
        (sessionStorage.username !== null);

}

export default PrivateRoute;