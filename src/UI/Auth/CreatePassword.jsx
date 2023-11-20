import React, { useState } from "react";
import AuthBackGroundGreenDiv from "../Components/AuthComponents/AuthBackGroundGreenDiv";
import { useNavigate } from "react-router-dom";
import { completeAdminRegistration } from "../../redux/auth/auth";
import AuthenticationButton from "./components/Button";
import ErrorNotification from "./components/ErrorComponent";
import PasswordInput from "./components/PasswordInput";
import usePasswordHandler from "./Hooks/usePasswordHandler";

const CreatePassword = () => {
  const currentUrl = new URL(window.location.href);
  const user_token = currentUrl.searchParams.get("user_token");
  const navigate = useNavigate();
  const {
    password,
    confirmPassword,
    error,
    loading,
    showPassword,
    passwordError,
    isError,
    handlePasswordChange,
    handleConfirmPasswordChange,
    togglePasswordVisibility,
    handleSubmit,
  } = usePasswordHandler();

  return (
    <div className="auth-first-div">
      <AuthBackGroundGreenDiv />
      <form
        onSubmit={(event) =>
          handleSubmit(
            event,
            user_token,
            dispatch,
            navigate,
            completeAdminRegistration
          )
        }
        className="auth-background-white-div"
      >
        {" "}
        <div>
          <ContentComponent
            title="Create Password"
            description1="Already have an account"
            description2="Create an Account"
            navigateTo={() => navigate("/")}
          />
        </div>
        <PasswordInput
          label="Create Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          showPassword={showPassword}
          onTogglePasswordVisibility={togglePasswordVisibility}
          placeholder="Enter your password"
        />
        <PasswordInput
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          showPassword={showPassword}
          onTogglePasswordVisibility={togglePasswordVisibility}
          placeholder="Enter your password"
        />{" "}
        <div className="div-auth-input">
          <ErrorNotification error={isError} />
          <ErrorNotification error={error} />
          <AuthenticationButton loading={loading} />
        </div>
        <div
          className={error ? "auth-hint-password-error" : "auth-hint-password"}
        >
          <p>Password must be at least 8 characters long and must contain. </p>
          <ul>
            <li>Alphanumeric Characters</li>
            <li>An Uppercase</li>
            <li>A lowercase</li>
            <li>A Special character</li>
            <li>And a Number</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default CreatePassword;
