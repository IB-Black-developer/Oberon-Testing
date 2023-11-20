import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  label,
  type,
  value,
  onChange,
  showPassword,
  onTogglePasswordVisibility,
  placeholder,
}) => {
  return (
    <div className="div-auth-input">
      <div className="password-input-container">
        <label htmlFor="password" className="auth-label">
          {label}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
          placeholder={placeholder}
        />
        <div
          className="password-toggle-icon"
          onClick={onTogglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
