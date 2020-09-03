import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import CLogin from "./containers/CLogIn";
import CMain from "./containers/CMain";
function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/login" component={CLogin} />
          <Route path="/signup" component={SignUp} />
          <Route path="/main" component={CMain} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
