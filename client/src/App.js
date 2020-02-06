import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/User/Login";
import Registrasi from "./components/User/Regsiter";
import Home from "./components/MainPage/Home";
import PrivateRoute from "./components/utils/PrivateRoute";

// import AlertState from "./context/alert/alertState";
import AuthState from "./context/auth/AuthState";
import Header from "./components/utils/Header";
// import setAuthToken from "./SetAuthToken";

const App = () => {
  return (
    <AuthState>
      <Header />
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Registrasi} />
          <PrivateRoute path="/" exact component={Home} />
        </Switch>
      </Router>
    </AuthState>
  );
};

export default App;
