import React from "react";

const ContentComponent = ({ title, description1, description2, navigateTo }) => {
  return (
    <div>
      <h2 className="auth-background-text-white-signup">{title}</h2>
      <p className="auth-background-text-white-signup-p">
        {description1}{" "}
        <span
          onClick={() => navigateTo && navigateTo()}
          className="auth-background-text-white-signup-span"
        >
          {description2}
        </span>{" "}
      </p>
    </div>
  );
};

export default ContentComponent;
