import React, { Fragment } from "react"
import { useAuth } from "../authenticated/auth"
import { getCurrentUser } from "../authenticated/AuthService"

function ManagerComponent({ component: Component, render, props }) {
  const [logged] = useAuth()
  const loggedUser = getCurrentUser()

  return (
    <Fragment>
      {logged & (loggedUser.role === "Manager") ? (
        render ? (
          render(props)
        ) : (
          <Component {...props} />
        )
      ) : (
        ""
      )}
    </Fragment>
  )
}

export default ManagerComponent
