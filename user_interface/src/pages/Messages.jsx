import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../main/NavBar";
import SideBar from "../main/SideBar";
import Suggested from "../main/Suggested";
import ChatRoom from "../main/ChatRoom";

export class Messages extends Component {
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
              <ChatRoom />
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

export default Messages;
