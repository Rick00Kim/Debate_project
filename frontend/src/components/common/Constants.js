import config from "../../components/config";

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
  auth: config.BACKEND_DOMAIN + "/api/auth",
  refresh: config.BACKEND_DOMAIN + "/api/refresh",
  signup: config.BACKEND_DOMAIN + "/api/signup",
  topic: config.BACKEND_DOMAIN + "/api/topic",
  debates: config.BACKEND_DOMAIN + "/api/debates",
  like: config.BACKEND_DOMAIN + "/api/like",
  unlike: config.BACKEND_DOMAIN + "/api/unlike",
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
    height: `95vh`,
  },
};
