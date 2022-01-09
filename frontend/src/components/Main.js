import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import TopicListBar from "./debate/TopicListBar";
import TopicContent from "./debate/TopicContent";
import { backendPointList } from "./common/Constants";
import SignIn from "./authenticated/SignIn";
import SignUp from "./authenticated/SignUp";
import IndexPage from "./IndexPage";
import AddTopic from "./management/AddTopic";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { NotFound } from "./error/NotFound";

const componentStyle = {
  mainStyle: {
    color: `#e9ecef`,
    width: `100vw`,
    height: `100vh`,
    padding: 20,
  },
  contentColStyle: {
    color: `#e8dbdb`,
    borderLeftStyle: `solid`,
    borderLeftWidth: `thin`,
  },
};

const DebateIndex = (props) => {
  const [currentTopic, setCurrentTopic] = useState({});
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    freshList();
  }, []);

  const freshList = () => {
    axios
      .get(backendPointList.topic)
      .then((res) => setTopicList(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div style={componentStyle.mainStyle}>
      <Router>
        <Row>
          <Col sm={3}>
            <TopicListBar
              topicList={topicList}
              currentTopic={currentTopic}
              setCurrentTopic={setCurrentTopic}
            />
          </Col>
          <Col sm={9} style={componentStyle.contentColStyle}>
            <Routes>
              <Route exact path="/" element={<IndexPage />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route
                path="/debates/:topicId"
                element={<TopicContent freshList={freshList} />}
              />
              <Route
                path="/topic/add"
                element={
                  <AddTopic topicList={topicList} freshList={freshList} />
                }
              />
              <Route
                path="/topic/add/:topicId"
                element={
                  <AddTopic topicList={topicList} freshList={freshList} />
                }
              />
              <Route path="/NotFound" element={<NotFound />} />
            </Routes>
          </Col>
        </Row>
      </Router>
    </div>
  );
};

export default DebateIndex;
