import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import { URL_USERS_RESET_PASS } from "../../utilis/constants";
import fetchWithGlobalErrorHandler from "../../utilis/fetchHelper";
import toast, { Toaster } from "react-hot-toast";

const ResetPasswordComponent = () => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState(false);
  const [fields, setFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // actions
  const onSubmit = () => {
    if (
      !fields.newPassword ||
      !fields.confirmPassword ||
      !fields.currentPassword
    ) {
      toast.error(
        "current password, new password and confirm password fields are required!"
      );
    } else if (fields.newPassword !== fields.confirmPassword) {
      toast.error("new password and confirm password fields should be same!");
    } else {
      setPostData(true);
    }
  };

  // use callback hooks
  const onSuccessPostData = useCallback(() => {
    toast.success(`You have successfully updated your password`);
    setTimeout(() => {
      navigate(-1); // go back
    }, 1000);
  }, [navigate]);

  const callPostDataAPI = useCallback(
    async (payload) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // this is required to work with cookies
        body: JSON.stringify(payload),
      };
      try {
        const response = await fetchWithGlobalErrorHandler(
          URL_USERS_RESET_PASS,
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
        toast.error(error.message);
      }
    },
    [onSuccessPostData]
  );

  // use effect hooks
  useEffect(() => {
    if (postData) {
      setPostData(false);
      callPostDataAPI({
        currentPassword: fields.currentPassword,
        newPassword: fields.newPassword,
      });
    }
  }, [postData, fields, callPostDataAPI]);

  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Reset Password</h2>
        <br />
        <br />
        <label htmlFor="old password">Old Password</label>
        <input
          name="old password"
          type="password"
          onChange={(e) =>
            setFields({ ...fields, currentPassword: e.target.value })
          }
        />
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
          <Link to="/profile">Back To Profile</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ResetPasswordComponent;
