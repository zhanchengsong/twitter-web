import React, { Component } from "react";
import {Card, Container, Row, Col, Form, Button, Nav, InputGroup} from "react-bootstrap";
import {createUser} from "../service/userservice";
import "./SignUp.css"
const validEmailRegex =
    RegExp(/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
const supportedFiles = ["jpg", "jpeg", "png"];
export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile:null,
      previewUrl: null,
      email: "",
      displayName: "",
      username: "",
      password: "",
      verifyPassword: "",
      icon: null,
      errors: {}
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userdata = this.state;
    createUser(userdata).then( user => {
      this.props.history.push("/main")
    }).catch(e => {
      console.log(e);
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    switch (target.name) {
      case 'icon':
        {let file = event.target.files[0];
        if (file == null) return; // stop handling if file is nothing
        let extension = file.name.split('.')[1];
        let fileError = ( file.size < 1024*1024 && supportedFiles.includes(extension) ) ? null : "Image must be jpg, jpeg or png and smaller than 1 MB";
        let errors = this.state.errors;
        errors.fileError = fileError;
        this.setState({
          icon: event.target.files[0],
          selectedFile: event.target.files[0],
          previewUrl: URL.createObjectURL(event.target.files[0]),
          errors: errors
        });
        break;}
      case 'email':
        {let emailError = validEmailRegex.test(target.value) ? null : "Not a valid email address";
         let errors = this.state.errors;
         errors.emailError = emailError;
         this.setState({errors:errors, email: target.value});
         break;}
      case 'username':
        {let usernameError = target.value.length >= 5 && !target.value.includes(' ') ?
            null : "Username should have at least 5 characters and contains no space";
         let errors = this.state.errors;
         errors.usernameError = usernameError;
         this.setState({errors:errors, username: target.value});
        break;}
      case 'displayName':
        {let dnError = target.value.length >= 2 ? null : "Display Name should be at least 2 characters long"
          let errors = this.state.errors;
          errors.dnError = dnError;
          this.setState({errors:errors, displayName: target.value});
          break;}
      case 'password':
        {let passwordError = target.value.length >= 8 ? null : "Password must be at least 8 characters long"
          let errors = this.state.errors;
          errors.passwordError = passwordError;
          this.setState({errors:errors, password: target.value});
          break;}

      case 'verifyPassword':
        {let pvError = target.value === this.state.password ? null : "Password do not match !"
          let errors = this.state.errors;
          errors.pvError = pvError;
          this.setState({errors:errors, verifyPassword: target.value});
        break;}

    }
    // const newState = {};
    // newState[name] = target.value;
    // this.setState(newState)

  }

  validateForm = () => {
     let errors = this.state.errors;
     for (let key in errors) {
        if (errors[key] != null) {
          return false;
        }
     }

  }
  render() {
    return (
        <div className="signup-container my-auto">
          <Card className="col-6 col-lg-6 login-card mt-2 mp-2 hv-center my-auto">
            <Card.Body>
              <Card.Title>
                Sign up
              </Card.Title>
              <Form>
                <Form.Row>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label >
                      Email
                    </Form.Label>
                    <Form.Control className={this.state.errors.emailError == null ? "" : "is-invalid"}
                                  name="email" type="email" value={this.state.email}
                                  onChange={this.handleInputChange} placeholder="Please enter your email"
                                  isValid={this.state.email.length > 0 && this.state.errors.emailError == null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {this.state.errors.emailError}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label >Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control className={this.state.errors.usernameError == null ? "" : "is-invalid"}
                                    name="username" type="text" value={this.state.username} onChange={this.handleInputChange}
                                    isValid = {this.state.username.length > 0 && this.state.errors.usernameError == null}
                                    placeholder="Please enter your username"/>
                      <Form.Control.Feedback type="invalid">
                        {this.state.errors.usernameError}
                      </Form.Control.Feedback>
                    </InputGroup>

                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group controlId="formBasicDisplayName">
                    <Form.Label >Display Name</Form.Label>
                    <Form.Control className={this.state.errors.dnError == null ? "" : "is-invalid"}
                                  name="displayName" type="text" value={this.state.displayName} onChange={this.handleInputChange}
                                  isValid = {this.state.displayName.length > 0 && this.state.errors.dnError == null}
                                  placeholder="Please enter a name that will be displayed to all others"/>
                    <Form.Control.Feedback type="invalid">
                      {this.state.errors.dnError}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label >Password</Form.Label>
                    <Form.Control className={this.state.errors.passwordError == null ? "" : "is-invalid"}
                                  name="password" type="text" value={this.state.password} onChange={this.handleInputChange}
                                  isValid = {this.state.password.length > 0 && this.state.errors.passwordError == null}
                                  placeholder="Please enter a password"/>
                    <Form.Control.Feedback type="invalid">
                      {this.state.errors.passwordError}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group controlId="formBasicVerifyPassword">
                    <Form.Label >Password</Form.Label>
                    <Form.Control className={this.state.errors.pvError == null ? "" : "is-invalid"}
                                  name="verifyPassword" type="text" value={this.state.verifyPassword} onChange={this.handleInputChange}
                                  isValid = {this.state.verifyPassword.length > 0 && this.state.errors.pvError == null}
                                  placeholder="Please enter the password again"/>
                    <Form.Control.Feedback type="invalid">
                      {this.state.errors.pvError}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Label>
                    Select a file for profile picture
                  </Form.Label>
                  <div className="custom-file">
                    <input type="file" className={"custom-file-input " + this.state.errors.fileError != null ? "is-invalid":""}
                           id="validatedCustomFile" name="icon" onChange={this.handleInputChange} required/>
                      <label className="custom-file-label" htmlFor="validatedCustomFile">{this.state.icon == null ? "Chose file" : this.state.icon.name}</label>
                      <div className="invalid-feedback">{this.state.errors.fileError}</div>
                  </div>
                </Form.Row>
                {this.state.icon &&
                <Form.Row>
                  <Form.Label>
                    Preview selected picture:
                  </Form.Label>
                  <div className={"icon-preview"}>
                    <img src={this.state.previewUrl} className={"col-3"}></img>
                  </div>
                </Form.Row>
                }

                <Form.Row>

                  <a href="/login" as={Col}>
                     Have an account ? Go to login
                  </a>
                </Form.Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>

          </Card>
        </div>


    )



    // return (
    //   <Container className="LogInPage position-fixed " fluid>
    //     <Row className="LogInForm bg-side col-6">
    //       <Col>
    //         <h1 className="Logo LoginText bg-dange">MyZone</h1>
    //         <Form className="InputField bg-succes">
    //           <Form.Group controlId="formBasicEmail">
    //             <Form.Label className="LoginText">
    //               Email
    //             </Form.Label>
    //             <Form.Control className="mt-2" name="email" type="email" value={this.state.email} onChange={this.handleInputChange}
    //             placeholder="Please enter your email" isValid={this.state.email.length > 0 && this.state.errors.emailError == null}/>
    //             <div className="invalid-feedback">
    //               LOL
    //             </div>
    //             <Form.Control.Feedback type="invalid">
    //               {this.state.errors.emailError}
    //             </Form.Control.Feedback>
    //           </Form.Group>
    //           <Form.Group controlId="formBasicUsername">
    //             <Form.Label className="LoginText">Username</Form.Label>
    //             <Form.Control className="mt-2" name="username" type="text" value={this.state.username} onChange={this.handleInputChange}
    //             placeholder="Please enter your username"/>
    //           </Form.Group>
    //           <Form.Group controlId="formBasicDisplayName">
    //             <Form.Label className="LoginText">Display Name</Form.Label>
    //             <Form.Control className="mt-2" name="displayName" type="text" value={this.state.displayName} onChange={this.handleInputChange}
    //             placeholder="Please enter a name that will be displayed"/>
    //           </Form.Group>
    //           <Form.Group controlId="formBasicPassword">
    //             <Form.Label className="LoginText">Password</Form.Label>
    //             <Form.Control className="mt-2" name="password" type="password" value={this.state.password} onChange={this.handleInputChange}
    //             placeholder="Please enter your password"/>
    //           </Form.Group>
    //           <Form.Group controlId="formBasicConfirmPassword">
    //             <Form.Label className="LoginText">Confirm Password</Form.Label>
    //             <Form.Control
    //                 className="mt-2"
    //                 type="password"
    //                 name="verifyPassword"
    //                 value={this.state.verifyPassword}
    //                 placeholder="Please enter your password again"
    //                 onChange = {this.handleInputChange}
    //             />
    //           </Form.Group>
    //           <Form.Group>
    //               <Form.File id="iconFile" name="icon" label="Select File for Icon picture" onChange={this.handleInputChange} />
    //           </Form.Group>
    //
    //
    //           <Form.Group>
    //             <Button className="LogInButton" onClick={this.handleSubmit}>
    //               Sign Up
    //             </Button>
    //           </Form.Group>
    //         </Form>
    //       </Col>
    //     </Row>
    //     <Row className="LogInOption bg-side col-6">
    //       <Col className="col-8 bg-warnin d-flex">
    //         <p className="LoginText bg-ligh d-flex m-auto">
    //           Already got an account?
    //         </p>
    //       </Col>
    //       <Col className="col-4 bg-dange d-flex align-items-center">
    //         <Nav.Link
    //           className="bg-secondar font-weight-bold m-auto"
    //           href="/login"
    //         >
    //           Login
    //         </Nav.Link>
    //       </Col>
    //     </Row>
    //   </Container>
    // );
  }
}

export default SignUp;
