import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link, useLocation } from "react-router-dom";
import {
  Container,
  Jumbotron,
  ListGroup,
  Button,
  Row,
  Col,
} from "react-bootstrap";
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
import ManagerComponent from "../management/ManagerComponent";
import { getAuthHeader } from "../authenticated/AuthService";

const componentStyle = {
  root: contentStyle.root,
  header: {
    color: `#585858`,
  },
  list: {
    color: `#585858`,
    paddingLeft: 15,
    paddingRight: 15,
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
};

function TopicContent(props) {
  const [logged] = useAuth();
  const location = useLocation();
  const { topicId } = useParams();
  const { freshList, mobileFlg } = props;
  const [inputMode, setInputMode] = useState("C");
  const [currentDebate, setCurrentDebate] = useState(emptyDebateForm);
  const [targetTopic, setTargetTopic] = useState({});
  const [debateList, setDebateList] = useState([]);

  useEffect(() => {
    axios
      .get(backendPointList.topic + "/" + topicId)
      .then((res) => setTargetTopic(res.data))
      .catch((err) => console.log(err));
    reloadDebateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  const reloadDebateList = () => {
    const headerContents = logged ? getAuthHeader() : "";
    axios
      .get(backendPointList.debates + "/" + topicId, {
        headers: headerContents,
      })
      .then((res) => setDebateList(res.data))
      .catch((err) => console.log(err));
  };

  const changeInputMode = (item) => {
    setInputMode("U");
    setCurrentDebate(item);
  };

  const deleteDebate = (item) => {
    axios
      .delete(backendPointList.debates + "/" + item._id, {
        headers: getAuthHeader(),
      })
      .then((res) => reloadDebateList())
      .catch((err) => console.log(err));
  };

  const responsiveHeight = {
    height: mobileFlg ? `87vh` : `95vh`,
  };

  return targetTopic ? (
    <div style={{ ...componentStyle.root, ...responsiveHeight }}>
      <ManagerComponent
        render={(props) => (
          <Row style={componentStyle.manageBtnStyle} {...props}>
            <Col xs={6}>
              <Link to={"/" + routerEndPoint.addTopic + "/" + targetTopic._id}>
                <Button block variant="info">
                  MODIFY
                </Button>
              </Link>
            </Col>
            <Col xs={6}>
              <DeleteTopicBtn freshList={freshList} topicId={topicId} />
            </Col>
          </Row>
        )}
      />
      <Jumbotron
        fluid
        style={{ paddingTop: `2rem`, marginBottom: 10, padding: `20px 0` }}
      >
        <Container style={componentStyle.header}>
          <h1>{targetTopic.header}</h1>
          <p>{targetTopic.content}</p>
        </Container>
      </Jumbotron>
      <Container style={componentStyle.list} fluid="md">
        {debateList.length === 0 ? (
          <div style={{ color: "white", margin: "3%" }}>
            <h1>No Contents yet</h1>
          </div>
        ) : (
          <ListGroup variant="flush">
            {debateList.map((item, idx) => (
              <DebateList
                key={"topic-" + idx}
                item={item}
                changeInputMode={changeInputMode}
                deleteDebate={deleteDebate}
              />
            ))}
          </ListGroup>
        )}
      </Container>
      {logged ? (
        <Container style={{ fontSize: `15px`, padding: 0 }} fluid="md">
          <hr style={{ borderTop: `1px solid #e9ecef`, margin: `2px` }} />
          <InputForm
            targetTopic={targetTopic}
            updateRow={reloadDebateList}
            inputMode={inputMode}
            setInputMode={setInputMode}
            currentDebate={currentDebate}
            setCurrentDebate={setCurrentDebate}
            mobileFlg={mobileFlg}
          />
        </Container>
      ) : (
        <Link
          to={"/signIn?redirectUrl=" + location.pathname}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outline-warning" size="lg" block>
            Do you wanna participate in this topic? Let's sign in 🎩
          </Button>
        </Link>
      )}
    </div>
  ) : (
    <Navigate to={routerEndPoint.errors.notFound} />
  );
}

export default TopicContent;
