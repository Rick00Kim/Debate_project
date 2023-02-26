import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Collapse, Card } from "react-bootstrap"
import SignInForm from "./sign/SignInForm"
import { useAuth } from "./authenticated/auth"
import "bootstrap/dist/css/bootstrap.css"

const componentStyle = {
  root: {
    height: `95vh`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  authDivStyle: {
    minWidth: "40%",
    marginTop: "2%",
    marginBottom: "1%",
  },
  authCardStyle: {
    backgroundColor: "#161b22",
    borderColor: "white",
    borderWidth: "2px",
  },
  authCardBodyStyle: {
    display: "flex",
    flexDirection: "column",
  },
}

function IndexPage(props) {
  const [logged] = useAuth()
  const [signInFlg, setSignInFlg] = useState(false)
  const { mobileFlg } = props

  const responsiveHeight = {
    height: mobileFlg ? `87vh` : `95vh`,
  }
  return (
    <div style={{ ...componentStyle.root, ...responsiveHeight }}>
      <div>
        <h1>🤔 What do you think?</h1>
        <h2>
          🎉 Let's go to <b>DISCUSS</b>!!!
        </h2>
        <h4 style={{ marginTop: `10px` }}>
          👈 You can exchange opinions with many people on various topics
        </h4>
      </div>
      {!logged && (
        <>
          <div style={{ marginTop: "1%" }}>
            <Button
              variant="outline-warning"
              onClick={() => setSignInFlg(!signInFlg)}
              active={signInFlg}
              aria-controls="example-fade-text"
            >
              Let's start with sign in
            </Button>{" "}
            <Link to={"/signUp"}>
              <Button variant="outline-success">Sign up</Button>
            </Link>
          </div>
          <div style={componentStyle.authDivStyle}>
            <Collapse in={signInFlg}>
              <div id="example-fade-text">
                <Card style={componentStyle.authCardStyle}>
                  <Card.Body style={componentStyle.authCardBodyStyle}>
                    <SignInForm />
                  </Card.Body>
                </Card>
              </div>
            </Collapse>
          </div>
        </>
      )}
    </div>
  )
}

export default IndexPage
