import React from "react";
import { BiSolidError } from "react-icons/bi";

const OrgErrorNotification = ({ error }) => {
  return (
    <p className={`auth-error ${error ? "auth-full" : "hidden"}`}>
      {error ? (
        <>
          <BiSolidError className="error-icon-auth" />
          {error}
        </>
      ) : null}
    </p>
  );
};

export default OrgErrorNotification;
