import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import CLogin from "./containers/CLogIn";
import CMain from "./containers/CMain";
import {Redirect} from "react-router";
import {Canvas} from "./components/Canvas";
import CCanvas from "./containers/CCanvas"
function App() {
  return (
      <CCanvas />
  );
}


export default App;
