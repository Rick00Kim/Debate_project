import React from "react";

export const routerEndPoint = {
  root: "/",
  debates: "debates/",
  addTopic: "topic/add",
  errors: {
    notFound: "/NotFound",
  },
};

export const backendPointList = {
  topic: "/api/topic",
  debates: "/api/debates",
};

export const defaultDebateForm = {
  topicNum: "",
  username: "",
  email: "",
  content: "",
};

export const contentStyle = {
  root: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    height: `95vh`,
  },
};

export const DefaultPage = () => {
  return (
    <div
      style={{
        height: `96vh`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>🤔 What do you think?</h1>
      <h2>
        🎉 Let's go to <b>DISCUSS</b>!!!
      </h2>
      <h4 style={{ marginTop: `10px` }}>
        👈 You can exchange opinions with many people on various topics
      </h4>
    </div>
  );
};
