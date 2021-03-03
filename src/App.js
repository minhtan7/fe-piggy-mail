import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import PublicNavbar from "./components/PublicNavBar";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Router>
        <PublicNavbar />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            render={(props) => <HomePage {...props} />}
          />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={Register} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
