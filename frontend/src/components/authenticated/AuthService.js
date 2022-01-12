import jwtDecode from "jwt-decode";

export const getCurrentUser = () => {
  let decoded = "";
  const auth_info = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  if (auth_info != null) {
    decoded = jwtDecode(auth_info)["sub"];
  }
  return decoded;
};
