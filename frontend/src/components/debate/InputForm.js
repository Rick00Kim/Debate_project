import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form, FormControl, InputGroup, Button, Col } from "react-bootstrap";
import axios from "axios";
import { backendPointList, emptyDebateForm } from "../common/Constants";
import ShowToast from "../common/ShowToast";

export default function InputForm(props) {
  const {
    currentDebate,
    setCurrentDebate,
    updateRow,
    inputMode,
    setInputMode,
  } = props;

  const setField = (field, value) => {
    setCurrentDebate({
      ...currentDebate,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentDebate.content) {
      return;
    }

    currentDebate["topicNum"] = props.targetTopic._id;

    let jwt_key = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));

    if (inputMode === "C") {
      axios
        .post(backendPointList.debates, currentDebate, {
          headers: { Authorization: `Bearer ${jwt_key}` },
        })
        .then((res) => {
          updateRow();
          setField("content", "");
        })
        .then((err) => console.log(err));
    } else {
      axios
        .put(backendPointList.debates, currentDebate, {
          headers: { Authorization: `Bearer ${jwt_key}` },
        })
        .then((res) => {
          updateRow();
          setInputMode("C");
          setCurrentDebate(emptyDebateForm);
        })
        .then((err) => console.log(err));
    }
  };
  const handleReset = (e) => {
    setField("content", "");
  };

  return (
    <Form>
      <Form.Row>
        <Col sm={10} className="my-1">
          <Form.Group controlId="contentArea">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Share your experiences. 👍"
              value={currentDebate.content}
              onChange={(e) => setField("content", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={2} className="my-1">
          <Button block variant="success" type="submit" onClick={handleSubmit}>
            {inputMode === "C" ? "Submit" : "Edit"}
          </Button>
          <Button
            block
            variant="outline-danger"
            type="button"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}
