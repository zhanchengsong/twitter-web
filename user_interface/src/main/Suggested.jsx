import React, { Component } from "react";
import { Nav } from "react-bootstrap";

export class Suggested extends Component {
  render() {
    return (
      // <Container fluid>
      <Nav className="suggested flex-column">
        <p className="suggestions">Do you know Tom?</p>
        <hr className="h-divider"></hr>
        <p className="suggestions">Do you know Tom?</p>
        <hr className="h-divider"></hr>
        <p className="suggestions">Do you know Tom?</p>
        <hr className="h-divider"></hr>
        <p className="suggestions">Do you know Tom?</p>
        <hr className="h-divider"></hr>
        <p className="suggestions">Do you know Tom?</p>
        <hr className="h-divider"></hr>
      </Nav>
      // </Container>
    );
  }
}

export default Suggested;
