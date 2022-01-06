import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form, FormControl, InputGroup, Button, Col } from "react-bootstrap";
import axios from "axios";
import { backendPointList, defaultDebateForm } from "../CommonComponents";

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
    currentDebate["topicNum"] = props.targetTopic._id;
    console.log("Form -> ", currentDebate);

    if (inputMode === "C") {
      axios
        .post(backendPointList.debates, currentDebate)
        .then((res) => {
          updateRow();
          setField("content", "");
        })
        .then((err) => console.log(err));
    } else {
      axios
        .put(backendPointList.debates, currentDebate)
        .then((res) => {
          updateRow();
          setInputMode("C");
          setCurrentDebate(defaultDebateForm);
        })
        .then((err) => console.log(err));
    }
  };

  return (
    <Form>
      <Form.Row className="align-items-center">
        <Col sm={3}>
          <Form.Label htmlFor="inlineFormInputName" srOnly>
            Name
          </Form.Label>
          <Form.Control
            id="inlineFormInputName"
            placeholder="Username 🎩"
            value={currentDebate.username}
            onChange={(e) => setField("username", e.target.value)}
          />
        </Col>
        <Col sm={7}>
          <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
            Username
          </Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroupUsername"
              placeholder="Email 📮"
              value={currentDebate.email}
              onChange={(e) => setField("email", e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col sm={2} className="my-1">
          <Button block type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={12} className="my-1">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Share your experiences. 👍"
              value={currentDebate.content}
              onChange={(e) => setField("content", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
}
