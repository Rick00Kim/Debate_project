import React from "react"
import { useNavigate } from "react-router-dom"
import { routerEndPoint, backendPointList } from "../common/Constants"
import { Button } from "react-bootstrap"
import axios from "axios"
import { getAuthHeader } from "../authenticated/AuthService"

function DeleteTopicBtn(props) {
  const navigate = useNavigate()
  const { freshList, topicId } = props

  const deleteTopic = (item) => {
    axios
      .delete(backendPointList.topic + "/" + topicId, {
        headers: getAuthHeader(),
      })
      .then((res) => {
        freshList()
        navigate(routerEndPoint.root)
      })
      .catch((err) => {
        console.log(err)
        navigate(routerEndPoint.errors.nonPermission)
      })
  }

  return (
    <Button block variant="danger" onClick={() => deleteTopic()}>
      DELETE
    </Button>
  )
}

export default DeleteTopicBtn
