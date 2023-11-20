import React from "react";
import AuthBackGroundGreenDiv from "../Components/AuthComponents/AuthBackGroundGreenDiv";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { confirmPasswordReset } from "../../redux/auth/auth";
import ErrorNotification from "./components/ErrorComponent";
import AuthenticationButton from "./components/Button";
import useResetPassword from "./Hooks/useResetPassword";
import ContentComponent from "./components/ContentComponent";

const ResetPassword = () => {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const user_token = url.searchParams.get("user_token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    passwordError,
    showPassword,
    password,
    confirmPassword,
    error,
    errorAlone,
    loading,
    isError,
    Otp,
    handlePasswordChange,
    handleConfirmPasswordChange,
    togglePasswordVisibility,
    companyOtpChange,
    handleSubmit,
  } = useResetPassword();

  return (
    <div className="auth-first-div">
      <AuthBackGroundGreenDiv />
      <form
        onSubmit={handleSubmit(dispatch, navigate, confirmPasswordReset)}
        className="auth-background-white-div"
      >
        <div>
          <ContentComponent
            title="Reset Password"
            description1="Already have an account"
            description2="Create an Account"
            navigateTo={() => navigate("/")}
          />
        </div>

        <div className="div-auth-input">
          <div className="password-input-container">
            <label htmlFor="password" className="auth-label">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="auth-input"
              autoComplete="off"
              placeholder="Enter your password"
            />
            <div
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="auth-button-container">
            <div
              className="div-auth-input"
              style={{
                width: "auto",
              }}
            >
              <ErrorNotification error={error} />{" "}
              <ErrorNotification error={isError} />
              <ErrorNotification error={errorAlone} />
            </div>

            <AuthenticationButton loading={loading} />
          </div>

          <div
            style={{
              width: "auto",
            }}
            className={
              error ? "auth-hint-password-error" : "auth-hint-password"
            }
          >
            <p>
              Password must be at least 8 characters long and must contain.{" "}
            </p>
            <ul>
              <li>Alphanumeric Characters</li>
              <li>An Uppercase</li>
              <li>A lowercase</li>
              <li>A Special character</li>
              <li>And a Number</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
