import React from "react";
import styles from "./Login.module.css";

const LoginComponent = () => {
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
          <button>Login</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button>Signup</button>
        </div>
        <br />
        <br />
        <a href="/forgot-password">Forgot Password</a>
      </div>
    </>
  );
};

export default LoginComponent;
