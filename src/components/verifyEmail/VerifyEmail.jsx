import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./VerifyEmail.module.css";
import { URL_VERIFY_EMAIL } from "../../utilis/constants";
import fetchWithGlobalErrorHandler from "../../utilis/fetchHelper";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmailComponent = () => {
  const [loadingText, setLoadingText] = useState("Verifying Email...");

  // use callback hooks
  const callPostDataAPI = useCallback(async (token) => {
    const payload = { token: token };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      const response = await fetchWithGlobalErrorHandler(
        URL_VERIFY_EMAIL,
        options
      );
      const body = await response.json();
      if (!response.ok) {
        // in case of error response body can contain handled error message from server
        throw new Error(
          body.message || response.statusText || "Something went wrong!"
        );
      }

      setLoadingText(
        "You have been verified, please login with your email and password"
      );
    } catch (error) {
      toast.error(error.message);
      setLoadingText(error.message);
    }
  }, []);

  // use effect hooks
  useEffect(() => {
    const token = window.location.search.split("=")[1];
    callPostDataAPI(token);
  }, [callPostDataAPI]);

  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Verify Email</h2>
        <br />
        <br />
        <p>{loadingText}</p>
        <br />
        <br />
        <div className={styles.containerButtons}>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default VerifyEmailComponent;
