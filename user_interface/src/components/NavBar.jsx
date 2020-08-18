import React, { Component } from "react";
import { Navbar, Nav, Form, Button, FormControl, Image } from "react-bootstrap";
import '../actionTypes';
//import store from "../store";
import {loginAction} from '../userActions';

export class NavBar extends Component {

  render() {
    return (
      <Navbar className="NavBar" variant="dark" fixed="top">
        <Navbar.Brand href="#home">Twitter</Navbar.Brand>
        <Form className="ml-auto" inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button className="form-button">Search</Button>
        </Form>
        <Nav className="ml-auto">
          <Nav.Link onClick={this.loginUser}>
            {this.props.userProfile.userName}
          </Nav.Link>
          <Nav.Link href="#picture">
            <Image
              style={{ width: 30, height: "auto" }}
              src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              roundedCircle
            />
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }

  loginUser = () => {
    console.log("Making Request");
    let token_p = fetch("/users/token", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type" : "Application/json"
      },
      body: JSON.stringify({
        email: "testest@gmail.com",
        password: "testpass"
      })
    });
    token_p.then(res => {
      console.log(res);
      res.json().then(res_json => {
          let tk = res_json.JWTToken;
          let action = loginAction({userName:"Gordon"}, tk);
          this.props.dispatch(action);
      }).catch(e => {
        console.log(e);
      });
    }).catch(e => {
      console.log(e);
    });
  }
}

/**
 * We need to add propType checks
 */
export default NavBar;
