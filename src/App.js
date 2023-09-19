import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginComponent from "./components/login/Login";
import SignupComponent from "./components/signup/Signup";
import ProfileComponent from "./components/profile/Profile";
import ForgotPasswordComponent from "./components/forgotPassword/ForgotPassword";
import ResetPasswordComponent from "./components/resetPassword/ResetPassword";
import NoPageComponent from "./components/noPage/NoPage";
import NewPasswordComponent from "./components/newPassword/NewPassword";
import VerifyEmailComponent from "./components/verifyEmail/VerifyEmail";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route exact path="login" element={<LoginComponent />} />
        <Route exact path="signup" element={<SignupComponent />} />
        <Route
          exact
          path="forgot-password"
          element={<ForgotPasswordComponent />}
        />
        <Route exact path="profile" element={<ProfileComponent />} />
        <Route
          exact
          path="reset-password"
          element={<ResetPasswordComponent />}
        />
        <Route exact path="new-password" element={<NewPasswordComponent />} />
        <Route exact path="verify-email" element={<VerifyEmailComponent />} />

        <Route path="*" element={<NoPageComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
