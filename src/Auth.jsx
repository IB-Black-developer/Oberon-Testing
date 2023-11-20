import { Route, Routes } from "react-router-dom";
import "./assets/css/auth.css";
import { AuthCreatePassword, AuthForgotPassword, AuthResetPassword, AuthSignIn, AuthSignUp, AuthSuccessful, AuthVerified } from "./UI/Auth/AuthIndex";



export default function Auth() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<AuthSignUp />} />
          <Route path="/signin" element={<AuthSignIn />} />
          <Route path="/create-password" element={<AuthCreatePassword />} />
          <Route path="/forgot-password" element={<AuthForgotPassword />} />
          <Route path="/reset-password" element={<AuthResetPassword />} />
          <Route path="/auth-success" element={<AuthSuccessful />} />
          <Route path="/auth-verify/:email" element={<AuthVerified />} />
        </Routes>
      </div>
    </div>
  );
}




