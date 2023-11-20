// AuthContent.jsx

import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiSolidError } from "react-icons/bi";

const AuthContent = ({
  email,
  companyEmailChange,
  showPassword,
  password,
  handlePasswordChange,
  togglePasswordVisibility,
  navigate,
  error,
  loading,
}) => {
  return (
    <>
      <div className="div-auth-input">
        <label htmlFor="companyName" className="auth-label">
          Email
        </label>
        <input
          id="email"
          value={email}
          onChange={companyEmailChange}
          className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
          placeholder="Enter your company's email address"
        />
      </div>
      <div className="div-auth-input">
        <div className="password-input-container">
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
            placeholder="Enter your password"
          />
          <div
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div onClick={() => navigate("/forgot-password")}>
          <p className="auth-forgot-password">Forgot Password?</p>
        </div>

        {error ? (
          <p className="auth-error">
            {" "}
            <BiSolidError className="error-icon-auth" />
            {error}
          </p>
        ) : null}
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
      </div>
    </>
  );
};

export default AuthContent;
