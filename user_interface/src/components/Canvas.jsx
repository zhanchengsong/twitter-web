import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CLogin from "../containers/CLogIn";
import SignUp from "../pages/SignUp";
import CMain from "../containers/CMain";
import {Redirect} from "react-router";

export class Canvas extends Component {
    render() {
        return  <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/login" component={CLogin} />
                    <Route path="/signup" component={SignUp} />
                    <PrivateRoute authed={this.props.isLoggedIn}  path="/main" component={CMain} />
                </Switch>
            </Router>
        </React.Fragment>
    }

}
function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}
export default Canvas;