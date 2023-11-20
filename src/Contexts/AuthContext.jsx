import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const apiBaseUrl = "https://oberon.neofin.ng/register";

  const registerAdmin = async (adminData) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/start-admin-registration/`,
        adminData
      );

      // if (response.data.success) {
      if (response.data) {
        console.log(response.status, "response.data.user");
        return response.status;
      } else {
        console.log(response.data.message, "dhd");
      }
    } catch (error) {
      if (error.response.status === 422) {
        return error.response.status;
      }
      if (error.response.status === 400) {
        return error.response.status;
      } else {
        return error.response;
      }

      console.log("Error during registration:", error.response.status);
    }
  };

  const resendOTP = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/resend-otp`);
      console.log(response.data);
    } catch (error) {
      console.error("Error resending OTP:", error.message);
    }
  };

  const completeAdminRegistration = async (otp) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/complete-admin-registration`,
        { otp }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error completing admin registration:", error.message);
    }
  };

  const addStaff = async (staffData) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/add-staff`, staffData);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding staff:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        registerAdmin,
        resendOTP,
        completeAdminRegistration,
        addStaff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
