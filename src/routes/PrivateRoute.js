import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

/* const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) return <Route {...props} />;
  return <Redirect to="/login" />;
};

export default PrivateRoute; */

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated === true) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoute;
