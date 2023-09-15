import React from "react";
import styles from "./ForgotPassword.module.css";

const ForgotPasswordComponent = () => {
  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Forgot Password</h2>
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <input name="email" type="email" />
        <br />
        <div className={styles.containerButtons}>
          <button>Cancel</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button>Submit</button>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordComponent;
