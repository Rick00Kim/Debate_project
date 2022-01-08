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
