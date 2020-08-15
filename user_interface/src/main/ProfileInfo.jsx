import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import TweetElement from "./TweetElement";

export class ProfileInfo extends Component {
  render() {
    return (
      <div className="feed-div bg-dange">
        <Row className="ProfileHeader">
          <Col>
            <Row className="CoverContainer bg-inf">
              <Col className="CoverPhoto">
                <h1>{"  "}</h1>
              </Col>
              <Image
                className="ProfilePhoto"
                style={{ width: 140, height: "auto" }}
                src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                roundedCircle
              />
            </Row>

            <Row
              className="CoverContainer bg-succes"
              style={{ height: "100px" }}
            >
              <Col>
                <h4 className="font-weight-bold">Gordon</h4>
                <h6>@Gordo</h6>
                <h6>
                  {1} Following {"  "} {6} Followers
                </h6>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr className="h-divider"></hr>
        <div className=" trial bg-succes">
          <TweetElement />
          <hr className="h-divider"></hr>
          <TweetElement />
          <hr className="h-divider"></hr>
          <TweetElement />
          <hr className="h-divider"></hr>
          <TweetElement />
          <hr className="h-divider"></hr>
          <TweetElement />
          <hr className="h-divider"></hr>
          <TweetElement />
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
