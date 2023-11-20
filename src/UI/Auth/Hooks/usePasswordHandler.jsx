import { useState } from "react";

const usePasswordHandler = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isError, setIsError] = useState(false);

  const handlePasswordChange = (e) => {
    setError("");
    setIsError("");
    const newPassword = e.target.value;
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newPassword
      );

    setPasswordError(!isPasswordValid);
    setError(!isPasswordValid ? "Password must meet the requirements" : "");
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    const isPasswordMatched = confirmPasswordValue === password;
    setIsError(isPasswordMatched ? "" : "Passwords do not match.");
    setConfirmPassword(confirmPasswordValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (
    event,
    user_token,
    dispatch,
    navigate,
    completeAdminRegistration
  ) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setIsError("");
    setPasswordError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      if (password === "") {
        setError("Password must not be empty");
      } else if (passwordError) {
        setError("Password didn't meet the requirements");
      } else {
        const adminData = {
          user_token: user_token,
          password: password,
        };

        dispatch(completeAdminRegistration(adminData))
          .then((response) => {
            setLoading(false);

            if (response.payload === 404) {
              navigate(`/auth-success`);
            } else if (response.payload >= 400 && response.payload < 500) {
              setError("Invalid Request");
            } else if (response.payload >= 500) {
              setError("Internal Server Error");
            }
          })
          .catch((error) => {
            console.log("Error during admin registration:", error.message);
          });
      }
    }
  };

  return {
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
  };
};

export default usePasswordHandler;
