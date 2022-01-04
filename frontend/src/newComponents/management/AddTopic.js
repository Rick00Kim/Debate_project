import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

const componentStyle = {
  root: {
    display: `flex`,
    height: `95vh`,
    flexDirection: `column`,
    marginLeft: `10%`,
    marginRight: `10%`,
  },
};

function AddTopic(props) {
  const [form, setForm] = useState({
    title: "",
    header: "",
    content: "",
  });
  const { freshList } = props;

  const setField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/topic", form)
      .then((res) => {
        freshList();
        setForm({
          title: "",
          header: "",
          content: "",
        });
      })
      .then((err) => console.log(err));
  };

  return (
    <div style={componentStyle.root}>
      <h1 style={{ marginBottom: `1em` }}>New topic</h1>
      <Form>
        <Form.Group as={Row} controlId="formTitle">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="Topic title"
              name="title"
              value={form.title}
              onChange={(e) => setField(e)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHeader">
          <Form.Label column sm={2}>
            Header
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="Topic header"
              name="header"
              value={form.header}
              onChange={(e) => setField(e)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formContent">
          <Form.Label column sm={2}>
            Content
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="Topic content"
              name="content"
              value={form.content}
              onChange={(e) => setField(e)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AddTopic;
