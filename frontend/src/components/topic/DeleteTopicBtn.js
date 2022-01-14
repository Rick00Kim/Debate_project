import React from "react";
import { useNavigate } from "react-router-dom";
import { routerEndPoint, backendPointList } from "../common/Constants";
import { Button } from "react-bootstrap";
import axios from "axios";

function DeleteTopicBtn(props) {
  const navigate = useNavigate();
  const { freshList, topicId } = props;

  const deleteTopic = (item) => {
    const jwt_key = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));
    axios
      .delete(backendPointList.topic + "/" + topicId, {
        headers: { Authorization: `Bearer ${jwt_key}` },
      })
      .then((res) => {
        freshList();
        navigate(routerEndPoint.root);
      })
      .catch((err) => {
        console.log(err);
        navigate(routerEndPoint.errors.nonPermission);
      });
  };

  return (
    <Button variant="outline-danger" onClick={() => deleteTopic()}>
      DELETE
    </Button>
  );
}

export default DeleteTopicBtn;
