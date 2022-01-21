import React from "react";
import { useAuth } from "../authenticated/auth";
import { getCurrentUser } from "../authenticated/AuthService";

function ManagerComponent({ component: Component, render, props }) {
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

export default ManagerComponent;
