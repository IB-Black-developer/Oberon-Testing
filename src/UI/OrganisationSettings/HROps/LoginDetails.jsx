import React, { useState } from "react";
import "../../../assets/css/OrgBasicInfo.css";
import { BsFillTriangleFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiSolidError } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerStaff } from "../../../redux/auth/auth";
import verify from "../../../assets/AuthAssets/Sucess.png";
import OrganizationSetupProgress from "../../SetUpOrganisation/Components/Progress";

const LoginDetails = () => {

  const steps = [
    { label: "Staff Details", status: "done" },
    { label: "Job Details", status: "done" },
    {
      label: "Login Details",
      status: "active",
    },
  ];


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    country,
    houseAddress,
    streetAddress,
    state,
    permission,
    dateOfEmployment,
    jobTitle,
    employmentType,
    contractType,
    salaryFrequency,
    basicSalary,
    allowance,
    department,
  } = location.state;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const closeModal = () => {
    setShowModal(false);
    //navigate("/create-password");
  };

  const openModal = () => {
    setShowModal(true);
  };
  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, one digit, and one special character."
      );
    } else {
      setPasswordError("");
    }
    console.log(event.target.value);
    setConfirmPasswordError("");
  };

  const handleChangeConfirmPassword = (event) => {
    const newConfirmPassword = event.target.value;
    console.log(event.target.value);
    setConfirmPassword(newConfirmPassword);
    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleChangeEmail = (event) => {
    console.log(event.target.value);
    const newEmail = event.target.value;
    setEmail(newEmail);
    console.log(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setConfirmPasswordError("");
    setError("");
    setPasswordError("");
    setEmailError("");
    if (!password) {
      setPasswordError("Enter a password");
    }
    if (confirmPassword === !email) {
      setConfirmPasswordError("Passwords must match");
    }
    if (!email) {
      setEmailError("Enter a Valid Email Address");
    }

    if (!password || !email) {
      setError("Fill in all the required fields to proceed");
      return;
    }

    if (password || email) {
      setLoading(true);
      const formData = {
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        date_of_birth: dateOfBirth,
        nationality: country,
        address_3: houseAddress,
        address_2: streetAddress,
        address_1: state,
        permission: permission,
        employment_date: dateOfEmployment,
        job_title: jobTitle,
        email: email,
        employment_type: employmentType,
        contract_type: contractType,
        salary_frequency: salaryFrequency,
        annual_basic_salary: basicSalary,
        allowance: allowance,
        password: password,
        department: department,
      };

      try {
        const response = await dispatch(registerStaff(formData));
        setLoading(false);
        console.log("whwhhwh", response);
        if (response?.payload?.status === 200) {
          openModal();
          //navigate("/admin-organisation-kyc");
          setSuccess("Contact Admin Information Updated Successfully");
        }
      } catch (error) {
        setLoading(false);
        console.log("Error:", error);
      }
    } else {
      setError("No New Changes to Update");
    }
  };

  return (
    <>
      <section className="forms-kyc-org">
        <section className="org-forms-section">
          <div className="org-forms-kyc">
            <form onSubmit={handleSubmit} className="org-forms-forms">
              <div
                style={{
                  paddingTop: 24,
                }}
                className="org-forms-inputs"
              >
                <label className="org-forms-label">
                  Email{" "}
                  {emailError && (
                    <span className="org-forms-label required">**</span>
                  )}
                </label>
                <input
                  style={
                    emailError
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  type="text"
                  value={email}
                  onChange={handleChangeEmail}
                  className={`auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black ${
                    emailError ? "error" : ""
                  }`}
                />
                {emailError && (
                  <p style={{ color: "red", marginTop: 0 }}>{emailError}</p>
                )}
              </div>
              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Password{" "}
                  {passwordError && (
                    <span className="org-forms-label required">**</span>
                  )}
                </label>
                <div className="password-input-container">
                  <input
                    style={
                      passwordError
                        ? {
                            border: "red 2px solid",
                            backgroundColor: "#ff000025",
                            color: "red",
                          }
                        : null
                    }
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChangePassword}
                    className={`auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black ${
                      passwordError ? "error" : ""
                    }`}
                  />
                  {showPassword ? (
                    <AiOutlineEyeInvisible
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <AiOutlineEye
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                {passwordError && (
                  <p style={{ color: "red", marginTop: 0 }}>{passwordError}</p>
                )}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Confirm Password{" "}
                  {confirmPasswordError && (
                    <span className="org-forms-label required">**</span>
                  )}
                </label>
                <div className="password-input-container">
                  <input
                    style={
                      confirmPasswordError
                        ? {
                            border: "red 2px solid",
                            backgroundColor: "#ff000025",
                            color: "red",
                          }
                        : null
                    }
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    className={`auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black ${
                      confirmPasswordError ? "error" : ""
                    }`}
                  />
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible
                      className="password-toggle-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  ) : (
                    <AiOutlineEye
                      className="password-toggle-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                </div>
                {confirmPasswordError && (
                  <p style={{ color: "red", marginTop: 0 }}>
                    {confirmPasswordError}
                  </p>
                )}
              </div>
              <div className="forms-org-submit-button">
                {error ? (
                  <p className="auth-error auth-full">
                    {" "}
                    <BiSolidError className="error-icon-auth" />
                    {error}
                  </p>
                ) : null}
                <button disabled={loading ? true : false} type="submit">
                  {" "}
                  {loading ? (
                    <div className="spinner-container"> </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
        <section className="org-flex-second">
          <section className="width-org-resize">
            <section className="org-basic-info-div-right">
              <OrganizationSetupProgress steps={steps} />
            </section>
          </section>
          <section className="width-org-resize-div">
            <div className="org-width-vw">
              <section className="org-basic-info-div-right-div-div">
                <OrganizationSetupProgress steps={steps} />
              </section>
            </div>
          </section>
        </section>
      </section>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}
            <div className="auth-modal-div">
              <h2 className="auth-modal-h2">
                You have successfully added a Staff{" "}
              </h2>
              <p className="auth-modal-p">Proceed to your next actions</p>

              <img
                src={verify}
                alt="verify"
                className="auth-verify-illustration"
              />

              <button
                className="get-staff-button-view-permission"
                onClick={() => navigate("/dashboard")}
              >
                {" "}
                Proceed to Dashboard
              </button>
              <button
                className="auth-button get-staff-button"
                onClick={() => navigate("/all-staff")}
              >
                {" "}
                View all Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginDetails;
