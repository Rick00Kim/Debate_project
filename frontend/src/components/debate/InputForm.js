import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import { Form, Button, Col } from "react-bootstrap"
import axios from "axios"
import { backendPointList, emptyDebateForm } from "../common/Constants"
import { getAuthHeader } from "../authenticated/AuthService"

export default function InputForm(props) {
  const {
    currentDebate,
    setCurrentDebate,
    updateRow,
    inputMode,
    setInputMode,
    mobileFlg,
  } = props

  const setField = (field, value) => {
    setCurrentDebate({
      ...currentDebate,
      [field]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!currentDebate.content) {
      return
    }

    currentDebate["topicNum"] = props.targetTopic._id

    if (inputMode === "C") {
      axios
        .post(backendPointList.debates, currentDebate, {
          headers: getAuthHeader(),
        })
        .then((res) => {
          updateRow()
          setField("content", "")
        })
        .catch((err) => console.log(err))
    } else {
      axios
        .put(backendPointList.debates, currentDebate, {
          headers: getAuthHeader(),
        })
        .then((res) => {
          updateRow()
          setInputMode("C")
          setCurrentDebate(emptyDebateForm)
        })
        .catch((err) => console.log(err))
    }
  }
  const handleReset = (e) => {
    setField("content", "")
  }

  return (
    <Form>
      <Form.Row>
        <Col sm={mobileFlg ? 12 : 10} lg={mobileFlg ? 12 : 10} className="my-1">
          <Form.Group controlId="contentArea">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Share your experiences. 👍"
              value={currentDebate.content}
              onChange={(e) => setField("content", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={mobileFlg ? 12 : 2} lg={mobileFlg ? 12 : 2} className="my-2">
          <Button block variant="success" type="submit" onClick={handleSubmit}>
            {inputMode === "C" ? "Submit" : "Edit"}
          </Button>
          {!mobileFlg && (
            <Button
              block
              variant="outline-danger"
              type="button"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
        </Col>
      </Form.Row>
    </Form>
  )
}
