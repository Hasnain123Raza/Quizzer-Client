import { Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import React from "react";

import Login from "./scenes/Login";
import Register from "./scenes/Register";
import Account from "./scenes/Account";

export default function () {
  return [
    <Route exact path="/authentication/login" key="/authentication/login">
      <Login />
    </Route>,
    <Route exact path="/authentication/register" key="/authentication/register">
      <Register />
    </Route>,
    <ProtectedRoute
      exact
      path="/authentication/account"
      key="/authentication/account"
    >
      <Account />
    </ProtectedRoute>,
  ];
}
