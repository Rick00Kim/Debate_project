import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import TopicListBar from "./TopicListBar";
import TopicContent from "./TopicContent";
import { DefaultPage } from "./CommonComponents";

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

  return (
    <div style={componentStyle.mainStyle}>
      <Router>
        <Row>
          <Col sm={3}>
            <TopicListBar
              currentTopic={currentTopic}
              setCurrentTopic={setCurrentTopic}
            />
          </Col>
          <Col sm={9} style={componentStyle.contentColStyle}>
            <Routes>
              <Route exact path="/" element={<DefaultPage />} />
              <Route path="/debate/:topicId" element={<TopicContent />} />
            </Routes>
          </Col>
        </Row>
      </Router>
    </div>
  );
};

export default DebateIndex;
