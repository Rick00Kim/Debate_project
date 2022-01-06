import React from "react";
import { Link } from "react-router-dom";
import { Row, ListGroup, Button } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { contentStyle, routerEndPoint } from "../CommonComponents";

const componentStyle = {
  root: contentStyle.root,
  listGroupItemStyle: {
    padding: `0.3rem 1rem`,
  },
  rowStyle: {
    justifyContent: "center",
  },
  headerStyle: {
    paddingBottom: 20,
    margin: 0,
  },
  rootLinkStyle: {
    color: "#fdfdfe",
    textDecoration: "none",
  },
  newBtnStyle: {
    position: "absolute",
    right: "5%",
  },
  topicListStyle: {
    height: `70vh`,
    maxHeight: `70vh`,
    fontSize: `20px`,
    borderRadius: `5px`,
    overflow: `scroll`,
  },
  topicElementStyle: {
    textDecoration: "none",
  },
  userInfoStyle: {
    height: `17%`,
    marginTop: 10,
    paddingTop: `2rem`,
    marginBottom: 10,
    padding: `20px 0`,
    color: `white`,
    textAlign: `left`,
    backgroundColor: "inherit",
  },
};

const TopicListBar = (props) => {
  const { topicList, currentTopic, setCurrentTopic } = props;

  return (
    <div style={componentStyle.root}>
      <Row style={componentStyle.rowStyle}>
        <Link to={routerEndPoint.root} style={componentStyle.rootLinkStyle}>
          <h3 style={componentStyle.headerStyle}>Choose Topic</h3>
        </Link>
        <Link to={routerEndPoint.addTopic} style={componentStyle.newBtnStyle}>
          <Button variant="light">New</Button>
        </Link>
      </Row>
      <ListGroup style={componentStyle.topicListStyle}>
        {topicList.map((e) => (
          <Link
            to={routerEndPoint.debates + e._id}
            style={componentStyle.topicElementStyle}
            key={`topicKey-${e._id}`}
          >
            <ListGroup.Item
              style={componentStyle.listGroupItemStyle}
              action
              active={currentTopic._id === e._id}
              variant="light"
              as="div"
              key={"topicIdx" + e._id}
              onClick={(i) => setCurrentTopic(e)}
            >
              {e.title}
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
      <Jumbotron fluid style={componentStyle.userInfoStyle}>
        <Container>
          <h3>KURURU (Participant)</h3>
          <h4>Like count: 0</h4>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default TopicListBar;
