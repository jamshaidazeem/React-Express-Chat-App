import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NewPassword.module.css";
import fetchWithGlobalErrorHandler from "../../utilis/fetchHelper";
import { URL_USERS_NEW_PASS } from "../../utilis/constants";

const NewPasswordComponent = () => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState(false);
  const [fields, setFields] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });

  // actions
  const onSubmit = () => {
    if (!fields.newPassword || !fields.confirmPassword) {
      alert("new password and confirm password fields are required!");
    } else if (fields.newPassword !== fields.confirmPassword) {
      alert("new password and confirm password fields should be same!");
    } else {
      const token = window.location.search.split("=")[1];
      if (token) {
        setFields({ ...fields, token: token });
        setPostData(true);
      }
    }
  };

  // use callback hooks
  const onSuccessPostData = useCallback(() => {
    alert(
      `You have successfully set your new password, please login with new password`
    );
    navigate("/login");
  }, [navigate]);

  const callPostDataAPI = useCallback(
    async (payload) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
      try {
        const response = await fetchWithGlobalErrorHandler(
          URL_USERS_NEW_PASS,
          options
        );
        const body = await response.json();
        if (!response.ok) {
          // in case of error response body can contain handled error message from server
          throw new Error(
            body.message || response.statusText || "Something went wrong!"
          );
        }

        onSuccessPostData();
      } catch (error) {
        console.log(
          "🚀 ~ file: NewPassword.jsx:68 ~ callPostDataAPI ~ error:",
          error
        );
      }
    },
    [onSuccessPostData]
  );

  // use effect hooks
  useEffect(() => {
    if (postData) {
      setPostData(false);
      callPostDataAPI({ token: fields.token, newPassword: fields.newPassword });
    }
  }, [postData, fields, callPostDataAPI]);

  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>New Password</h2>
        <br />
        <br />
        <label htmlFor="new password">New Password</label>
        <input
          name="new password"
          type="password"
          onChange={(e) =>
            setFields({ ...fields, newPassword: e.target.value })
          }
        />
        <br />
        <label htmlFor="confirm new password">Confirm New Password</label>
        <input
          name="confirm new password"
          type="password"
          onChange={(e) =>
            setFields({ ...fields, confirmPassword: e.target.value })
          }
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

export default NewPasswordComponent;
