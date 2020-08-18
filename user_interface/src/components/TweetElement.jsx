import React, { Component } from "react";
import { Row, Container, Col, Image, Nav, Dropdown } from "react-bootstrap";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaRegComment, FaComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";

export class TweetElement extends Component {
  state = {
    userName: "Gordon",
    content:
      "You need to import the picture into the React component. " +
      "Say our image is in the same folder as our React component," +
      "your import would look something like this. import Logo from",
    like: 1,
    comment: 2,
    repost: 3,
    liked: false,
    commented: false,
    reposted: false,
  };

  increLike = () => {
    if (!this.state.liked) {
      this.setState({
        like: this.state.like + 1,
        liked: true,
      });
    } else {
      this.setState({
        like: this.state.like - 1,
        liked: false,
      });
    }
  };

  increComment = () => {
    if (!this.state.commented) {
      this.setState({
        comment: this.state.comment + 1,
        commented: true,
      });
    } else {
      this.setState({
        comment: this.state.comment - 1,
        commented: false,
      });
    }
  };

  increRepost = () => {
    if (!this.state.reposted) {
      this.setState({
        repost: this.state.repost + 1,
        reposted: true,
      });
    } else {
      this.setState({
        repost: this.state.repost - 1,
        reposted: false,
      });
    }
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="col-2 bg-dange">
            <Image
              className="float-right mt-2 bg-light"
              style={{ width: 50, height: "auto" }}
              src="https://i.stack.imgur.com/34AD2.jpg"
              roundedCircle
            />
          </Col>
          <Col className="col-10 bg-warnin">
            <Row>
              <Col className="col-11">
                <Nav.Link className="UserName">{this.state.userName}</Nav.Link>
              </Col>
              <Col className="col-1 ">
                <Dropdown>
                  <Dropdown.Toggle className="DropDownButt"></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      Unfollow {this.state.userName}
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Mute {this.state.userName}
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Message {this.state.userName}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="feed-content">{this.state.content}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Nav.Link
                  className="Actions text-dange"
                  onClick={this.increLike}
                >
                  {this.state.liked ? (
                    <MdFavorite className="mb-1" />
                  ) : (
                    <MdFavoriteBorder className="mb-1" />
                  )}{" "}
                  {this.state.like}
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link
                  className="Actions text-secondar"
                  onClick={this.increComment}
                >
                  {this.state.commented ? (
                    <FaComment className="mb-1" />
                  ) : (
                    <FaRegComment className="mb-1" />
                  )}
                  {"  "}
                  {this.state.comment}
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link
                  className="Actions text-warnin"
                  onClick={this.increRepost}
                >
                  <AiOutlineRetweet className="mb-1" />
                  {"  "}
                  {this.state.repost}
                </Nav.Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TweetElement;
