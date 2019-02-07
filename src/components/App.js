import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

// Pages
import LoginPage from "../containers/pages/LoginPage";
import RegistrationPage from "../containers/pages/RegistrationPage";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/registration" component={RegistrationPage} />
      </Switch>
    );
  }
}

export default App;
