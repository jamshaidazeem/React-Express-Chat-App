import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { URL_USERS } from "../../utilis/constants";
import fetchWithGlobalErrorHandler from "../../utilis/fetchHelper";

const SignupComponent = () => {
  const navigate = useNavigate();

  // states
  const [postData, setPostData] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    chatName: "",
    age: null,
  });

  // actions
  const onSubmit = () => {
    // input validation
    setPostData(true);
  };

  // use callback hooks
  const onSuccessPostData = useCallback(
    (email) => {
      alert(
        `a confirmation email has been sent to ${email}, please verify to login, thanks!`
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
      body: JSON.stringify(fields),
    };
    try {
      const response = await fetchWithGlobalErrorHandler(URL_USERS, options);
      const body = await response.json();
      if (!response.ok) {
        // in case of error response body can contain handled error message from server
        throw new Error(
          body.message || response.statusText || "Something went wrong!"
        );
      }

      onSuccessPostData(body.email);
    } catch (error) {
      console.log("🚀 ~ file: Signup.jsx:45 ~ postData ~ error:", error);
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
        <h2>Signup</h2>
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
        <label htmlFor="confirm password">Confirm Password</label>
        <input
          name="confirm password"
          type="password"
          onChange={(e) =>
            setFields({ ...fields, confirmPassword: e.target.value })
          }
        />
        <br />
        <label htmlFor="first name">First Name</label>
        <input
          name="first name"
          type="text"
          onChange={(e) => setFields({ ...fields, firstName: e.target.value })}
        />
        <br />
        <label htmlFor="last name">Last Name</label>
        <input
          name="last name"
          type="text"
          onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
        />
        <br />
        <label htmlFor="chat name">Chat Name</label>
        <input
          name="chat name"
          type="text"
          onChange={(e) => setFields({ ...fields, chatName: e.target.value })}
        />
        <br />
        <label htmlFor="age">Age</label>
        <input
          name="age"
          type="number"
          onChange={(e) => setFields({ ...fields, age: e.target.value })}
        />
        <br />
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

export default SignupComponent;
