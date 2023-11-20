import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const SuccessNotification = ({ success }) => {
  return (
    <p className={`auth-success ${success ? "auth-full" : "hidden"}`}>
      {success ? (
        <>
          <BsFillCheckCircleFill className="error-icon-auth" />
          {success}
        </>
      ) : null}
    </p>
  );
};

export default SuccessNotification;
