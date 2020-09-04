import React, { Component } from "react";
import { Nav, Badge, Navbar } from "react-bootstrap";
import { GoHome, GoPerson, GoMail, GoBell, GoSignOut } from "react-icons/go";
import { FaHashtag } from "react-icons/fa";
import store from "../redux/store";
import {getSocket} from "../service/socket-io-service";
import {logoutAction} from "../redux/userActions";

export class SideBar extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
        nCount : 0
    }
  }
  handleLogout = () => {
      this.props.dispatch(logoutAction());
  };
  render() {
    return (
      <Navbar className="sidebar flex-column">
        <div className="element-center">
          <Nav.Link className="Nav-Link" href="/main/home">
            <GoHome className="mr-2 mb-2" />
            Home
          </Nav.Link>

          <Badge className="bg-danger"></Badge>
        </div>
        <div className="element-center">
          <Nav.Link className="Nav-Link" href="/main/profile">
            <GoPerson className="mr-2 mb-2" />
            Profile
          </Nav.Link>
        </div>
        <div className="element-center">
          <Nav.Link className="Nav-Link" href="/main/notifications">
            <GoBell className="mr-2 mb-2" />
            Notifications
          </Nav.Link>
            {this.state.nCount !== 0 && <Badge className="bg-danger badge-pill">{this.state.nCount}</Badge> }
        </div>
        <div className="element-center">
          <Nav.Link className="Nav-Link" href="/main/explore">
            <FaHashtag className="mr-2 mb-1" />
            Explore
          </Nav.Link>
        </div>
        <div className="element-center">
          <Nav.Link
            className="Nav-Link"
            href="/login"
            onClick={this.handleLogout}
          >
            <GoSignOut className="mr-2" />
            Log Out
          </Nav.Link>
        </div>
      </Navbar>
    );
  }
  bindSocketIO = (socket) => {
        console.log("Binding socket event");
        socket.on("hello", data => {
            console.log("Hello sent data" + data);
        })
        socket.on("whom", data => {
            console.log("Got whom event", data);
            console.log(this.props);
            socket.emit("register", {
                username: this.props.username
            });
        })
        socket.on("mentions", data => {
            console.log("Got mentions!");
            console.log(data);
            this.setState({
                nCount: data.length
            })
        })
    }
    componentDidMount() {
        let socket = getSocket();
        this.bindSocketIO(socket);
    }
}

export default SideBar;
