import React from "react"
import { Card } from "react-bootstrap"
import InitializePasswordForm from "./InitializePasswordForm"

const componentStyle = {
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  authCardStyle: {
    marginTop: "20px",
    backgroundColor: "#161b22",
    borderColor: "white",
    borderWidth: "1px",
  },
  authCardBodyStyle: {
    display: "flex",
    flexDirection: "column",
  },
}

function InitializePassword(props) {
  const { mobileFlg } = props

  const responsiveHeight = {
    height: mobileFlg ? `70vh` : `95vh`,
  }

  const responsiveAuthCard = {
    marginLeft: mobileFlg ? "0%" : "10%",
    marginRight: mobileFlg ? "0%" : "10%",
  }

  return (
    <div style={{ ...componentStyle.root, ...responsiveHeight }}>
      <h1 style={{ textAlign: "center" }}>Initialize password</h1>
      <Card style={{ ...componentStyle.authCardStyle, ...responsiveAuthCard }}>
        <Card.Body style={componentStyle.authCardBodyStyle}>
          <InitializePasswordForm />
        </Card.Body>
      </Card>
    </div>
  )
}

export default InitializePassword
