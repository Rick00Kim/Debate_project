export const routerEndPoint = {
  root: "/",
  debates: "debates/",
  addTopic: "topic/add",
  manager: {
    users: "manage/users",
  },
  errors: {
    notFound: "/not-exists-topic",
    nonPermission: "/non-permission",
  },
};

export const backendPointList = {
  auth: "/api/auth",
  refresh: "/api/refresh",
  users: "/api/users",
  signup: "/api/signup",
  topic: "/api/topic",
  debates: "/api/debates",
  like: "/api/like",
  unlike: "/api/unlike",
};

export const emptyDebateForm = {
  topicNum: "",
  content: "",
};

export const contentStyle = {
  root: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
  },
};
