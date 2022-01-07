import React, { useState, useEffect, forwardRef } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
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
  defaultDebateForm,
} from "../CommonComponents";
import InputForm from "./InputForm";
import thumbUp from "../../assets/images/thumbs-up-regular.svg";
import thumbUpSolid from "../../assets/images/thumbs-up-solid.svg";
import thumbDown from "../../assets/images/thumbs-down-regular.svg";
import thumbDownSolid from "../../assets/images/thumbs-down-solid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
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

const TopicContent = (props) => {
  const { topicId } = useParams();
  const { freshList } = props;
  const [topicDeleteFlg, setTopicDeleteFlg] = useState(false);
  const [inputMode, setInputMode] = useState("C");
  const [liked, setLiked] = useState(false);
  const [unliked, setUnLiked] = useState(false);
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

  const deleteTopic = (item) => {
    axios
      .delete(backendPointList.topic + "/" + topicId)
      .then((res) => {
        freshList();
        setTopicDeleteFlg(true);
      })
      .catch((err) => console.log(err));
  };

  const renderDebateList = () => {
    return debateList.map((item, idx) => (
      <ListGroup.Item
        bsPrefix
        style={componentStyle.listItem}
        key={"topicnum-" + item._id}
      >
        <Card style={componentStyle.itemContentStyle}>
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
                  id="dropdown-custom-components"
                />
                <Dropdown.Menu>
                  <Dropdown.Item
                    as="button"
                    onClick={(e) => changeInputMode(item)}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={(e) => deleteDebate(item)}
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
    ));
  };

  return targetTopic ? (
    topicDeleteFlg ? (
      <Navigate to={routerEndPoint.root} />
    ) : (
      <div style={componentStyle.root}>
        <Jumbotron
          fluid
          style={{ paddingTop: `2rem`, marginBottom: 10, padding: `20px 0` }}
        >
          <Container style={componentStyle.header}>
            <h1>{targetTopic.header}</h1>
            <p>{targetTopic.content}</p>
          </Container>
          <Button
            variant="outline-danger"
            style={{ position: "absolute", right: "3%", top: "3%" }}
            onClick={() => deleteTopic()}
          >
            DELETE
          </Button>
          <Link to={"/" + routerEndPoint.addTopic + "/" + targetTopic._id}>
            <Button
              variant="outline-info"
              style={{ position: "absolute", right: "3%", top: "9%" }}
            >
              MODIFY
            </Button>
          </Link>
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
    )
  ) : (
    <Navigate to={routerEndPoint.errors.notFound} />
  );
};

export default TopicContent;
