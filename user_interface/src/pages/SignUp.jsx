import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import {createUser} from "../service/userservice";

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile:null,
      email: "",
      displayName: "",
      username: "",
      password: "",
      verifyPassword: "",
      icon: null,
      errors: []
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userdata = this.state;
    createUser(userdata).then( user => {
      this.props.history.push("/main")
    }).catch(e => {
      console.log(e);
      let errors = this.state.errors;
      errors.append({fieldName:"form",msg:"Failed to register user"})
      this.setState({errors: errors})
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    console.log(target);
    if (target.name === "icon") {
      this.setState({
        icon: event.target.files[0],
        selectedFile: event.target.files[0]
      });
      return;
    }
    const newState = {};
    newState[name] = target.value;
    this.setState(newState)

  }
  render() {
    return (
      <Container className="LogInPage position-fixed " fluid>
        <Row className="LogInForm bg-side col-6">
          <Col>
            <h1 className="Logo LoginText bg-dange">MyZone</h1>
            <Form className="InputField bg-succes">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="LoginText">
                  Email
                </Form.Label>
                <Form.Control className="mt-2" name="email" type="email" value={this.state.email} onChange={this.handleInputChange}
                placeholder="Please enter your email"/>
              </Form.Group>
              <Form.Group controlId="formBasicUsername">
                <Form.Label className="LoginText">Username</Form.Label>
                <Form.Control className="mt-2" name="username" type="text" value={this.state.username} onChange={this.handleInputChange}
                placeholder="Please enter your username"/>
              </Form.Group>
              <Form.Group controlId="formBasicDisplayName">
                <Form.Label className="LoginText">Display Name</Form.Label>
                <Form.Control className="mt-2" name="displayName" type="text" value={this.state.displayName} onChange={this.handleInputChange}
                placeholder="Please enter a name that will be displayed"/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="LoginText">Password</Form.Label>
                <Form.Control className="mt-2" name="password" type="password" value={this.state.password} onChange={this.handleInputChange}
                placeholder="Please enter your password"/>
              </Form.Group>
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label className="LoginText">Confirm Password</Form.Label>
                <Form.Control
                    className="mt-2"
                    type="password"
                    name="verifyPassword"
                    value={this.state.verifyPassword}
                    placeholder="Please enter your password again"
                    onChange = {this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                  <Form.File id="iconFile" name="icon" label="Select File for Icon picture" onChange={this.handleInputChange} />
              </Form.Group>


              <Form.Group>
                <Button className="LogInButton" onClick={this.handleSubmit}>
                  Sign Up
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="LogInOption bg-side col-6">
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
