import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { routerEndPoint } from "../common/Constants";
import { useAuth, logout } from "../authenticated/auth";
import { getCurrentUser } from "../authenticated/AuthService";
import LogoutButton from "../sign/SignOut";
import ManagerComponent from "../management/ManagerComponent";
import "bootstrap/dist/css/bootstrap.css";

const TopicListNavBar = (props) => {
  const [logged] = useAuth();
  const { topicList, setCurrentTopic } = props;
  const [expanded, setExpanded] = useState(false);

  const dropdownClickHandler = (e) => {
    setCurrentTopic(e);
    setExpanded(!expanded);
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
        expanded={expanded}
      >
        <Navbar.Brand href={routerEndPoint.root}>KURURU DEBATE</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={(e) => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          {logged && (
            <h4>
              {getCurrentUser().name} ({getCurrentUser().role})
            </h4>
          )}
          <Nav className="mr-auto">
            <NavDropdown title="Choose Topic" id="collasible-nav-dropdown">
              {topicList.map((e) => (
                <NavDropdown.Item
                  as={NavLink}
                  to={routerEndPoint.debates + e._id}
                  key={"topicElement-" + e._id}
                  onClick={(i) => dropdownClickHandler(e)}
                >
                  {e.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          {logged && (
            <Nav>
              <ManagerComponent
                render={(props) => (
                  <Nav.Link
                    as={NavLink}
                    to={routerEndPoint.addTopic}
                    onClick={(e) => setExpanded(!expanded)}
                  >
                    New Topic
                  </Nav.Link>
                )}
              />
              <ManagerComponent
                render={(props) => (
                  <Nav.Link
                    as={NavLink}
                    to={routerEndPoint.manager.users}
                    onClick={(e) => setExpanded(!expanded)}
                  >
                    Users
                  </Nav.Link>
                )}
              />
              <LogoutButton variant="danger" logout={logout} />
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TopicListNavBar;
