import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { backendPointList } from "../common/Constants"
import { topicValidation } from "../common/Validators"
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios"

const componentStyle = {
  root: {
    display: `flex`,
    height: `95vh`,
    flexDirection: `column`,
    marginLeft: `10%`,
    marginRight: `10%`,
  },
}

const validate = {
  title: (v) => topicValidation(v, "title"),
  header: (v) => topicValidation(v, "header"),
  content: (v) => topicValidation(v, "content"),
}

function AddTopic(props) {
  const { topicId } = useParams()
  const { mobileFlg } = props
  const [manageMode, setManageMode] = useState("CREATE")
  const [form, setForm] = useState({
    title: "",
    header: "",
    content: "",
  })
  const { freshList } = props
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const responsiveHeight = {
    height: mobileFlg ? `87vh` : `95vh`,
  }

  useEffect(() => {
    if (topicId !== undefined) {
      setManageMode("MODIFY")
      axios
        .get(backendPointList.topic + "/" + topicId)
        .then((res) => {
          setForm({
            title: res.data.title,
            header: res.data.header,
            content: res.data.content,
          })
        })
        .catch((err) => console.log(err))
    } else {
      setManageMode("CREATE")
      setForm({
        title: "",
        header: "",
        content: "",
      })
    }
  }, [topicId])

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
      if (manageMode === "CREATE") {
        axios
          .post(backendPointList.topic, form)
          .then((res) => {
            freshList()
            setForm({
              title: "",
              header: "",
              content: "",
            })
          })
          .catch((err) => console.log(err))
      } else {
        form["_id"] = topicId
        console.log(form)
        axios
          .put(backendPointList.topic, form)
          .then((res) => {
            freshList()
          })
          .catch((err) => console.log(err))
      }
    }
  }

  return (
    <div style={{ ...componentStyle.root, ...responsiveHeight }}>
      <h1 style={{ marginBottom: `1em` }}>
        Topic Management ({manageMode === "CREATE" ? "Add" : "Modify"})
      </h1>
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
              onChange={(e) => handleInput(e)}
              onBlur={(e) => handleBlur(e)}
              required
              isInvalid={errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
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
              onChange={(e) => handleInput(e)}
              onBlur={(e) => handleBlur(e)}
              required
              isInvalid={errors.header}
            />
            <Form.Control.Feedback type="invalid">
              {errors.header}
            </Form.Control.Feedback>
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
              onChange={(e) => handleInput(e)}
              onBlur={(e) => handleBlur(e)}
              required
              isInvalid={errors.content}
            />
            <Form.Control.Feedback type="invalid">
              {errors.content}
            </Form.Control.Feedback>
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
  )
}

export default AddTopic
