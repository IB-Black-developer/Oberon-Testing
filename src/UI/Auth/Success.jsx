import React, { useState } from "react";
import AuthBackGroundGreenDiv from "../Components/AuthComponents/AuthBackGroundGreenDiv";
import { useNavigate, useParams } from "react-router-dom";
import verify from "../../assets/AuthAssets/Sucess.png";
import { useDispatch } from "react-redux";
import useAuthSuccess from "./Hooks/useAuthSuccess";
import ContentComponent from "./components/ContentComponent";
import AuthModal from "./components/Modal";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useParams();
  const {
    companyName,
    companyEmail,
    showModal,
    loading,
    error,
    success,
    companyNameChange,
    companyEmailChange,
    handleSubmit,
    closeModal,
  } = useAuthSuccess();

  return (
    <div className="auth-first-div">
      <AuthBackGroundGreenDiv />
      <div className="auth-background-white-div">
        <div>
          <ContentComponent
            title="Sign Up"
            description1="To get Started"
            description2="Login"
            navigateTo={() => navigate("/signin")}
          />
        </div>
        <form>
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
            <label htmlFor="email" className="auth-label">
              Company's Email
            </label>
            <input
              id="email"
              value={email}
              onChange={companyEmailChange}
              className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
              placeholder="Enter your company's email"
            />

            <div className="auth-button-container">
              <button type="submit" className="auth-button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal */}
      <AuthModal
        showModal={showModal}
        closeModal={closeModal}
        error={error}
        success={success}
        loading={loading}
        handleSubmit={handleSubmit}
        title="Congratulations!! Your Account is Successfully Created"
        subTitle="Proceed to login"
        buttonText={loading ? "Loading..." : "Proceed to Login"}
        //modalText="Click on the link sent to your email address"
        modalImage={verify}
      />
    </div>
  );
};

export default AuthSuccess;
