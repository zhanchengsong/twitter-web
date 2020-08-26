import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CNavBar from "../containers/CNavbar";
import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import ProfileInfo from "../components/ProfileInfo";
import CProfileInfo from "../containers/CProfileInfo";
import Notifications from "../components/Notifications";
import Exploring from "../components/Exploring";
import Suggested from "../components/Suggested";

export class Main extends Component {
  render() {
    return (
      <Container fluid>
        <Row bg="info">
          <Col>
            <CNavBar />
          </Col>
        </Row>
        <Row>
          <Col className="col-12 p-2">
            <p>" "</p>
          </Col>
        </Row>
        <Row>
          <Col className="col-3 p-0">
            <SideBar />
          </Col>
          <Col className="col-6 p-0 bg-success">
            <Router>
              <Switch>
                <Route exact path="/main/home" component={Feed} />
                <Route path="/main/profile" component={CProfileInfo} />
                <Route path="/main/notifications" component={Notifications} />
                <Route path="/main/explore" component={Exploring} />
                <Route path="/main" component={Feed} />
              </Switch>
            </Router>
          </Col>
          <Col className="col-3 p-0">
            <Suggested />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
