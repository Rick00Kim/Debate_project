import jwtDecode from "jwt-decode";

export const getCurrentUser = () => {
  const auth_info = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  const decoded = jwtDecode(auth_info)["sub"];
  return decoded;
};
