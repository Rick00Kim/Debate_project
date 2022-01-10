import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function LogoutButton({ logout }) {
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };
  return (
    <Button variant="primary" onClick={handleClick}>
      Sign out
    </Button>
  );
}

export default LogoutButton;
