import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";

export class SignUp extends Component {
  routeChange = () => {
    return 1 < 2 ? "/home" : "/login";
  };
  render() {
    return (
      <Container className="LogInPage position-fixed h-100" fluid>
        <Row className="LogInForm bg-side col-3">
          <Col>
            <h1 className="Logo LoginText bg-dange">MyZone</h1>
            <Form className="InputField bg-succes">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="LoginText">
                  Please input your info below
                </Form.Label>
                <Form.Control className="mt-2" placeholder="Enter email" />
                <Form.Control className="mt-2" placeholder="Enter name" />
                <Form.Control className="mt-2" placeholder="Enter username" />
                <Form.Control className="mt-2" placeholder="Enter password" />
                <Form.Control
                  className="mt-2"
                  placeholder="Re-Enter password"
                />
              </Form.Group>
              <Form.Group>
                <Button className="LogInButton" href={this.routeChange()}>
                  Sign Up
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="LogInOption bg-side col-3">
          <Col className="col-8 bg-warnin d-flex">
            <p className="LoginText bg-ligh d-flex m-auto">
              Already got an account?
            </p>
          </Col>
          <Col className="col-4 bg-dange d-flex align-items-center">
            <Nav.Link
              className="bg-secondar font-weight-bold m-auto"
              href="/login"
            >
              Login
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignUp;
