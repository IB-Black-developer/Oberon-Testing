import React, { useState } from "react";
import Dots from "../../assets/AuthAssets/Dots.png";
import AuthBackGroundGreenDiv from "../Components/AuthComponents/AuthBackGroundGreenDiv";
import { useNavigate, useParams } from "react-router-dom";
import verify from "../../assets/AuthAssets/OberonMail.png";
import SubmitButton from "../Components/AuthComponents/AuthButton";
import { useDispatch } from "react-redux";
import { resendOTP } from "../../redux/auth/auth";
import { BiSolidError } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import AuthModal from "./components/Modal";

const AuthVerify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useParams();
  const [companyName, setCompanyName] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const companyNameChange = (event) => {
    setCompanyName(event.target.value);
  };
  const companyEmailChange = (event) => {
    setCompanyEmail(event.target.value);
  };
  console.log(email, "lll");

  const handleSubmit = (event) => {
    setLoading(true);
    setSuccess('');
    setError("");
    event.preventDefault();
    const adminData = email;
    console.log(adminData);
    dispatch(resendOTP(adminData))
      .then((response) => {
        console.log(response.payload, "ressss");
        setLoading(false);
        console.log("Registration Response:", response);
        if (response.payload === 422) {
          setSuccess("OTP resend successful");
        } else {
          setError("OTP resend failed");
        }
      })
      //navigate("/auth-verify"");
      .catch((error) => {
        console.log("Error during admin registration:", error.message);
      });
  };

  const closeModal = () => {
    // Close the modal
    setShowModal(false);
    // Navigate to the next page
    //navigate("/create-password");
  };

  return (
    <div className="auth-first-div">
      <AuthBackGroundGreenDiv />
      <div className="auth-background-white-div">
        <div>
          <h2 className="auth-background-text-white-signup">Sign Up</h2>
          <p className="auth-background-text-white-signup-p">
            <span
              onClick={() => navigate("/signin")}
              className="auth-background-text-white-signup-span"
            >
              Login
            </span>{" "}
            to get Started?
          </p>
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

      <AuthModal
        showModal={showModal}
        closeModal={closeModal}
        error={error}
        success={success}
        loading={loading}
        handleSubmit={handleSubmit}
        title="Please Check your email to verify your Email Address"
        subTitle="Click on the link sent to your email address"
        buttonText={loading ? "Loading..." : " Didn’t get a link? Resend"}
        modalImage={verify}
      />
    </div>
  );
};

export default AuthVerify;
