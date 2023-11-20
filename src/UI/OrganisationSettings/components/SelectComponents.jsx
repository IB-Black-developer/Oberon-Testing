import React from 'react';

const SelectComponent = ({ options, value, onChange, placeholder, error }) => {
  return (
    <div className="org-forms-inputs">
      <label className="org-forms-label">
        {placeholder} 
      </label>
      <select
        className="forms-org-select"
        value={value}
        onChange={onChange}
        style={
          error
            ? {
                border: "red 2px solid",
                backgroundColor: "#ff000025",
                color: "red",
              }
            : null
        }
      >
        <option value="">{`Select ${placeholder}`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <p style={error ? { color: "red", marginTop: 0 } : null}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default SelectComponent;
