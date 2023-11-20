import { useState } from "react";

const useAuthSuccess = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
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

  const handleSubmit = () => {
    setLoading(true);
    setSuccess("");
    setError("");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return {
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
  };
};

export default useAuthSuccess;
