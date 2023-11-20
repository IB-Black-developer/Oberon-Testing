import React from "react";
import AuthBackGroundGreenDiv from "../Components/AuthComponents/AuthBackGroundGreenDiv";
import useSignIn from "./Hooks/useSignIn";
import AuthContent from "./components/AuthContent";
import { useNavigate } from "react-router-dom";
import ContentComponent from "./components/ContentComponent";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    companyName,
    email,
    error,
    loading,
    isLoading,
    showPassword,
    password,
    companyNameChange,
    companyEmailChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
  } = useSignIn();

  return (
    <div className="auth-first-div">
      <>
        <AuthBackGroundGreenDiv />

        <form onSubmit={handleSubmit} className="auth-background-white-div">
          <div>
            <ContentComponent
              title="Sign In"
              description1="Already have an account"
              description2="Login"
              navigateTo={() => navigate("/")}
            />
          </div>
          <AuthContent
            email={email}
            companyEmailChange={companyEmailChange}
            showPassword={showPassword}
            password={password}
            handlePasswordChange={handlePasswordChange}
            togglePasswordVisibility={togglePasswordVisibility}
            navigate={navigate}
            error={error}
            loading={loading}
          />
        </form>
      </>
    </div>
  );
};

export default SignIn;
