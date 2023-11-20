import React from "react";

const AuthenticationButton = ({ loading }) => {
  return (
    <div className="auth-button-container">
      <button
        type="submit"
        className="auth-button"
        disabled={loading ? true : false}
      >
        {loading ? (
          <div className="spinner-container"> </div>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default AuthenticationButton;
