import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const SignupComponent = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    chatName: "",
    age: "",
  });
  const onSubmit = () => {
    console.log(
      "🚀 ~ file: Signup.jsx:16 ~ SignupComponent ~ fields:",
      JSON.stringify(fields)
    );

    /*
    alert(
      "a confirmation email has been sent to your register email account, please verify to login, thanks!"
    );
    navigate("/login"); */
  };

  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Signup</h2>
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
        <label htmlFor="confirm password">Confirm Password</label>
        <input
          name="confirm password"
          type="password"
          onChange={(e) =>
            setFields({ ...fields, confirmPassword: e.target.value })
          }
        />
        <br />
        <label htmlFor="first name">First Name</label>
        <input
          name="first name"
          type="text"
          onChange={(e) => setFields({ ...fields, firstName: e.target.value })}
        />
        <br />
        <label htmlFor="last name">Last Name</label>
        <input
          name="last name"
          type="text"
          onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
        />
        <br />
        <label htmlFor="chat name">Chat Name</label>
        <input
          name="chat name"
          type="text"
          onChange={(e) => setFields({ ...fields, chatName: e.target.value })}
        />
        <br />
        <label htmlFor="age">Age</label>
        <input
          name="age"
          type="text"
          onChange={(e) => setFields({ ...fields, age: e.target.value })}
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

export default SignupComponent;
