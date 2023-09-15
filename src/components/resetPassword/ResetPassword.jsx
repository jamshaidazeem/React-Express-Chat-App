import React from "react";
import styles from "./ResetPassword.module.css";

const ResetPasswordComponent = () => {
  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Reset Password</h2>
        <br />
        <br />
        <label htmlFor="new password">New Password</label>
        <input name="new password" type="password" />
        <br />
        <label htmlFor="confirm new password">Confirm New Password</label>
        <input name="confirm new password" type="password" />
        <br />
        <br />
        <div className={styles.containerButtons}>
          <button>Back</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button>Submit</button>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordComponent;
