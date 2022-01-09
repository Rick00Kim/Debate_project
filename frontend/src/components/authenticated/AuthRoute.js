import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth";

function AuthRoute({ component: Component, render, ...rest }) {
  const [logged] = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        logged ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Navigate
            to={{ pathname: "/signIn", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default AuthRoute;
