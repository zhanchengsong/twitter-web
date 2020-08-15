import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { TweetElement } from "./TweetElement";

export class Feed extends Component {
  render() {
    return (
      <div className="feed-div">
        <Form className="PostTweet">
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="what's happening?"
              className="PostBox"
              rows="3"
            />
          </Form.Group>
          <Form.Group className="bg-danger">
            <Button className="form-button float-right mr-3">Post</Button>
          </Form.Group>
        </Form>
        <hr className="h-divider"></hr>
        <div>
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
          <hr className="h-divider"></hr>
          <TweetElement />
          <hr className="h-divider"></hr>
        </div>
      </div>
    );
  }
}

export default Feed;
