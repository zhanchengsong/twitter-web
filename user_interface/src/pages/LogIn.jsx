import React, { Component } from "react";
import { Nav, Form, Button, Row, Col, Container } from "react-bootstrap";
import store from "../store";

export class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      showL: false,
      showS: false,
      myEmail: "",
      myPassword: "",
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  handlePage = () => {
    return this.state.myEmail === "gordonli121@gmail.com"
      ? "/home"
      : "/profile";
  };

  routeChange = () => {
    let path = `${this.handlePage()}`;

    // const axios = require("axios").default;
    // let myurl = "http://localhost:9092/tweets";
    // let reponse = axios
    //   .get(myurl, {
    //     crossDomain: true,
    //   })
    //   .then((res) => {
    //     return res.data[0];
    //   })
    //   .catch((error) => {
    //     return error;
    //   });

    store.dispatch({
      type: "LogIn",
      payload: {
        userName: "Gordon",
        userID: "gordo",
        userPic: "http://google.ca",
        JWTToken: "abcdefg",
      },
    });

    this.props.history.push(path);
    console.log(store.getState());
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleEmail = (event) => {
    this.setState({ myEmail: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ myPassword: event.target.value });
  };

  render() {
    return (
      <Container className="LogInPage position-fixed h-100" fluid>
        <Row className="LogInForm bg-side col-3">
          <Col>
            <h1 className="Logo LoginText bg-dange">MyZone</h1>
            <Form className="InputField bg-succes" onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="LoginText">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.state.myEmail}
                  onChange={this.handleEmail}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="LoginText">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={this.state.myPassword}
                  onChange={this.handlePassword}
                />
              </Form.Group>
              <Form.Group className="d-flex justify-content-center">
                <Button className="LogInButton" onClick={this.routeChange}>
                  Log In
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="SignUpOption bg-side col-3">
          <Col className="col-8 bg-warnin d-flex">
            <p className="LoginText bg-ligh d-flex m-auto">
              Don't have an account?
            </p>
          </Col>
          <Col className="col-4 bg-dange d-flex align-items-center">
            <Nav.Link
              className="bg-secondar m-auto font-weight-bold"
              href="/signup"
            >
              Signup
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LogIn;

// BackUp Version **********************************************************

// handleShowL = () => {
//   this.setState({ showL: true });
// };
// handleCloseL = () => {
//   this.setState({ showL: false });
// };
// handleShowS = () => {
//   this.setState({ showS: true });
// };
// handleCloseS = () => {
//   this.setState({ showS: false });
// };

// <Container className="LogInPage" fluid>
//   <Row className="bg-ligh">
//     <h1
//       style={{
//         marginLeft: "1.5em",
//         marginTop: "0.5em",
//         fontWeight: "bold",
//         fontFamily: "Cursive",
//         color: "#b3ccdd",
//       }}
//     >
//       MyZone
//     </h1>
//   </Row>
//   <Row className="LogInRow bg-succes">
//     <Col className="col-12">
//       <Button className="LogInButton" onClick={this.handleShowL}>
//         Log In
//       </Button>
//       <Modal
//         show={this.state.showL}
//         onHide={this.handleCloseL}
//         aria-labelledby="LogIn"
//         centered="true"
//         className="Modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Log In</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Email address</Form.Label>
//             <Form.Control type="email" placeholder="Enter email" />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Password" />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             className="ModalButton"
//             variant="secondary"
//             onClick={this.handleCloseL}
//           >
//             Close
//           </Button>
//           <Button
//             className="ModalButton"
//             variant="primary"
//             href={this.routeChange()}
//           >
//             Log In
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Col>
//   </Row>
//   <Row className="SignUpRow bg-inf">
//     <Col className="col-12">
//       <Button className="LogInButton" onClick={this.handleShowS}>
//         Sign Up
//       </Button>
//       <Modal
//         show={this.state.showS}
//         onHide={this.handleCloseS}
//         aria-labelledby="SignUp"
//         centered="true"
//         className="Modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Sign Up</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Email address</Form.Label>
//             <Form.Control type="email" placeholder="Enter email" />
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Password" />
//             <Form.Control
//               type="password"
//               placeholder="Re-Enter Password"
//               style={{ marginTop: "10px" }}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             className="ModalButton"
//             variant="secondary"
//             onClick={this.handleCloseS}
//           >
//             Close
//           </Button>
//           <Button
//             className="ModalButton"
//             variant="primary"
//             onClick={this.handleCloseS}
//           >
//             Sign Up
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Col>
//   </Row>
// </Container>
