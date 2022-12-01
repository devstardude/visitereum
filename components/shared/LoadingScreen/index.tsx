import React from "react";
import { TiLocation } from "react-icons/ti";
import styles from "./style.module.css";

const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingScreen;
