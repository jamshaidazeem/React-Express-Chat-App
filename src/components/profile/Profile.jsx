import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const ProfileComponent = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    chatName: "",
    age: "",
  });

  const onClickBack = () => {
    console.log("on click back");
  };

  const onSubmit = () => {
    console.log(
      "🚀 ~ file: Profile.jsx:8 ~ ProfileComponent ~ fields:",
      JSON.stringify(fields)
    );

    // alert("Profile updated successfully!");
  };

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h2>Profile</h2>
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
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
          <button onClick={onClickBack}>Back</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={onSubmit}>Submit</button>
        </div>
        <br />
        <br />
        <div className={styles.containerButtons}>
          <Link to="/reset-password">Reset Pasword</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={onClickLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
