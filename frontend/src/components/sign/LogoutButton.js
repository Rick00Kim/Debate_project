import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

function LogoutButton(props) {
  const navigate = useNavigate()
  const { logout, variant } = props
  const handleClick = () => {
    logout()
    navigate("/")
  }
  return (
    <Button variant={variant} onClick={handleClick}>
      Sign out
    </Button>
  )
}

export default LogoutButton
