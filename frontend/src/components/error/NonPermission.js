import React from "react";

const NonPermission = () => {
  return (
    <div
      style={{
        height: `95vh`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>🤲 Non permission page</h1>
      <h2>You don't have permission of management.</h2>
    </div>
  );
};

export default NonPermission;
