import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function LogoutButton(props) {
  const navigate = useNavigate();
  const { logout } = props;
  const handleClick = () => {
    logout();
    navigate("/");
  };
  return (
    <Button variant="primary" onClick={handleClick} block>
      Sign out
    </Button>
  );
}

export default LogoutButton;
