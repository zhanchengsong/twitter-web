import React, { Component } from "react";
import { Nav, Badge, Navbar } from "react-bootstrap";
import { GoHome, GoPerson, GoBell, GoSignOut } from "react-icons/go";
import { FaHashtag } from "react-icons/fa";
import { logoutAction } from "../redux/userActions";
import { getNotificationCount } from "../service/notification-service";

export class SideBar extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      nCount: 0,
    };
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
          {this.state.nCount !== 0 && (
            <Badge className="bg-danger badge-pill">{this.state.nCount}</Badge>
          )}
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
    socket.on("count", (data) => {
      console.log(data);
      this.setState({
        nCount: data.count,
      });
    });
    console.log("registering with backend");
    socket.emit("register", {
      username: this.props.username,
    });
  };
  componentDidMount() {
    console.log("Called Component Did Mount");
    getNotificationCount(this.props.jwtToken).then( count => {
       this.setState({nCount: count});
    }).catch(e => {
       console.log(e);
    })
    this.bindSocketIO(this.props.sockets.csocket);
  }
}

export default SideBar;
