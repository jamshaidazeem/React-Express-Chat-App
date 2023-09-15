import React from "react";
import styles from "./Profile.module.css";

const SignupComponent = () => {
  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Profile</h2>
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
          <button>Back</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button>Submit</button>
        </div>
      </div>
    </>
  );
};

export default SignupComponent;
