import React from "react";

const SubmitButton = ({ onClick, children }) => {
  return (
    <button type="submit" className="auth-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default SubmitButton;
