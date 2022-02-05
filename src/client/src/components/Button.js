import styles from "../styles/Button.module.css";
import ExternalIcon from "./icons/ExternalIcon";
import React from "react";

const Button = () => {
  return (
    <button className={`${styles.button} ${styles.outlined}`}>
      <ExternalIcon />
      Button
    </button>
  );
};

export default Button;
