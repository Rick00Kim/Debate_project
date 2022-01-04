import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function InputForm(props) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    content: "",
  });
  const { updateRow } = props;
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    form["topicNum"] = props.targetTopicIdx;
    console.log(form);
    axios
      .post("/api/debates", form)
      .then((res) => {
        updateRow();
        setForm("content", "");
      })
      .then((err) => console.log(err));
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
            value={form.username}
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
              value={form.email}
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
              value={form.content}
              onChange={(e) => setField("content", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
}