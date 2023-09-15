import React from "react";
import styles from "./NoPage.module.css";

const NoPageComponent = () => {
  return (
    <>
      <div className={`${styles.container} full-page`}>
        <h1>No Page Found</h1>
      </div>
    </>
  );
};

export default NoPageComponent;
