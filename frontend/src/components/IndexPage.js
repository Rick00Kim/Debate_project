import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const componentStyle = {
  root: {
    height: `96vh`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {},
};

function DefaultPage() {
  return (
    <div style={componentStyle.root}>
      <h1>🤔 What do you think?</h1>
      <h2>
        🎉 Let's go to <b>DISCUSS</b>!!!
      </h2>
      <h4 style={{ marginTop: `10px` }}>
        👈 You can exchange opinions with many people on various topics
      </h4>

      <div style={componentStyle.buttonGroup}>
        <Link to={"/signIn"}>
          <Button variant="outline-light">Sign in</Button>
        </Link>
        <Link to={"/signUp"}>
          <Button variant="light">Sign up</Button>
        </Link>
      </div>
    </div>
  );
}

export default DefaultPage;
