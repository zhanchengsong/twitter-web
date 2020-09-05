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
              src={this.props.userProfile.userPic || ""}
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
