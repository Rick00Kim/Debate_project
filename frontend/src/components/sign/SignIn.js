import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Card } from "react-bootstrap"
import SignInForm from "./SignInForm"

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

function SignIn(props) {
  const search = useLocation().search
  const { mobileFlg } = props
  const redirectUrl = new URLSearchParams(search).get("redirectUrl")

  const responsiveHeight = {
    height: mobileFlg ? `70vh` : `95vh`,
  }

  const responsiveAuthCard = {
    marginLeft: mobileFlg ? "0%" : "10%",
    marginRight: mobileFlg ? "0%" : "10%",
  }

  return (
    <div style={{ ...componentStyle.root, ...responsiveHeight }}>
      <h1 style={{ textAlign: "center" }}>SIGN IN</h1>
      <Card style={{ ...componentStyle.authCardStyle, ...responsiveAuthCard }}>
        <Card.Body style={componentStyle.authCardBodyStyle}>
          <SignInForm redirectUrl={redirectUrl} />
        </Card.Body>
      </Card>
      <Card style={{ ...componentStyle.authCardStyle, ...responsiveAuthCard }}>
        <Card.Body>
          <small>
            Don't you have a account? <Link to={"/signUp"}>Sign up</Link>
          </small>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SignIn
