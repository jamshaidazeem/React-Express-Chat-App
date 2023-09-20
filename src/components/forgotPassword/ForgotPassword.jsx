import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import { URL_USERS_FORGOT_PASS } from "../../utilis/constants";
import fetchWithGlobalErrorHandler from "../../utilis/fetchHelper";

const ForgotPasswordComponent = () => {
  const navigate = useNavigate();

  // states
  const [postData, setPostData] = useState(false);
  const [email, setEmail] = useState("");

  // actions
  const onSubmit = () => {
    // input validation
    setPostData(true);
  };

  // use callback hooks
  const onSuccessPostData = useCallback(
    (email) => {
      alert(
        `a forgot password email has been sent to ${email}, please follow instructions to set new password!`
      );
      navigate("/login");
    },
    [navigate]
  );

  const callPostDataAPI = useCallback(async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    try {
      const response = await fetchWithGlobalErrorHandler(
        URL_USERS_FORGOT_PASS,
        options
      );
      const body = await response.json();
      if (!response.ok) {
        // in case of error response body can contain handled error message from server
        throw new Error(
          body.message || response.statusText || "Something went wrong!"
        );
      }

      onSuccessPostData(body.email);
    } catch (error) {
      console.log(
        "🚀 ~ file: ForgotPassword.jsx:54 ~ callPostDataAPI ~ error:",
        error
      );
    }
  }, [email, onSuccessPostData]);

  // use effect hooks
  useEffect(() => {
    if (postData) {
      setPostData(false);
      callPostDataAPI();
    }
  }, [postData, callPostDataAPI]);

  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Forgot Password</h2>
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <div className={styles.containerButtons}>
          <Link to="/login">Back To Login</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordComponent;
