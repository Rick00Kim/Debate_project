import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, ButtonGroup, Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import InputForm from "./InputForm";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const componentStyle = {
  root: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    height: `95vh`,
  },
  header: {
    color: `#585858`,
  },
  list: {
    color: `#585858`,
    padding: 0,
    fontSize: 15,
    height: `100%`,
    overflow: `scroll`,
  },
  listItem: {
    padding: `5px 20px`,
    color: `#e9ecef`,
    textAlign: `left`,
    borderBottomStyle: `dotted`,
    borderBottomWidth: `thin`,
  },
  listItemRow: {
    padding: `10px 0`,
  },
};

const TopicContent = (props) => {
  const { topicId } = useParams();
  const [targetTopic, setTargetTopic] = useState({});
  const [debateList, setDebateList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/topic/" + topicId)
      .then((res) => setTargetTopic(res.data[0]))
      .catch((err) => console.log(err));

    axios
      .get("/api/debates/" + topicId)
      .then((res) => setDebateList(res.data))
      .catch((err) => console.log(err));
  }, [topicId]);

  const reloadDebateList = () => {
    axios
      .get("/api/debates/" + topicId)
      .then((res) => setDebateList(res.data))
      .catch((err) => console.log(err));
  };

  const renderDebateList = () => {
    return debateList.map((item, idx) => (
      <ListGroup.Item
        bsPrefix
        style={componentStyle.listItem}
        key={"topicnum-" + item._id}
      >
        <Row style={componentStyle.listItemRow}>
          <Col sm={2}>{item.username}</Col>
          <Col sm={9}>{item.content}</Col>
          <Col sm={1} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                variant="secondary"
                id={"menu-" + item._id}
                as="div"
              />
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3" disabled>
                  Comment on {item.create_on}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </ListGroup.Item>
    ));
  };

  return (
    <div style={componentStyle.root}>
      <Jumbotron
        fluid
        style={{ paddingTop: `2rem`, marginBottom: 10, padding: `20px 0` }}
      >
        <Container style={componentStyle.header}>
          <h1>{targetTopic.header}</h1>
          <p>{targetTopic.content}</p>
        </Container>
      </Jumbotron>
      <Container style={componentStyle.list}>
        <ListGroup variant="flush">{renderDebateList()}</ListGroup>
      </Container>
      <Container style={{ fontSize: `15px`, padding: 0 }}>
        <hr style={{ borderTop: `1px solid #e9ecef` }} />
        <InputForm
          targetTopicIdx={targetTopic._id}
          updateRow={reloadDebateList}
        />
      </Container>
    </div>
  );
};

export default TopicContent;
