
import { useState } from "react";
import { useDispatch } from "react-redux";

const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setError("");
    setEmail(event.target.value);
  };

  const handleSubmit = (dispatch, navigate, forgotPassword) => (event) => {
    setLoading(true);
    setError("");
    event.preventDefault();

    dispatch(forgotPassword({ email }))
      .then((response) => {
        setLoading(false);
        if (response.payload?.status === 401)
          setError("Your Email or Password is incorrect");
        else if (response.payload?.status === 422)
          setError("Your Email is incorrect");
        else if (response.payload?.status === 200) navigate(`/reset-password`);
        else if (error.response?.status >= 500)
          setError("Internal Server Error");
        else setError("An error occurred while loading");
      })
      .catch((error) =>
        console.error("Error during admin registration:", error)
      );
  };

  return {
    email,
    error,
    loading,
    handleEmailChange,
    handleSubmit,
  };
};

export default useForgotPassword;
