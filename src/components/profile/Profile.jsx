import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const ProfileComponent = () => {
  const navigate = useNavigate();

  const onClickBack = () => {
    console.log("on click back");
  };

  const onClickSubmit = () => {
    alert("Profile updated successfully!");
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
        <input name="email" type="email" />
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
          <button onClick={onClickBack}>Back</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={onClickSubmit}>Submit</button>
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
