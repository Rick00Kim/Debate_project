import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export default function InputForm() {
  const [form, setForm] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
              onChange={(e) => setField("content", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
}
