import React, { Component } from "react";
import NotifElement from "./NotifElement";
import {getNotifications, deleteNotifications} from "../service/notification-service";
import { withRouter } from "react-router-dom";
export class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      notifications: []
    }
  }
  render() {
    let notifications = this.state.notifications.map( t=> {
      return <NotifElement user={t.body.sender} NotifType={t.body.messageType} key={t.MessageId} tweetID = {t.body.messageId} onElementClick={this.handleElementClick} mid={t.MessageId}/>
    });
    return <div>{notifications}</div>;
  }

  componentDidMount() {
     getNotifications(this.props.jwtToken).then( n => {
       this.setState({notifications: n});
       this.bindSocketIO(this.props.sockets.nsocket);
     }).catch( e => {
       console.log(e);
     })
  }
  bindSocketIO = (socket) => {
    socket.on("msg", (data) => {
      console.log(data);
      let notifications = this.state.notifications;
      notifications.push(data.msg);
      this.setState({
        notifications: notifications
      });
    });
    console.log("registering with backend");
    socket.emit("register", {
      username: this.props.username,
    });
  };
  handleElementClick = (messageId) => {
      deleteNotifications(this.props.jwtToken, messageId).then(deleted => {
        console.log(deleted);
        this.props.history.push("tweet/"+messageId);
      }).catch (err => {
        console.log(err);
      })
  }
}

export default withRouter(Notifications);
