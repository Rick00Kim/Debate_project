import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

const SideBar = (props) => {
  const { open } = props;
  const [show, setShow] = useState(true);

  const active = !open;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <nav id="sidebar" className={active ? "active" : null}>
      <div class="sidebar-header">
        <h3>Bootstrap Sidebar</h3>
      </div>

      <ul class="list-unstyled components">
        <p>Dummy Heading</p>
        <li class="active">
          <a
            href="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            Home
          </a>
        </li>
      </ul>
    </nav>
  );
};

class SideBar2 extends React.Component {
  state = { active: !this.props.open || true };

  render = () => {
    const { open } = this.props;
    const active = !open;

    return (
      <nav id="sidebar" className={active ? "active" : null}>
        <div class="sidebar-header">
          <h3>Bootstrap Sidebar</h3>
        </div>

        <ul class="list-unstyled components">
          <p>Dummy Heading</p>
          <li class="active">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle"
            >
              Home
            </a>
            <ul class="collapse list-unstyled" id="homeSubmenu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    );
  };
}

export default SideBar;
