import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { backendPointList, routerEndPoint } from "../common/Constants";
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
  const [signUpFlg, setSignUpFlg] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInput = (props) => {
    const { name, value } = props.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(backendPointList.signup, form)
      .then((res) => {
        setSignUpFlg(true);
      })
      .catch((err) => console.log(err));
  };

  return signUpFlg ? (
    <Navigate to={routerEndPoint.root} />
  ) : (
    <Form style={componentStyle.root}>
      <Form.Group controlId="formEmail" style={componentStyle.formGroupStyle}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={form.email}
          onChange={(e) => handleInput(e)}
        />
      </Form.Group>
      <Form.Group
        controlId="formPassword"
        style={componentStyle.formGroupStyle}
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          name="password"
          value={form.password}
          onChange={(e) => handleInput(e)}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group controlId="formName" style={componentStyle.formGroupStyle}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={form.name}
          onChange={(e) => handleInput(e)}
        />
      </Form.Group>
      <Button
        variant="primary"
        size="lg"
        block
        style={{ marginTop: "0.5em" }}
        onClick={(e) => handleSubmit(e)}
      >
        Sign up
      </Button>
    </Form>
  );
}

export default SignUpForm;
