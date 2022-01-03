import React, { useState, useEffect, Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const componentStyle = {
  listGroupItemStyle: {
    padding: `0.3rem 1rem`,
  },
};

const TopicListBar = (props) => {
  const [topicList, setTopicList] = useState([]);
  const { currentTopic, setCurrentTopic } = props;

  useEffect(() => {
    axios
      .get("/api/topic")
      .then((res) => setTopicList(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Fragment>
      <h3 style={{ paddingBottom: 20, margin: 0 }}>Choose Topic</h3>
      <ListGroup style={{ fontSize: `20px`, borderRadius: `40px` }}>
        {topicList.map((e) => (
          <Link
            to={`debate/${e._id}`}
            style={{ textDecoration: "none" }}
            key={`topicKey-${e._id}`}
          >
            {console.log(e)}
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
