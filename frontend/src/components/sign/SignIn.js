import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import SignInForm from "./SignInForm";

const componentStyle = {
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  authCardStyle: {
    marginTop: "20px",
    marginLeft: "25%",
    marginRight: "25%",
    backgroundColor: "#161b22",
    borderColor: "white",
    borderWidth: "1px",
  },
  authCardBodyStyle: {
    display: "flex",
    flexDirection: "column",
  },
};

function SignIn() {
  return (
    <div style={componentStyle.root}>
      <h1 style={{ textAlign: "center" }}>SIGN IN</h1>
      <Card style={componentStyle.authCardStyle}>
        <Card.Body style={componentStyle.authCardBodyStyle}>
          <SignInForm />
        </Card.Body>
      </Card>
      <Card style={componentStyle.authCardStyle}>
        <Card.Body>
          <small>
            Don't you have a account? <Link to={"/signUp"}>Sign up</Link>
          </small>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignIn;
