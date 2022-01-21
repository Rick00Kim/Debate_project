import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import TopicListBar from "./components/debate/TopicListBar";
import TopicContent from "./components/debate/TopicContent";
import { backendPointList } from "./components/common/Constants";
import SignIn from "./components/sign/SignIn";
import SignUp from "./components/sign/SignUp";
import IndexPage from "./components/IndexPage";
import AddTopic from "./components/management/AddTopic";
import { useAuth } from "./components/authenticated/auth";
import { getCurrentUser } from "./components/authenticated/AuthService";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import NotFound from "./components/error/NotFound";
import NonPermission from "./components/error/NonPermission";
import Users from "./components/management/Users";

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

function App() {
  const [logged] = useAuth();
  const loggedUser = getCurrentUser();
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

  const RedirectToPath = (props) => {
    const { path } = props;
    return (
      <Navigate
        to={{
          pathname: path,
          state: { from: props.location },
        }}
      />
    );
  };

  const AuthComponent = (props) => {
    return logged ? (
      loggedUser.role === "Manager" ? (
        props.component
      ) : (
        <Navigate to={"/non-permission"} />
      )
    ) : (
      <RedirectToPath path="/signIn" />
    );
  };
  return (
    <div className="App-header">
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
                    <AuthComponent
                      component={
                        <AddTopic topicList={topicList} freshList={freshList} />
                      }
                    />
                  }
                />
                <Route
                  path="/topic/add/:topicId"
                  element={
                    <AuthComponent
                      component={
                        <AddTopic topicList={topicList} freshList={freshList} />
                      }
                    />
                  }
                />
                <Route
                  path="/manage/users"
                  element={<AuthComponent component={<Users />} />}
                />
                <Route path="/not-exists-topic" element={<NotFound />} />
                <Route path="/non-permission" element={<NonPermission />} />
              </Routes>
            </Col>
          </Row>
        </Router>
      </div>
    </div>
  );
}

export default App;
