import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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

function SignInForm() {
  return (
    <Form style={componentStyle.root}>
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
      <Form.Label style={{ textAlign: "right" }}>
        <small className="text-muted" style={{ fontSize: "65%" }}>
          🔐 Forgot you email or password? <Link to={"fe"}>Click here</Link>
        </small>
      </Form.Label>
      <Button variant="primary" size="lg" block style={{ marginTop: "0.5em" }}>
        Sign in
      </Button>
    </Form>
  );
}

export default SignInForm;
