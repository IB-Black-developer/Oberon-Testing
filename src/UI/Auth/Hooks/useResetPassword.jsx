import { useState } from "react";

const useResetPassword = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorAlone, setErrorAlone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Otp, setCompanyOtp] = useState("");

  const handlePasswordChange = (e) => {
    setError("");
    setIsError("");
    setPasswordError("");
    setErrorAlone("");
    const newPassword = e.target.value;
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newPassword
      );

    if (!isPasswordValid) {
      setPasswordError(true);
    } else if (password === "") {
      setError(`Password Cannot be empty`);
    } else {
      setError("");
    }

    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setPasswordError("");
    setErrorAlone("");
    const confirmPasswordValue = e.target.value;
    const isPasswordMatched = confirmPasswordValue === password;
    setIsError("");
    if (!isPasswordMatched) {
      setIsError("Passwords do not match.");
    } else {
      setError(false);
    }
    setConfirmPassword(confirmPasswordValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const companyOtpChange = (event) => {
    setError("");
    setCompanyOtp(event.target.value);
  };

  const handleSubmit = (dispatch, navigate, confirmPasswordReset) => (event) => {
    setLoading(true);
    setError("");
    setIsError("");
    setPasswordError("");
    setErrorAlone("");
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      if (password === "") {
        setError("Password Must not be empty");
      } else if (passwordError) {
        setError(`Password didn't meet the requirements`);
      } else {
        const adminData = {
          otp: Otp,
          new_password: password,
        };
        dispatch(confirmPasswordReset(adminData))
          .then((response) => {
            setLoading(false);
            if (response.payload === 400) {
              setError("An Error Occurred");
            } else if (response.payload === 422) {
              setError("Invalid Request");
              alert("fff");
            } else if (response.payload?.status === 200) {
              navigate(`/auth-success`);
            } else if (error.response?.status >= 500) {
              setError("Internal Server Error");
            } else {
              setErrorAlone("An Error Occurred");
            }
          })
          .catch((error) => {
            console.log("Error during admin registration:", error.message);
          });
      }
    }
  };

  return {
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
  };
};

export default useResetPassword;
