import React from "react";

const EmailInput = ({ email, handleEmailChange }) => {
  return (
    <div className="div-auth-input">
      <label htmlFor="email" className="auth-label">
        Email
      </label>
      <input
        required
        id="email"
        value={email}
        onChange={handleEmailChange}
        className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
        placeholder="Enter your email address"
      />
    </div>
  );
};

export default EmailInput;
