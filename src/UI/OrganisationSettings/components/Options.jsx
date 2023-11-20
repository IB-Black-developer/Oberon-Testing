import React from "react";

const StaffCountOptions = ({
  staffCountMaxErr,
  handleOptionChange,
  selectedOption,
  options,
}) => {
  return (
    <div className="org-forms-options">
      <label
        className="org-forms-label"
        style={
          staffCountMaxErr
            ? {
                color: "red",
              }
            : null
        }
      >
        How Many Staff Work in your Organisation?{" "}
        <span className="org-forms-label required"> ** </span>
      </label>
      <div className="org-forms-buttons">
        {options.map((option) => (
          <button
            style={
              staffCountMaxErr
                ? {
                    border: "red 2px solid",
                    backgroundColor: "#ff000025",
                    color: "red",
                  }
                : null
            }
            key={option}
            className={`org-forms-button ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={(e) => handleOptionChange(e, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StaffCountOptions;
