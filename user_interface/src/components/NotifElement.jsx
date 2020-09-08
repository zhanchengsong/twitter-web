import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import {deleteNotifications} from "../service/notification-service";
export class NotifElement extends Component {
  constructor(props) {
    super(props);
    // this.handleContent = this.handleContent.bind(this);
  }

  handleContent = () => {
    switch (this.props.NotifType) {
      case "mention": {
        return `User ${this.props.user} mentioned you in a post/comment. Click to view.`;
      }
      case "comment": {
        return `User ${this.props.user} commented in one of your posts. Click to view.`;
      }
      case "like": {
        return `User ${this.props.user} liked one of your posts. Click to view.`;
      }
      case "share": {
        return `User ${this.props.user} shared one of your posts. Click to view.`;
      }
      default: {
        return;
      }
    }
  };


  render() {
    return (
      <Nav.Link
          onClick={() => this.props.onElementClick(this.props.mid)}
        // href={"tweet/" + this.props.tweetID}
        className="LoginText text-center"
      >
        <h5>{this.handleContent()}</h5>
      </Nav.Link>
    );
  }
}

export default NotifElement;
