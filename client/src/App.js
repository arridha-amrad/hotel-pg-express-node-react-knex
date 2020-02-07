import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/User/Login";
import Registrasi from "./components/User/Regsiter";
import Home from "./components/MainPage/Home";
import PrivateRoute from "./components/utils/PrivateRoute";

import AuthState from "./context/auth/AuthState";
import Header from "./components/utils/Header";
import CustomerState from "./context/customer/CustomerState";
import Checkin from "./components/MainPage/Checkin";

const App = () => {
  return (
    <AuthState>
      <CustomerState>
        <Header />
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Registrasi} />
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/checkin" exact component={Checkin} />
          </Switch>
        </Router>
      </CustomerState>
    </AuthState>
  );
};

export default App;
