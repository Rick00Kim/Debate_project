const dev = {
  BACKEND_DOMAIN: "http://localhost:5500",
};

const prod = {
  BACKEND_DOMAIN: "http://backend",
};

const config = process.env.REACT_APP_EXECUTE_MODE === "production" ? prod : dev;

export default config;
