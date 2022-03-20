import jwtDecode from "jwt-decode";

const accessTokenKeyName = "DEBATE_ACCESS_TOKEN";

export const getCurrentUser = () => {
  let decoded = "";
  const auth_info = localStorage.getItem(accessTokenKeyName);
  if (auth_info != null) {
    decoded = jwtDecode(auth_info)["sub"];
  }
  return decoded;
};

export const getAuthHeader = () => {
  const jwt_key = JSON.parse(localStorage.getItem(accessTokenKeyName));
  const headerContents = { Authorization: `Bearer ${jwt_key}` };
  return headerContents;
};

export const isManager = () => {
  const currentUser = getCurrentUser();
  return currentUser.role === "Manager";
};
