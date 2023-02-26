import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Alert } from "react-bootstrap"
import { passwordValidation } from "../common/Validators"
import { backendPointList } from "../common/Constants"
import { getAuthHeader } from "../authenticated/AuthService"
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
  password: (v) => passwordValidation(v),
  confirmPassword: (v) => passwordValidation(v),
}

function InitializePasswordForm(props) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
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
        .post(backendPointList.initPassword, form, {
          headers: getAuthHeader(),
        })
        .then((response) => response.data)
        .then((result) => {
          if (result.result === "SUCCESS") {
            navigate("/")
          } else {
            setServerError(true)
            setForm({
              password: "",
              confirmPassword: "",
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
        Error occured
      </Alert>
      <Form style={componentStyle.root}>
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
        <Form.Group
          controlId="formConfirmPassword"
          style={componentStyle.formGroupStyle}
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={(e) => handleInput(e)}
            onBlur={(e) => handleBlur(e)}
            autoComplete="off"
            isInvalid={errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          size="lg"
          type="submit"
          block
          style={{ marginTop: "0.5em" }}
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default InitializePasswordForm
