import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ email: "", password: "" });

  const onSubmit = () => {
    console.log(
      "🚀 ~ file: Login.jsx:7 ~ LoginComponent ~ fields:",
      JSON.stringify(fields)
    );

    navigate("/profile");
  };

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
