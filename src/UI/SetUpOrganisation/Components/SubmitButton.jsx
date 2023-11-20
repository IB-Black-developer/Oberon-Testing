import React from "react";
import { BiSolidError } from "react-icons/bi";

const SubmitButton = ({ error, loading, buttonText = "Proceed" }) => {
  return (
    <div className="forms-org-submit-button">
      {error ? (
        <p className="auth-error auth-full">
          <BiSolidError className="error-icon-auth" />
          {error}
        </p>
      ) : null}
      <button disabled={loading} type="submit">
        {loading ? <div className="spinner-container"></div> : buttonText}
      </button>
    </div>
  );
};

export default SubmitButton;
