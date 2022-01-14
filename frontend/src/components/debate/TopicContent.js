import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link, useLocation } from "react-router-dom";
import { Container, Jumbotron, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import {
  routerEndPoint,
  backendPointList,
  contentStyle,
  emptyDebateForm,
} from "../common/Constants";
import InputForm from "./InputForm";
import { useAuth } from "../authenticated/auth";
import DebateList from "./DebateList";
import "bootstrap/dist/css/bootstrap.css";
import DeleteTopicBtn from "../topic/DeleteTopicBtn";

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
    textAlign: `left`,
    marginTop: 10,
  },
  listItemRow: {
    padding: `10px 0`,
  },
  itemContentStyle: {
    flexDirection: "row",
    whiteSpace: "pre-wrap",
  },
  itemBodyStyle: {
    padding: "10px",
  },
  itemFooterStyle: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  likeButtonStyle: {
    height: "40px",
    cursor: "pointer",
  },
  thumbUpDownStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  thumbIconDivStyle: {
    marginLeft: 15,
    marginRight: 20,
    display: "flex",
    flexDirection: "column",
  },
  manageBtnStyle: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    right: "3%",
    top: "3%",
  },
};

function TopicContent(props) {
  const [logged] = useAuth();
  const location = useLocation();
  const { topicId } = useParams();
  const { freshList } = props;
  const [inputMode, setInputMode] = useState("C");
  const [currentDebate, setCurrentDebate] = useState(emptyDebateForm);
  const [targetTopic, setTargetTopic] = useState({});
  const [debateList, setDebateList] = useState([]);

  useEffect(() => {
    axios
      .get(backendPointList.topic + "/" + topicId)
      .then((res) => setTargetTopic(res.data))
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
    const jwt_key = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));
    axios
      .delete(backendPointList.debates + "/" + item._id, {
        headers: { Authorization: `Bearer ${jwt_key}` },
      })
      .then((res) => reloadDebateList())
      .catch((err) => console.log(err));
  };

  const renderDebateList = () => {
    return debateList.map((item, idx) => (
      <DebateList
        item={item}
        changeInputMode={changeInputMode}
        deleteDebate={deleteDebate}
      />
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
        <div style={componentStyle.manageBtnStyle}>
          <DeleteTopicBtn freshList={freshList} topicId={topicId} />
          <Link to={"/" + routerEndPoint.addTopic + "/" + targetTopic._id}>
            <Button variant="outline-info">MODIFY</Button>
          </Link>
        </div>
      </Jumbotron>
      <Container style={componentStyle.list}>
        <ListGroup variant="flush">{renderDebateList()}</ListGroup>
      </Container>
      {logged ? (
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
      ) : (
        <Link
          to={"/signIn?redirectUrl=" + location.pathname}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outline-warning" size="lg" block>
            Do you wanna join this topic? Let's sign in 🎩
          </Button>
        </Link>
      )}
    </div>
  ) : (
    <Navigate to={routerEndPoint.errors.notFound} />
  );
}

export default TopicContent;
