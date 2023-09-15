import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const SignupComponent = () => {
  const navigate = useNavigate();
  const onClickSubmit = () => {
    alert(
      "a confirmation email has been sent to your register email account, please verify to login, thanks!"
    );
    navigate("/login");
  };

  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Signup</h2>
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <input name="email" type="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
        <br />
        <label htmlFor="confirm password">Confirm Password</label>
        <input name="confirm password" type="password" />
        <br />
        <label htmlFor="first name">First Name</label>
        <input name="first name" type="text" />
        <br />
        <label htmlFor="last name">Last Name</label>
        <input name="last name" type="text" />
        <br />
        <label htmlFor="chat name">Chat Name</label>
        <input name="chat name" type="text" />
        <br />
        <label htmlFor="age">Age</label>
        <input name="age" type="text" />
        <br />
        <br />
        <div className={styles.containerButtons}>
          <Link to="/login">Back To Login</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={onClickSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default SignupComponent;
