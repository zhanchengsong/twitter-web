import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { SideBar } from "./main/SideBar";
// import { Feed } from "./main/Feed";
import { NoMatch } from "./pages/NoMatch";
// import { NavBar } from "./main/NavBar";
// import { Row, Col, Container } from "react-bootstrap";
// import Suggested from "./main/Suggested";
// import { Trial } from "./main/Trial";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Notifications } from "./pages/Notifications";
import { Explore } from "./pages/Explore";
import { Messages } from "./pages/Messages";
import { LogIn } from "./pages/LogIn";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/messages" component={Messages} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/explore" component={Explore} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
