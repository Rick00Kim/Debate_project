import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const componentStyle = {
  root: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  formGroupStyle: {
    alignItems: "center",
    fontSize: "20px",
  },
};

function SignUpForm() {
  return (
    <Form style={componentStyle.root}>
      <h1 style={{ textAlign: "center" }}>SIGN UP</h1>
      <Form.Group controlId="formEmail" style={componentStyle.formGroupStyle}>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group
        controlId="formPassword"
        style={componentStyle.formGroupStyle}
      >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group
        controlId="formPassword"
        style={componentStyle.formGroupStyle}
      >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>
      <Button variant="primary" size="lg" block style={{ marginTop: "0.5em" }}>
        Sign up
      </Button>
    </Form>
  );
}

export default SignUpForm;
