import { createAuthProvider } from "react-token-auth";
import { backendPointList } from "../common/Constants";

export const [useAuth, authFetch, login, logout] = createAuthProvider({
  onUpdateToken: (token) => {
    let refreshToken = localStorage.getItem("REACT_REFRESH_TOKEN_AUTH_KEY");
    return fetch(backendPointList.refresh, {
      headers: { Authorization: `Bearer ${refreshToken}` },
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => result["access_token"]);
  },
});
