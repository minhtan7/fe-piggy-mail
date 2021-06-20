import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as jwt from "jsonwebtoken";

import ProtectedRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import PublicNavbar from "./components/PublicNavBar";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const req = { userId: "u_7rgNArdf8we7HYtkdOtHGL84amd2" };
  const apiKey = "sRwLIUgSxN7xQzIfv1mqODwMEUQO/gIMd0JTtPwYViM=";
  const token = jwt.sign(req, apiKey);
  console.log(token);
  useEffect(() => {
    async function fetchData() {
      try {
        const url =
          "https://us-central1-ohyay-prod-d7acf.cloudfunctions.net/ohyayapi/list-workspaces";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: token,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [token]);

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
