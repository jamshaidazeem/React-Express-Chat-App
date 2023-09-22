import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginComponent from "./components/login/Login";
import SignupComponent from "./components/signup/Signup";
import ProfileComponent from "./components/profile/Profile";
import ForgotPasswordComponent from "./components/forgotPassword/ForgotPassword";
import ResetPasswordComponent from "./components/resetPassword/ResetPassword";
import NoPageComponent from "./components/noPage/NoPage";
import NewPasswordComponent from "./components/newPassword/NewPassword";
import VerifyEmailComponent from "./components/verifyEmail/VerifyEmail";
import ChatComponent from "./components/chat/Chat";
import { useAuth } from "./containers/authContext";

function App() {
  const { loggedInUser, saveUserInContext } = useAuth();

  useEffect(() => {
    // on app load save user in context
    saveUserInContext();
  }, [saveUserInContext]);

  // protecting routes based on user logged in status
  const boilerPlateForPublicRoute = (component) => {
    // if client is accessing a public route while user is logged in than it is navigated to profile
    return loggedInUser ? <Navigate to="/profile" replace /> : component;
  };

  const boilerPlateForPrivateRoute = (component) => {
    // if client accessing a private route while user is not logged in than it is navigated to login
    return loggedInUser ? component : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={boilerPlateForPublicRoute(<LoginComponent />)}
        />
        <Route
          exact
          path="login"
          element={boilerPlateForPublicRoute(<LoginComponent />)}
        />
        <Route
          exact
          path="signup"
          element={boilerPlateForPublicRoute(<SignupComponent />)}
        />
        <Route
          exact
          path="forgot-password"
          element={boilerPlateForPublicRoute(<ForgotPasswordComponent />)}
        />
        <Route
          exact
          path="new-password"
          element={boilerPlateForPublicRoute(<NewPasswordComponent />)}
        />
        <Route
          exact
          path="verify-email"
          element={boilerPlateForPublicRoute(<VerifyEmailComponent />)}
        />
        {/*private routes*/}
        <Route
          exact
          path="profile"
          element={boilerPlateForPrivateRoute(<ProfileComponent />)}
        />
        <Route
          exact
          path="reset-password"
          element={boilerPlateForPrivateRoute(<ResetPasswordComponent />)}
        />
        <Route
          exact
          path="chat"
          element={boilerPlateForPrivateRoute(<ChatComponent />)}
        />
        {/*no match route*/}
        <Route path="*" element={<NoPageComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
