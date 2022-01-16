import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import SignUpForm from "./SignUpForm";

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

function SignUp() {
  return (
    <div style={componentStyle.root}>
      <h1 style={{ textAlign: "center" }}>SIGN UP</h1>
      <Card style={componentStyle.authCardStyle}>
        <Card.Body style={componentStyle.authCardBodyStyle}>
          <SignUpForm />
        </Card.Body>
      </Card>
      <Card style={componentStyle.authCardStyle}>
        <Card.Body>
          <small>
            Do you already have an account? <Link to={"/signIn"}>Sign in</Link>
          </small>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignUp;
