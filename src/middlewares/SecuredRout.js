import React from "react";
import { Route, Redirect } from "react-router-dom";
const SecuredRoute = ({ component: Component, ...otherProps }) => {
  const token = localStorage.getItem('jwtToken');
  return(
  <Route
    {...otherProps}
    render={props =>
        token ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
  );
}

export default SecuredRoute;