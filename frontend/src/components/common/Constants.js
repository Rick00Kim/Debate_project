export const routerEndPoint = {
  root: "/",
  debates: "debates/",
  addTopic: "topic/add",
  errors: {
    notFound: "/not-exists-topic",
    nonPermission: "/non-permission",
  },
};

export const backendPointList = {
  signup: "/api/signup",
  topic: "/api/topic",
  debates: "/api/debates",
};

export const emptyDebateForm = {
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
