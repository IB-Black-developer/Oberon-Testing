// useSignUp.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAdmin } from "../../../redux/auth/auth";


const useSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");
  const [email, setCompanyEmail] = useState("");
  const [error, setError] = useState("");
  const [isError, setiSError] = useState("");
  const [loading, setLoading] = useState(false);

  const companyNameChange = (event) => {
    setError("");
    const inputValue = event.target.value;
    const capitalizedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setCompanyName(capitalizedValue);
  };

  const companyEmailChange = (event) => {
    setError("");
    const lowercaseEmail = event.target.value.toLowerCase();
    setCompanyEmail(lowercaseEmail);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const adminData = { company_name: companyName, email: email };
      const response = await dispatch(registerAdmin(adminData));

      setLoading(false);

      if (response.payload === 400) {
        setError("Email already in use");
      } else if (response.payload === 422) {
        setError("Invalid Credentials");
      } else if (response.payload?.status === 200) {
        navigate(`/auth-verify/${adminData?.email}`);
      } else if (error.response?.status >= 500) {
        setError("Internal Server Error");
      } else {
        setError("An error occurred while loading");
      }
    } catch (error) {
      console.error("Error during admin registration:", error.message);
    }
  };

  return {
    companyName,
    email,
    error,
    loading,
    isError,
    companyNameChange,
    companyEmailChange,
    handleSubmit,
  };
};

export default useSignUp;
