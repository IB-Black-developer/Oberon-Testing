import React from "react";
import { BiSolidError } from "react-icons/bi";

const ErrorNotification = ({ error }) => {
  return (
    error && (
      <p className="auth-error" style={{
        width: 'inherit'
      }}>
        {" "}
        <BiSolidError className="error-icon-auth" />
        {error}
      </p>
    )
  );
};

export default ErrorNotification;
