import React from "react"
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"
import SignUpForm from "./SignUpForm"

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

function SignUp(props) {
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
      <h1 style={{ textAlign: "center" }}>SIGN UP</h1>
      <Card style={{ ...componentStyle.authCardStyle, ...responsiveAuthCard }}>
        <Card.Body style={componentStyle.authCardBodyStyle}>
          <SignUpForm />
        </Card.Body>
      </Card>
      <Card style={{ ...componentStyle.authCardStyle, ...responsiveAuthCard }}>
        <Card.Body>
          <small>
            Do you already have an account? <Link to={"/signIn"}>Sign in</Link>
          </small>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SignUp
