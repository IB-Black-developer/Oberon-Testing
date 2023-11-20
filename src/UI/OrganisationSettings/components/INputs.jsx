import React from "react";

const OrganizationInput = ({ label, descriptionErr, handleChangeDescription }) => {
  return (
    <div className="org-forms-inputs">
      <label className="org-forms-label">
        {label}
        <span className="org-forms-label required">**</span>
      </label>
      <div>
        
      </div>
      <input
        style={
          descriptionErr
            ? {
                border: "red 2px solid",
                backgroundColor: "#ff000025",
                color: "red",
              }
            : null
        }
        onChange={handleChangeDescription}
        className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
      />
      {descriptionErr ? (
        <p style={descriptionErr ? { color: "red", marginTop: 0 } : null}>
          {descriptionErr}
        </p>
      ) : null}
    </div>
  );
};

export default OrganizationInput;
