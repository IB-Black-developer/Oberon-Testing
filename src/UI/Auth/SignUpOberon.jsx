import React, { useState } from "react";
import AuthBackGroundGreenDiv from "../Components/AuthComponents/AuthBackGroundGreenDiv";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "./components/ErrorComponent";
import AuthenticationButton from "./components/Button";
import ContentComponent from "./components/ContentComponent";
import useSignUp from "./Hooks/useSignUp";

const OberonSignup = () => {
  const navigate = useNavigate();
  const {
    companyName,
    email,
    error,
    loading,
    isError,
    errorAlone,
    companyNameChange,
    companyEmailChange,
    handleSubmit,
  } = useSignUp();

  return (
    <div className="auth-first-div">
      <AuthBackGroundGreenDiv />
      <div className="auth-background-white-div">
        <div>
          <ContentComponent
            title="Sign Up"
            description1="To get Started?"
            description2="Login"
            navigateTo={() => navigate("/signin")}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="div-auth-input">
            <label htmlFor="companyName" className="auth-label">
              Company's Name
            </label>
            <input
              id="companyName"
              value={companyName}
              onChange={companyNameChange}
              className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
              placeholder="Enter your company's name"
            />
          </div>
          <div className="div-auth-input">
            <label htmlFor="companyName" className="auth-label">
              Company's Email
            </label>
            <input
              id="email"
              required
              value={email}
              onChange={companyEmailChange}
              className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
              placeholder="Enter your company's name"
            />

            <div className="auth-button-container">
              <div
                className="div-auth-input"
                style={{
                  width: "auto",
                }}
              >
                <ErrorNotification error={error} />{" "}
                <ErrorNotification error={isError} />
                {/* <ErrorNotification error={errorAlone} /> */}
              </div>

              <AuthenticationButton loading={loading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OberonSignup;
