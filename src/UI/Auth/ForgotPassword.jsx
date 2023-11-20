import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/auth/auth";
import { useDispatch } from "react-redux";
import AuthBackGroundGreenDiv from "../Components/AuthComponents/AuthBackGroundGreenDiv";
import ErrorNotification from "./components/ErrorComponent";
import AuthenticationButton from "./components/Button";
import useForgotPassword from "./Hooks/useForgotPassword";
import EmailInput from "./components/EmailInput";
import ContentComponent from "./components/ContentComponent";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, error, loading, handleEmailChange, handleSubmit } =
    useForgotPassword();

  return (
    <div className="auth-first-div">
      <AuthBackGroundGreenDiv />
      <form
        onSubmit={handleSubmit(dispatch, navigate, forgotPassword)}
        className="auth-background-white-div"
      >
        <div>
          <ContentComponent
            title="Forgot Password"
            description1="Don't have an account"
            description2="Create an Account"
            navigateTo={() => navigate("/")} 
          />
        </div>
        <div className="div-auth-input">
          <EmailInput email={email} handleEmailChange={handleEmailChange} />
        </div>
        <div className="div-auth-input">
          <ErrorNotification error={error} />
          <AuthenticationButton loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
