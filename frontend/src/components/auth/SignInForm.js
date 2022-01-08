import React from "react";
import { Form, Button } from "react-bootstrap";

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

function SignInForm() {
  return (
    <Form style={componentStyle.root}>
      <h1 style={{ textAlign: "center" }}>SIGN IN</h1>
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
      <Button variant="primary" size="lg" block style={{ marginTop: "0.5em" }}>
        Sign in
      </Button>
    </Form>
  );
}

export default SignInForm;
