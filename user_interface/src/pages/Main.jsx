import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CNavBar from "../containers/CNavbar";
import Feed from "../components/Feed";
import CProfileInfo from "../containers/CProfileInfo";
import Notifications from "../components/Notifications";
import Exploring from "../components/Exploring";
import Suggested from "../components/Suggested";
import CSideBar from "../containers/CSideBar";
import CNotifications from "../containers/CNotifications";
import SocketContext from "../context/socket-context";
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
            <SocketContext.Consumer>
             {sockets => <CSideBar sockets={sockets} /> }
            </SocketContext.Consumer>
          </Col>
          <Col className="col-6 p-0 bg-success">
            <Router>
              <Switch>
                <Route exact path="/main/home" component={Feed} />
                <Route path="/main/profile" component={CProfileInfo} />
                <Route path="/main/notifications" >
                    <SocketContext.Consumer>
                      {
                        sockets => <CNotifications sockets = {sockets} />
                      }
                    </SocketContext.Consumer>
                </Route>
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
