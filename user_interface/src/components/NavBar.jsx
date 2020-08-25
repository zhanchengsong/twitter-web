import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Form, Button, FormControl, Image } from "react-bootstrap";
import "../redux/actionTypes";

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
          <Nav.Link href="/main/profile">
            {this.props.userProfile.userName}
          </Nav.Link>
          <Nav.Link href="/main/profile">
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
}

NavBar.propTypes = {
  JWTToken: PropTypes.string.isRequired,
};

/**
 * We need to add propType checks
 */
export default NavBar;
