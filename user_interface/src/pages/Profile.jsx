import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Suggested from "../components/Suggested";
import ProfileInfo from "../components/ProfileInfo";

export class Profile extends Component {
  render() {
    return (
      <Container fluid>
        <Row bg="info">
          <Col>
            <NavBar />
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
            <div>
              <ProfileInfo />
            </div>
          </Col>
          <Col className="col-3 p-0">
            <Suggested />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
