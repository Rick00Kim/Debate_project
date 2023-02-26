import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { emailValidation, passwordValidation } from "../common/Validators"
import { routerEndPoint, backendPointList } from "../common/Constants"
import { login } from "../authenticated/auth"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"

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
  dangerMsgStyle: {
    fontSize: "20px",
  },
}

const validate = {
  email: (v) => emailValidation(v),
  password: (v) => passwordValidation(v),
}

function SignInForm(props) {
  const navigate = useNavigate()
  const { redirectUrl } = props
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(false)

  const handleInput = (props) => {
    const { name, value } = props.target
    setForm({
      ...form,
      [name]: value,
    })
    setTouched({
      ...touched,
      [name]: true,
    })
  }

  const handleBlur = (props) => {
    const { name, value } = props.target
    const { [name]: removedError, ...rest } = errors
    const error = validate[name](value)
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formValidation = Object.keys(form).reduce(
      (acc, key) => {
        const newError = validate[key](form[key])
        const newTouched = { [key]: true }
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        }
      },
      {
        errors: { ...errors },
        touched: { ...touched },
      }
    )

    setErrors(formValidation.errors)
    setTouched(formValidation.touched)

    if (
      !Object.values(formValidation.errors).length &&
      Object.values(formValidation.touched).length ===
        Object.values(form).length &&
      Object.values(formValidation.touched).every((t) => t === true)
    ) {
      axios
        .post(backendPointList.auth, form)
        .then((response) => response.data)
        .then((result) => {
          if (result.status === "SUCCESS") {
            login(result.access_token)
            if (result.requreInitPassword === true) {
              navigate(routerEndPoint.initPassword)
            } else {
              navigate(redirectUrl == null ? "/" : redirectUrl)
            }
          } else {
            setServerError(true)
            setForm({
              email: "",
              password: "",
            })
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div>
      <Alert
        key={"danger-msg"}
        variant={"danger"}
        show={serverError}
        style={componentStyle.dangerMsgStyle}
      >
        Failed Login (Please check your email or password)
      </Alert>
      <Form style={componentStyle.root}>
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
            placeholder="Password"
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
        <Form.Label style={{ textAlign: "right" }}>
          <small className="text-muted" style={{ fontSize: "65%" }}>
            🔐 Forgot you email or password? <Link to={"fe"}>Click here</Link>
          </small>
        </Form.Label>
        <Button
          variant="primary"
          size="lg"
          type="submit"
          block
          style={{ marginTop: "0.5em" }}
          onClick={(e) => handleSubmit(e)}
        >
          Sign in
        </Button>
      </Form>
    </div>
  )
}

export default SignInForm
