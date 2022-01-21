import React from "react";
import { useAuth } from "../authenticated/auth";
import { getCurrentUser } from "../authenticated/AuthService";

function ManagerComponet({ component: Component, render, props }) {
  const [logged] = useAuth();
  const loggedUser = getCurrentUser();

  return (
    <div>
      {logged & (loggedUser.role === "Manager") ? (
        render ? (
          render(props)
        ) : (
          <Component {...props} />
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default ManagerComponet;
