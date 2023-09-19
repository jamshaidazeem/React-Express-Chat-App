import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { URL_USERS_LOGIN } from "../../utilis/constants";

const LoginComponent = () => {
  const navigate = useNavigate();

  // states
  const [postData, setPostData] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  // actions
  const onSubmit = () => {
    // input validation
    setPostData(true);
  };

  // use callback hooks
  const onSuccessPostData = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const callPostDataAPI = useCallback(async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    };
    try {
      const response = await fetch(URL_USERS_LOGIN, options);
      const body = await response.json();
      if (!response.ok) {
        // in case of error response body can contain handled error message from server
        throw new Error(
          body.message || response.statusText || "Something went wrong!"
        );
      }

      onSuccessPostData();
    } catch (error) {
      console.log("🚀 ~ file: Login.jsx:47 ~ callPostDataAPI ~ error:", error);
    }
  }, [fields, onSuccessPostData]);

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
        <h2>Login</h2>
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setFields({ ...fields, password: e.target.value })}
        />
        <br />
        <br />
        <div className={styles.containerButtons}>
          <button onClick={onSubmit}>Login</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/signup">Signup</Link>
        </div>
        <br />
        <br />
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </>
  );
};

export default LoginComponent;
