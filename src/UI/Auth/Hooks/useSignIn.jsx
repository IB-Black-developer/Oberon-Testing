import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth/auth";

const useSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [email, setCompanyEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoading } = useSelector((state) => state?.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const companyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const companyEmailChange = (event) => {
    setError("");
    setCompanyEmail(event.target.value);
  };

  const handlePasswordChange = (e) => {
    setError("");
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    setLoading(true);
    setError("");
    event.preventDefault();
    const adminData = { email, password };
    console.log(adminData);
    dispatch(login(adminData))
      .then((response) => {
        console.log(response.payload, "ressss");
        setLoading(false);
        console.log("Registration Response:", response);
        if (response.payload === 401) {
          setError("Your Email or Password is incorrect");
        } else if (response.payload === 422) {
          setError("Invalid Credentials");
        } else if (response.payload?.status === 200) {
          navigate("/dashboard");
        } else if (response.payload?.status >= 500) {
          setError("Internal Server Error");
        } else {
          setError("An error occurred while loading");
        }
      })
      .catch((error) => {
        console.log("Error during admin registration:", error);
      });
  };

  return {
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
  };
};

export default useSignIn;
