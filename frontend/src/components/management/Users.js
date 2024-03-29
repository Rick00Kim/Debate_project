import React, { useState, useEffect } from "react"
import { Table } from "react-bootstrap"
import { backendPointList } from "../common/Constants"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { getAuthHeader } from "../authenticated/AuthService"

const componentStyle = {
  root: {
    display: "flex",
    flexDirection: "column",
    color: "white",
    height: `95vh`,
  },
  scroll: {
    overflowY: "auto",
    position: "relative",
  },
}

function Users(props) {
  const [userList, setUserList] = useState([])
  const { mobileFlg } = props

  const responsiveHeight = {
    height: mobileFlg ? `87vh` : `95vh`,
  }

  useEffect(() => {
    axios
      .get(backendPointList.users, {
        headers: getAuthHeader(),
      })
      .then((res) => setUserList(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div style={{ ...componentStyle.root, ...responsiveHeight }}>
      <h1>User Manager</h1>
      <Table bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>User name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody style={componentStyle.scroll}>
          {userList.map((e, idx) => {
            return (
              <tr key={"user" + idx}>
                <td>{idx + 1}</td>
                <td>{e.name}</td>
                <td>{e.role}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
