import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "../Pages/Login/Login"
import SignUp from "../Pages/SignUp/SignUp";
import CreationDeFormulaire from "../Pages/CreationDeFormulaire/CreationDeFormulaire"
import Formulaire from "../Pages/Formulaire/Formulaire"
import Thanks from "../Pages/Thanks/Thanks"
import PrivateRoute from "./PrivateRoute/PrivateRoute"
const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/Formulaire/:id" component={Formulaire} />
        <Route exact path="/Thanks" component={Thanks} />
        <PrivateRoute exact path="/CreationDeFormulaire" component={CreationDeFormulaire} />
      </Switch>
    </Router>
  );
};

export default MainRoute;