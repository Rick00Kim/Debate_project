import React, { useState } from "react";
import { Button, Collapse, Card } from "react-bootstrap";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";

const componentStyle = {
  root: {
    height: `96vh`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  authDivStyle: {
    minWidth: "40%",
    marginTop: "3%",
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
};

function IndexPage() {
  const [signInFlg, setSignInFlg] = useState(false);
  const [signUpFlg, setSignUpFlg] = useState(false);

  const activeSignIn = () => {
    setSignUpFlg(signUpFlg ? false : signUpFlg);
    setSignInFlg(!signInFlg);
  };

  const activeSignUp = () => {
    setSignInFlg(signInFlg ? false : signInFlg);
    setSignUpFlg(!signUpFlg);
  };

  return (
    <div style={componentStyle.root}>
      <div>
        <h1>🤔 What do you think?</h1>
        <h2>
          🎉 Let's go to <b>DISCUSS</b>!!!
        </h2>
        <h4 style={{ marginTop: `10px` }}>
          👈 You can exchange opinions with many people on various topics
        </h4>
        <div style={{ marginTop: "1em" }}>
          <Button
            variant="outline-light"
            onClick={() => activeSignIn()}
            active={signInFlg}
            aria-controls="example-fade-text"
          >
            Sign in
          </Button>{" "}
          <Button
            variant="outline-success"
            onClick={() => activeSignUp()}
            active={signUpFlg}
            aria-controls="example-fade-text"
          >
            Sign up
          </Button>
        </div>
      </div>
      <div style={componentStyle.authDivStyle}>
        <Collapse in={signInFlg || signUpFlg}>
          <div id="example-fade-text">
            <Card style={componentStyle.authCardStyle}>
              <Card.Body style={componentStyle.authCardBodyStyle}>
                {signInFlg ? <SignInForm /> : signUpFlg ? <SignUpForm /> : ""}
              </Card.Body>
            </Card>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default IndexPage;
