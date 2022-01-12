import React, { useState, forwardRef } from "react";
import {
  Container,
  Jumbotron,
  ListGroup,
  Card,
  Image,
  Dropdown,
  Button,
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
import thumbUp from "../../assets/images/thumbs-up-regular.svg";
import thumbUpSolid from "../../assets/images/thumbs-up-solid.svg";
import thumbDown from "../../assets/images/thumbs-down-regular.svg";
import thumbDownSolid from "../../assets/images/thumbs-down-solid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

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

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href="#!"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{
      color: "#212529",
      textDecoration: "none",
      position: "absolute",
      fontSize: 20,
      marginRight: 15,
    }}
  >
    <FontAwesomeIcon icon={faEllipsisV} />
    {children}
  </a>
));

function DebateList(props) {
  const { item, changeInputMode, deleteDebate } = props;
  const [liked, setLiked] = useState(false);
  const [unliked, setUnLiked] = useState(false);

  return (
    <ListGroup.Item
      bsPrefix
      style={componentStyle.listItem}
      key={"debate-" + item._id}
    >
      <Card style={componentStyle.itemContentStyle} key={"debate-" + item._id}>
        <Card.Body style={componentStyle.itemBodyStyle}>
          <Card.Title>{item.username}</Card.Title>
          <Card.Text>{item.content}</Card.Text>
        </Card.Body>
        <Card.Footer style={componentStyle.itemFooterStyle}>
          <div style={componentStyle.thumbUpDownStyle}>
            <div style={componentStyle.thumbIconDivStyle}>
              <Image
                src={liked ? thumbUpSolid : thumbUp}
                rounded
                style={componentStyle.likeButtonStyle}
                onClick={() => setLiked(!liked)}
              />
              2321
            </div>
            <div style={componentStyle.thumbIconDivStyle}>
              <Image
                src={unliked ? thumbDownSolid : thumbDown}
                rounded
                style={componentStyle.likeButtonStyle}
                onClick={() => setUnLiked(!unliked)}
              />
              2030
            </div>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id={"dropdown-custom-components-" + item._id}
              />
              <Dropdown.Menu>
                <Dropdown.Item
                  as="button"
                  onClick={(e) => changeInputMode(item)}
                  eventKey="1"
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={(e) => deleteDebate(item)}
                  eventKey="2"
                >
                  Delete
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button" disabled>
                  <small className="text-muted">
                    Create on {item.create_on}
                  </small>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Footer>
      </Card>
    </ListGroup.Item>
  );
}

export default DebateList;
