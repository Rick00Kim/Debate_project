import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Container, Row, ListGroup, Button } from "react-bootstrap";
import { contentStyle, routerEndPoint } from "../common/Constants";
import { useAuth, logout } from "../authenticated/auth";
import { getCurrentUser } from "../authenticated/AuthService";
import LogoutButton from "../sign/SignOut";
import ManagerComponent from "../management/ManagerComponent";
import "bootstrap/dist/css/bootstrap.css";

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
    left: "5%",
  },
  usersStyle: {
    right: "10%",
    bottom: "11%",
  },
  topicListStyle: {
    height: `65vh`,
    maxHeight: `65vh`,
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
  const [logged] = useAuth();
  const { topicList, currentTopic, setCurrentTopic } = props;

  const UserInfo = () => {
    return (
      logged && (
        <Container>
          <ManagerComponent
            render={(props) => (
              <Link
                to={routerEndPoint.manager.users}
                style={componentStyle.usersStyle}
                {...props}
              >
                <Button block variant="outline-warning">
                  Users
                </Button>
              </Link>
            )}
          />
          <h3>{getCurrentUser().name}</h3>
          <h4>Role: {getCurrentUser().role}</h4>
          <LogoutButton logout={logout} />
        </Container>
      )
    );
  };

  return (
    <div style={componentStyle.root}>
      <Row style={componentStyle.rowStyle}>
        <Link to={routerEndPoint.root} style={componentStyle.rootLinkStyle}>
          <h3 style={componentStyle.headerStyle}>Choose Topic</h3>
        </Link>
        <ManagerComponent
          render={(props) => (
            <Link
              to={routerEndPoint.addTopic}
              style={componentStyle.newBtnStyle}
            >
              <Button variant="light">New</Button>
            </Link>
          )}
        />
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
              key={"topic" + e._id}
              onClick={(i) => setCurrentTopic(e)}
            >
              {e.title}
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
      <Jumbotron fluid style={componentStyle.userInfoStyle}>
        <UserInfo />
      </Jumbotron>
    </div>
  );
};

export default TopicListBar;
