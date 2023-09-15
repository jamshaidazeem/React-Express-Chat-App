import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const LoginComponent = () => {
  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Login</h2>
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <input name="email" type="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
        <br />
        <br />
        <div className={styles.containerButtons}>
          <button onClick={onClickLogin}>Login</button>
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
