import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NewPassword.module.css";

const NewPasswordComponent = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const onSubmit = () => {
    console.log(
      "🚀 ~ file: NewPassword.jsx:11 ~ NewPasswordComponent ~ fields:",
      JSON.stringify(fields)
    );

    /*
    alert(
      "Password updated successfully!, please login with your new password"
    );
    navigate("/profile"); */
  };

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
