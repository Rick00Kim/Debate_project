import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { backendPointList } from "../common/Constants";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const componentStyle = {
  root: {
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
};

function Users() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const jwt_key = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));
    const headerContents = { Authorization: `Bearer ${jwt_key}` };
    axios
      .get(backendPointList.users, {
        headers: headerContents,
      })
      .then((res) => setUserList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={componentStyle.root}>
      <h1>User Manager</h1>
      <Table bordered hover variant="dark" size="md">
        <thead>
          <tr>
            <th>#</th>
            <th>User name</th>
            <th>Roles</th>
            <th>Menu</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((e, idx) => {
            return (
              <tr key={"user" + idx}>
                <td>{idx + 1}</td>
                <td>{e.name}</td>
                <td>{e.role}</td>
                <td>@mdo</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
