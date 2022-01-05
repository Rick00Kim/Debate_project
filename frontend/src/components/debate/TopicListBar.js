import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, ListGroup, Button } from "react-bootstrap";

const componentStyle = {
  listGroupItemStyle: {
    padding: `0.3rem 1rem`,
  },
};

const TopicListBar = (props) => {
  const { topicList, currentTopic, setCurrentTopic } = props;

  return (
    <Fragment>
      <Row style={{ justifyContent: "center" }}>
        <Link to={`/`} style={{ color: "#fdfdfe", textDecoration: "none" }}>
          <h3 style={{ paddingBottom: 20, margin: 0 }}>Choose Topic</h3>
        </Link>
        <Link to={`topic/add`} style={{ position: "absolute", right: "5%" }}>
          <Button variant="light">New</Button>
        </Link>
      </Row>
      <ListGroup style={{ fontSize: `20px`, borderRadius: `40px` }}>
        {topicList.map((e) => (
          <Link
            to={`debate/${e._id}`}
            style={{ textDecoration: "none" }}
            key={`topicKey-${e._id}`}
          >
            <ListGroup.Item
              style={componentStyle.listGroupItemStyle}
              action
              active={currentTopic._id === e._id}
              variant="light"
              as="div"
              href={"debate/" + e._id}
              key={"topicIdx" + e._id}
              onClick={(i) => setCurrentTopic(e)}
            >
              {e.title}
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </Fragment>
  );
};

export default TopicListBar;
