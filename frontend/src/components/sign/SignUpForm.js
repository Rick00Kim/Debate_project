import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { backendPointList, routerEndPoint } from "../common/Constants";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../common/Validators";
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

const validate = {
  email: (v) => emailValidation(v),
  password: (v) => passwordValidation(v),
  name: (v) => nameValidation(v),
};

function SignUpForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleInput = (props) => {
    const { name, value } = props.target;
    setForm({
      ...form,
      [name]: value,
    });
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleBlur = (props) => {
    const { name, value } = props.target;
    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValidation = Object.keys(form).reduce(
      (acc, key) => {
        const newError = validate[key](form[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched },
      }
    );

    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    if (
      !Object.values(formValidation.errors).length &&
      Object.values(formValidation.touched).length ===
        Object.values(form).length &&
      Object.values(formValidation.touched).every((t) => t === true)
    ) {
      axios
        .post(backendPointList.signup, form)
        .then((res) => {
          navigate(routerEndPoint.root);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Form style={componentStyle.root} autoComplete="off">
      <Form.Group controlId="formEmail" style={componentStyle.formGroupStyle}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={form.email}
          onChange={(e) => handleInput(e)}
          onBlur={(e) => handleBlur(e)}
          required
          isInvalid={errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
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
          onBlur={(e) => handleBlur(e)}
          autoComplete="off"
          isInvalid={errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formName" style={componentStyle.formGroupStyle}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={form.name}
          onChange={(e) => handleInput(e)}
          onBlur={(e) => handleBlur(e)}
          isInvalid={errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
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
