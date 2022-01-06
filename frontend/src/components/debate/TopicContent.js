import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import InputForm from "./InputForm";
import axios from "axios";
import {
  routerEndPoint,
  backendPointList,
  contentStyle,
  defaultDebateForm,
} from "../CommonComponents";
import "bootstrap/dist/css/bootstrap.css";

const componentStyle = {
  root: contentStyle.root,
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
  const [inputMode, setInputMode] = useState("C");
  const [currentDebate, setCurrentDebate] = useState(defaultDebateForm);
  const [targetTopic, setTargetTopic] = useState({});
  const [debateList, setDebateList] = useState([]);

  useEffect(() => {
    axios
      .get(backendPointList.topic + "/" + topicId)
      .then((res) => setTargetTopic(res.data[0]))
      .catch((err) => console.log(err));
    axios
      .get(backendPointList.debates + "/" + topicId)
      .then((res) => setDebateList(res.data))
      .catch((err) => console.log(err));
  }, [topicId]);

  const reloadDebateList = () => {
    axios
      .get(backendPointList.debates + "/" + topicId)
      .then((res) => setDebateList(res.data))
      .catch((err) => console.log(err));
  };

  const changeInputMode = (item) => {
    setInputMode("U");
    setCurrentDebate(item);
  };

  const deleteDebate = (item) => {
    axios
      .delete(backendPointList.debates + "/" + item._id)
      .then((res) => reloadDebateList())
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
          <Col sm={8}>{item.content}</Col>
          <Col sm={2}>
            <Button
              variant="outline-warning"
              onClick={(e) => changeInputMode(item)}
            >
              Edit
            </Button>{" "}
            <Button
              variant="outline-danger"
              onClick={(e) => deleteDebate(item)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    ));
  };

  return targetTopic ? (
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
        <hr style={{ borderTop: `1px solid #e9ecef`, margin: `2px` }} />
        <InputForm
          targetTopic={targetTopic}
          updateRow={reloadDebateList}
          inputMode={inputMode}
          setInputMode={setInputMode}
          currentDebate={currentDebate}
          setCurrentDebate={setCurrentDebate}
        />
      </Container>
    </div>
  ) : (
    <Navigate to={routerEndPoint.errors.notFound} />
  );
};

export default TopicContent;
